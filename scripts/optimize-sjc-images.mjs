import sharp from "sharp";
import fs from "fs";
import path from "path";

const BASE = "public/assets/sao-jose-dos-campos";

async function compressJpg(fp) {
  const before = fs.statSync(fp).size;
  const tmp = fp + ".tmp";
  await sharp(fp).jpeg({ quality: 78, mozjpeg: true }).toFile(tmp);
  fs.renameSync(tmp, fp);
  const after = fs.statSync(fp).size;
  return { before, after };
}

async function pngToJpg(fp) {
  const before = fs.statSync(fp).size;
  const out = fp.replace(/\.png$/i, ".jpg");
  await sharp(fp).flatten({ background: "#ffffff" }).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
  fs.unlinkSync(fp);
  const after = fs.statSync(out).size;
  return { before, after, out };
}

function kb(n) {
  return (n / 1024).toFixed(0) + " KB";
}

async function processDir(dir) {
  let totalBefore = 0;
  let totalAfter = 0;
  for (const file of fs.readdirSync(dir)) {
    const fp = path.join(dir, file);
    if (!fs.statSync(fp).isFile()) continue;
    const low = file.toLowerCase();
    if (low.endsWith(".jpg") || low.endsWith(".jpeg")) {
      const { before, after } = await compressJpg(fp);
      totalBefore += before;
      totalAfter += after;
      console.log(`  jpg  ${file.padEnd(32)} ${kb(before)} -> ${kb(after)}`);
    } else if (low.endsWith(".png")) {
      const { before, after, out } = await pngToJpg(fp);
      totalBefore += before;
      totalAfter += after;
      console.log(`  png  ${file.padEnd(32)} ${kb(before)} -> ${path.basename(out)} ${kb(after)}`);
    }
  }
  return { totalBefore, totalAfter };
}

console.log("== main folder ==");
const m = await processDir(BASE);
console.log("== carrossel ==");
const c = await processDir(path.join(BASE, "carrossel"));
const before = m.totalBefore + c.totalBefore;
const after = m.totalAfter + c.totalAfter;
console.log(`\nTotal: ${kb(before)} -> ${kb(after)} (${(((before - after) / before) * 100).toFixed(1)}% reduction)`);
