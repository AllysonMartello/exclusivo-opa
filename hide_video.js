const fs = require('fs');
const filepath = 'c:\\Users\\allys\\OneDrive\\Documentos\\exclusivo-opa\\app\\engenho-CA006944\\_components\\TheHouse.tsx';

let content = fs.readFileSync(filepath, 'utf8');

const target = `    {
      id: 0,
      type: "youtube",
      title: t.theHouse.video.title,
      desc: t.theHouse.video.desc,
      url: "",
      thumbnailUrl: "/assets/engenho-CA006944/video-cinematografico",
      youtubeId: "7XWgckz3SPU",
      startSeconds: 3,
      span: "col-span-2 row-span-4 sm:col-span-3 sm:row-span-3 md:col-span-4 md:row-span-3",
    },`;

const replacement = `    // {
    //   id: 0,
    //   type: "youtube",
    //   title: t.theHouse.video.title,
    //   desc: t.theHouse.video.desc,
    //   url: "",
    //   thumbnailUrl: "/assets/engenho-CA006944/video-cinematografico",
    //   youtubeId: "7XWgckz3SPU",
    //   startSeconds: 3,
    //   span: "col-span-2 row-span-4 sm:col-span-3 sm:row-span-3 md:col-span-4 md:row-span-3",
    // },`;

content = content.replace(target, replacement);

// The VirtualTour.tsx has a secondary CTA or section in the Hero that scrolls to #tour.
// The user might also want the VirtualTour section hidden if they don't have ANY video. But they said "O video não temso ainda", and the cinematic video is specifically named "vídeo".
// Let's also hide the VirtualTour component from the page if they want.
// Wait, the user specifically sent CTA: "Acessar tour virtual" in their very first prompt. So they probably have a Matterport link for the tour, just not the cinematic youtube video!
// Let's just update TheHouse for now.

fs.writeFileSync(filepath, content);
console.log('Commented out cinematic video from TheHouse.');
