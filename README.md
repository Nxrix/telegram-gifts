# Telegram-Gifts
Comprehensive reference for working with Telegram gifts

## Data
- [List of all gifts](./data/gifts_names.json)
- [All Upgraded Plush Pepe gifts](./plushpepe.json)
- [All Upgraded Precious Peach gifts](./preciouspeach.json)
- [All Upgraded Magic Potion gifts](./magicpotion.json)
- [All Upgraded Kissed Frog gifts](./kissedfrog.json)
- [All Upgraded Vintage Cigar gifts](./vintagecigar.json)
- [All Upgraded Toy Bear gifts](./toybear.json)

## Useful Links
- [Telegram Gifts on Dune](https://dune.com/rdmcd/telegram-gifts)
- [GiftStat.com](https://giftstat.com/)
- [Gift Rates Bot](https://t.me/GiftRatesBot)
- [Gift Charts Bot](https://t.me/gift_charts_bot)
- [Peek.tg Bot](https://t.me/peektgbot)
- [Gift Chart Stickers](https://t.me/addstickers/stickers_by_GiftRatesBot)
- [Floor Price Stickers](https://t.me/addstickers/gift_by_tondesignrobot)
- [NFT GIFT Calculator Bot](https://t.me/PriceNFTbot)
- [Gift Changes API](https://api.changes.tg/)
- [Gift Changes CDN](https://cdn.changes.tg/)

## Naming Formats
1. Gift Name — Human-readable name used in descriptions
2. GiftName — PascalCase, often used in telegram links 
3. giftname — Lowercase format used in URLs and paths

## Available Endpoints
| Type                 | Format  | URL Pattern                                                                 |
|----------------------|---------|-----------------------------------------------------------------------------|
| Gift Page            | HTML    | `https://t.me/nft/[GiftName]-[id]`                                          |
| Minted Gift Detail   | JSON    | `https://nft.fragment.com/gift/[giftname]-[id].json`                        |
| Image (JPG - Large)  | JPG     | `https://nft.fragment.com/gift/[giftname]-[id].large.jpg`                   |
| Image (JPG - Medium) | JPG     | `https://nft.fragment.com/gift/[giftname]-[id].medium.jpg`                  |
| Image (JPG - Small)  | JPG     | `https://nft.fragment.com/gift/[giftname]-[id].small.jpg`                   |
| Image (WebP)         | WebP    | `https://nft.fragment.com/gift/[giftname]-[id].webp`                        |
| Lottie Animation     | JSON    | `https://nft.fragment.com/gift/[giftname]-[id].lottie.json`                 |
| Telegram Sticker     | TGS     | `https://nft.fragment.com/gift/[giftname]-[id].tgs`                         |
| Collection Thumbnail | WebP    | `https://fragment.com/file/gifts/[giftname]/thumb.webp`                     |

## Scraping Gift Details
Using the Gift Page URL we can get different details for each gift
If you only need the gifts model, backdrop and symbol you can use this:
```js
const gift = "PlushPepe-1";
const match = (await(await fetch("https://t.me/nft/"+gift)).text()).match(/<meta\s+name=["']twitter:description["']\s+content=["']([^"']*)["']/i);
return match?"Name: "+gift+"\n"+match[1]:"null";
```
Example Output:
```
Name: PlushPepe-1
Model: Pumpkin
Backdrop: Onyx Black
Symbol: Illuminati
(Optional Info)
```
With owner and quantity:
```js
const gift = "PlushPepe-1";
const rows = (await(await fetch("https://t.me/nft/"+gift)).text()).match(/<tr>.*?<\/tr>/gs);
if (!rows || rows.length == 0) {
  return "null";
}
let output = "Name: "+gift+"\n";
rows.forEach(row => {
  const th = row.match(/<th>(.*?)<\/th>/s);
  const td = row.match(/<td>(.*?)<\/td>/s);
  if (th && td) {
    const key = th[1].trim();
    const value = td[1]
      .replace(/<[^>]*>/g,"")
      .replace(/\s+/g," ")
      .trim();
    output += `${key}: ${value}\n`;
  }
});
return output;
```
Example Output:
```
Name: PlushPepe-1
Owner: Paul Du Rove
Model: Pumpkin 3%
Backdrop: Onyx Black 2%
Symbol: Illuminati 0.5%
Quantity: 2 815/2 861 issued
```

---

### Donate to support <3
`UQBEsTMky8JjYU2lF0uyWPrg_XtyPNUzix888KF424wHv-Nx`
