import { publicEnv } from "@/lib/env";

export default function GTMNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${publicEnv.NEXT_PUBLIC_GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="GTM"
      />
    </noscript>
  );
}
