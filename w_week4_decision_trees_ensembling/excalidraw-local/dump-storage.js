const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:5000", { waitUntil: "networkidle2" });
  const storage = await page.evaluate(() => {
    const raw = localStorage.getItem("excalidraw");
    const state = localStorage.getItem("excalidraw-state");
    return {
      dataState: localStorage.getItem("version-dataState"),
      files: localStorage.getItem("version-files"),
      statePreview: state ? state.slice(0, 800) : null,
      excalidrawPreview: raw ? raw.slice(0, 800) : null,
      parsedType: raw ? typeof JSON.parse(raw) : null,
      parsedIsArray: raw ? Array.isArray(JSON.parse(raw)) : null,
      parsedKeys:
        raw && !Array.isArray(JSON.parse(raw))
          ? Object.keys(JSON.parse(raw))
          : null,
    };
  });
  console.log(JSON.stringify(storage, null, 2));
  await browser.close();
})();
