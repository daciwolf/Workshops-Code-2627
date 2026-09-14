const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    defaultViewport: { width: 1400, height: 900 },
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:5000", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(__dirname, "08-collab-welcome.png") });

  const clicked = await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      (b.textContent || "").toLowerCase().includes("live collaboration")
    );
    if (btn) {
      btn.click();
      return btn.textContent.trim();
    }
    return null;
  });
  console.log("clicked", clicked);
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(__dirname, "09-collab-modal.png") });

  const ui = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button, input")].map((el) => ({
      tag: el.tagName,
      type: el.getAttribute("type"),
      text: (el.textContent || "").trim().slice(0, 80),
      aria: el.getAttribute("aria-label"),
      name: el.getAttribute("name"),
      placeholder: el.getAttribute("placeholder"),
      value: el.value,
    }));
    return {
      url: location.href,
      buttons: buttons.filter((b) => b.text || b.aria || b.placeholder).slice(0, 80),
      dialogText: document.body.innerText.slice(0, 2500),
    };
  });
  console.log(JSON.stringify(ui, null, 2));
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
