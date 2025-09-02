const fs = require("fs");
const fix_name = (n) => n.replace(/[^a-zA-Z0-9]/g, "");
const fix_name2 = (n) => fix_name(n).toLowerCase();
const fs = require("fs");
(async()=>{
  fs.mkdirSync("./data/lists/v1/", { recursive: true });
  const list = [];
  fs.writeFileSync(`./data/lists/v1/${fix_name(process.env.name)}.json`,JSON.stringify(list));
})();
