const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
require("./ghost-scenes");

async function loadScene(page, scenePath) {
  const scene = JSON.parse(fs.readFileSync(scenePath, "utf8"));
  await page.evaluate((scene) => {
    localStorage.setItem("excalidraw", JSON.stringify(scene.elements));
    const prev = JSON.parse(localStorage.getItem("excalidraw-state") || "{}");
    localStorage.setItem(
      "excalidraw-state",
      JSON.stringify({
        ...prev,
        ...scene.appState,
        showWelcomeScreen: false,
        zenModeEnabled: false,
      })
    );
    localStorage.setItem("version-dataState", String(Date.now()));
  }, scene);
  await page.reload({ waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1800));
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    defaultViewport: { width: 1400, height: 900 },
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:5000", { waitUntil: "networkidle2" });
  await loadScene(page, path.join(__dirname, "ghost-v3.excalidraw"));
  await page.screenshot({ path: path.join(__dirname, "07-ghost-v3.png") });
  console.log("saved 07-ghost-v3.png");
  await browser.close();
})();
