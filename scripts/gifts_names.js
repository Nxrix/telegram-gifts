const fs = require("fs");
(async()=>{
  fs.mkdirSync("./data", { recursive: true });
  fs.writeFileSync("./data/gifts_names.json",Buffer.from((await(await fetch("https://api.changes.tg/gifts")).arrayBuffer())));
})();
