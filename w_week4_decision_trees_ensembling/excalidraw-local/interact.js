const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
require("./ghost-scenes");

const CHROME =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function shot(page, name) {
  const file = path.join(__dirname, name);
  await page.screenshot({ path: file });
  console.log("saved", name);
}

async function loadScene(page, scenePath) {
  const scene = JSON.parse(fs.readFileSync(scenePath, "utf8"));
  await page.evaluate(async (scene) => {
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

    const dbs = await indexedDB.databases();
    for (const db of dbs) {
      if (db && db.name) indexedDB.deleteDatabase(db.name);
    }
  }, scene);
  await page.reload({ waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1800));
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    defaultViewport: { width: 1400, height: 900 },
    args: ["--window-size=1400,900"],
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:5000", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1200));

  const windows = await page.evaluate(() =>
    Object.keys(window).filter((k) => /excal|EXCAL|app/i.test(k)).slice(0, 40)
  );
  const idbs = await page.evaluate(
    async () => (await indexedDB.databases()).map((d) => d.name)
  );
  console.log("window", windows);
  console.log("idb", idbs);

  await loadScene(page, path.join(__dirname, "ghost-v1.excalidraw"));
  await shot(page, "03-ghost-v1.png");
  const c1 = await page.evaluate(() => localStorage.getItem("excalidraw")?.slice(0, 120));
  console.log("v1 storage", c1);

  await loadScene(page, path.join(__dirname, "ghost-v2.excalidraw"));
  await shot(page, "04-ghost-v2.png");

  await page.keyboard.press("Escape");
  await page.keyboard.press("4");
  const box = await page.evaluate(() => {
    const c = document.querySelector("canvas.interactive") || document.querySelector("canvas");
    const r = c.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  await page.mouse.move(box.x + 980, box.y + 160);
  await page.mouse.down();
  await page.mouse.move(box.x + 1070, box.y + 250, { steps: 10 });
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 700));
  await shot(page, "05-after-ui-ellipse.png");

  await page.keyboard.press("8");
  await page.mouse.click(box.x + 280, box.y + 720);
  await new Promise((r) => setTimeout(r, 250));
  await page.keyboard.type("Drawn locally");
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 500));
  await shot(page, "06-after-ui-text.png");

  const counts = await page.evaluate(() => {
    const parsed = JSON.parse(localStorage.getItem("excalidraw") || "[]");
    const list = Array.isArray(parsed) ? parsed : [];
    const types = {};
    for (const e of list) {
      if (!e || e.isDeleted) continue;
      types[e.type] = (types[e.type] || 0) + 1;
    }
    return { count: list.filter((e) => e && !e.isDeleted).length, types };
  });
  console.log("scene", JSON.stringify(counts));
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
