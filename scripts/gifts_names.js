const fs = require("fs");
(async()=>{
  await fs.mkdir("./data", { recursive: true });
  await fs.writeFile("./data/gifts_names.json",Buffer.from((await(await fetch("https://api.changes.tg/gifts")).arrayBuffer())));
})();
