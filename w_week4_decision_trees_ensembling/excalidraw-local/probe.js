const puppeteer = require("puppeteer-core");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--window-size=1400,900", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto("http://localhost:5000", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({
    path: path.join(__dirname, "01-probe.png"),
    fullPage: true,
  });
  const info = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")]
      .map((el) => ({
        text: (el.textContent || "").trim().slice(0, 80),
        aria: el.getAttribute("aria-label"),
        title: el.getAttribute("title"),
      }))
      .filter((b) => b.text || b.aria)
      .slice(0, 60);
    const fileInputs = [...document.querySelectorAll("input[type=file]")].map(
      (el) => ({ accept: el.accept, className: el.className, id: el.id })
    );
    const keys = Object.keys(localStorage);
    return {
      title: document.title,
      buttons,
      fileInputs,
      keys,
      bodyText: document.body.innerText.slice(0, 1500),
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
