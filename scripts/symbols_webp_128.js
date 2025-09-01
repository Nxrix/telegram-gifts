const fs = require("fs");
const fix_name = (n) => n.replace(/[^a-zA-Z0-9]/g, "");
const fix_name2 = (n) => fix_name(n).toLowerCase();
(async()=>{
  const symbols = await(await fetch("https://proxy.thermos.gifts/api/v1/symbols")).json();
  fs.mkdirSync("./data/symbols/webp/128/", { recursive: true });
  for (const { name, image_url } of symbols) {
    if (fs.existsSync(`./data/symbols/webp/128/${fix_name2(name)}.webp`)) {
      continue;
    }
    try {
      fs.writeFileSync(`./data/symbols/webp/128/${fix_name2(name)}.webp`,Buffer.from((await(await fetch(image_url)).arrayBuffer())));
    } catch (e) {
      console.log(name,e.toString());
    }
  }
})();
