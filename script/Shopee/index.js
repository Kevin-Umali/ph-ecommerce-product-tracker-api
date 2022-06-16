const puppeteer = require("puppeteer");

const checkStock = async (link) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(link);
  await page.waitForSelector(".VCNVHn");
  const element = await page.$(".VCNVHn");
  const product = await page.evaluate((el) => el.textContent, element);
  const buttons = await page.$$(".product-variation");
  if (buttons.length) {
    const available = await itemStocks(page);
    const items = await itemsWithVariation(page, buttons);
    await browser.close();
    return { product, link, available, variations: items };
  } else {
    const available = await itemStocks(page);
    await browser.close();
    return { product, link, available };
  }
};

const checkStockArray = async (links) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const data = [];
  for (const link of links) {
    await page.goto(link);
    await page.waitForSelector(".VCNVHn");
    const element = await page.$(".VCNVHn");
    const product = await page.evaluate((el) => el.textContent, element);
    const buttons = await page.$$(".product-variation");
    if (buttons.length) {
      const available = await itemStocks(page);
      const items = await itemsWithVariation(page, buttons);
      data.push({ product, link, available, variations: items });
    } else {
      const available = await itemStocks(page);
      data.push({ product, link, available });
    }
  }
  await browser.close();
  return data;
};

const itemsWithVariation = async (page, buttons) => {
  const items = [];
  for (const button of buttons) {
    await button.click();
    const name = await (await button.getProperty("textContent")).jsonValue();
    const isDisabled = (await (await button.getProperty("className")).jsonValue()).includes("product-variation--disabled");
    await page.waitForTimeout(100);
    const element = await page.$(".G2C2rT div:last-child");
    const quantity = await page.evaluate((el) => el.textContent, element);
    items.push({ name, quantity: !isDisabled ? quantity : "0" });
  }
  return items;
};

const itemStocks = async (page) => {
  let element = await page.$(".G2C2rT div:last-child");
  return await page.evaluate((el) => el.textContent, element);
};

module.exports = {
  checkStock,
  checkStockArray,
};

// fs.writeFile("mynewfile3.html", "Hello content!", function (err) {
//   if (err) throw err;
//   console.log("Saved!");
// });
