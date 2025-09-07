const fs = require("fs");

const fix_name = (n) => n.replace(/[^a-zA-Z0-9]/g, "");
const fix_name2 = (n) => fix_name(n).toLowerCase();

const get_supply = async (n) => {
  return (await (await fetch("https://t.me/nft/"+n)).text())
    .split("<td>")[5]
    ?.split(" issued")[0]
    ?.split("/")[0]
    .replaceAll(" ","")|0;
}

const get_gift = async (n) => {
  return [
    n.split("-")[1]|0,
    ...((await (await fetch("https://t.me/nft/" + n)).text())
      .match(
        /<meta\s+name=["']twitter:description["']\s+content=["']([^"']*)["']/i
      )?.[1]
      .trim()
      .split("\n")
      .map((i) => (i.includes(": ") ? i.slice(i.indexOf(": ") + 1) : i)) || [])
    ];
}

(async () => {
  fs.mkdirSync("./data/lists/v1/", { recursive: true });
  const name = process.env.name;
  const filename = `./data/lists/v1/${fix_name(name)}.json`;
  let list = [];
  if (fs.existsSync(filename)) {
    list = JSON.parse(fs.readFileSync(filename, "utf8"));
  }
  const supply = await get_supply(fix_name2(name) + "-1");
  console.log(name, supply);
  for (let i = 0; i < supply; i++) {
    if (!list[i]||list[i].length === 1||list[i][4] === null) {
      const gift = await get_gift(fix_name2(name) + "-" + (i+1));
      if (gift) {
        list[i] = gift;
      } else {
        console.log(i);
      }
    }
  }
  list = list.map(inner=>inner.map((item,index)=>typeof item === "string" && index > 0 ? item.substr(1) : item));
  fs.writeFileSync(filename,JSON.stringify(list));
})();
