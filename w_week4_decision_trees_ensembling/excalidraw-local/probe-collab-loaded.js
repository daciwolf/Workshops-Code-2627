const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
require("./ghost-scenes");

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    defaultViewport: { width: 1400, height: 900 },
  });
  const page = await browser.newPage();
  const scene = JSON.parse(
    fs.readFileSync(path.join(__dirname, "ghost-v3.excalidraw"), "utf8")
  );
  await page.goto("http://localhost:5000", { waitUntil: "networkidle2" });
  await page.evaluate((scene) => {
    localStorage.setItem("excalidraw", JSON.stringify(scene.elements));
    localStorage.setItem("version-dataState", String(Date.now()));
  }, scene);
  await page.reload({ waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1800));
  await page.screenshot({ path: path.join(__dirname, "11-after-load.png") });
  const ui = await page.evaluate(() => ({
    buttons: [...document.querySelectorAll("button")].map((el) => ({
      text: (el.textContent || "").trim().slice(0, 60),
      aria: el.getAttribute("aria-label"),
      title: el.getAttribute("title"),
    })),
    text: document.body.innerText.slice(0, 2000),
  }));
  console.log(JSON.stringify(ui, null, 2));
  await browser.close();
})();
