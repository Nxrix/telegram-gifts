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
    n.split("-")[1],
    ...((await (await fetch("https://t.me/nft/" + n)).text())
      .match(
        /<meta\s+name=["']twitter:description["']\s+content=["']([^"']*)["']/i
      )?.[1]
      .trim()
      .split("\n")
      .map((i) => i.split(": ")[1]) || [])
    ];
}

(async()=>{
  fs.mkdirSync("./data/lists/v1/", { recursive: true });
  const list = [];
  const name = process.env.name;
  const supply = get_supply(fix_name2(name)+"-1");
  console.log(name,supply);
  for (let i=1;i<=supply;i++) {
    const gift = await get_gift(fix_name2(name)+"-"+i);
    if (gift) {
      list.push(gift);
    } else {
      console.log(i);
    }
  }
  fs.writeFileSync(`./data/lists/v1/${fix_name(name)}.json`,JSON.stringify(list));
})();
