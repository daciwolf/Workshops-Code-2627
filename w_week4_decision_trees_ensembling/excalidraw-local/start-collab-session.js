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
  page.on("console", (msg) => {
    const t = msg.text();
    if (/error|collab|socket|ws|crypto/i.test(t)) console.log("PAGE", t);
  });
  page.on("pageerror", (err) => console.log("PAGEERROR", err.message));

  await page.goto("http://localhost:5000", { waitUntil: "networkidle2" });
  await loadScene(page, path.join(__dirname, "ghost-v3.excalidraw"));

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) => {
      const label = `${b.textContent || ""} ${b.getAttribute("title") || ""} ${b.getAttribute("aria-label") || ""}`.toLowerCase();
      return label.includes("live collaboration");
    });
    if (!btn) throw new Error("Live collaboration button not found");
    btn.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find(
      (b) => (b.getAttribute("aria-label") || b.textContent || "").trim() === "Start session"
    );
    if (!btn) throw new Error("Start session button not found");
    btn.click();
  });

  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    const href = await page.evaluate(() => location.href);
    if (href.includes("#room=")) {
      fs.writeFileSync(path.join(__dirname, "room-url.txt"), href);
      console.log("ROOM_URL", href);
      break;
    }
    if (i === 19) {
      await page.screenshot({
        path: path.join(__dirname, "10-collab-failed.png"),
      });
      const text = await page.evaluate(() => document.body.innerText.slice(0, 2000));
      console.log("no room hash yet\n", text);
      throw new Error("Room URL did not appear");
    }
  }

  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(__dirname, "10-collab-live.png") });

  const nameInput = await page.$('input[type="text"]');
  if (nameInput) {
    await nameInput.click({ clickCount: 3 });
    await nameInput.type("Cursor");
  }

  console.log("session live; keeping browser connected");
  await new Promise(() => {});
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
