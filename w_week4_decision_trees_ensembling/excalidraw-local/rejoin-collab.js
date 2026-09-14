const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const url = fs
  .readFileSync(path.join(__dirname, "room-url.txt"), "utf8")
  .trim();

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    defaultViewport: { width: 1400, height: 900 },
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2500));
  console.log("REJOINED", await page.evaluate(() => location.href));
  await new Promise(() => {});
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
