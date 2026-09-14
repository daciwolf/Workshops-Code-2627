const fs = require("fs");
const path = require("path");

let nonce = 1000;
function id(prefix) {
  nonce += 1;
  return `${prefix}${nonce.toString(36)}`;
}

function el(partial) {
  return {
    id: id("e"),
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    angle: 0,
    strokeColor: "#1e1e1e",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    groupIds: ["ghost"],
    frameId: null,
    roundness: null,
    seed: nonce * 17,
    version: 1,
    versionNonce: nonce * 31,
    isDeleted: false,
    boundElements: null,
    updated: Date.now(),
    link: null,
    locked: false,
    ...partial,
  };
}

function ellipse(x, y, w, h, extra = {}) {
  return el({
    type: "ellipse",
    x,
    y,
    width: w,
    height: h,
    roundness: { type: 2 },
    ...extra,
  });
}

function diamond(x, y, w, h, extra = {}) {
  return el({
    type: "diamond",
    x,
    y,
    width: w,
    height: h,
    roundness: { type: 2 },
    ...extra,
  });
}

function rect(x, y, w, h, extra = {}) {
  return el({
    type: "rectangle",
    x,
    y,
    width: w,
    height: h,
    roundness: { type: 3 },
    ...extra,
  });
}

function text(x, y, w, h, value, extra = {}) {
  return el({
    type: "text",
    x,
    y,
    width: w,
    height: h,
    text: value,
    originalText: value,
    fontSize: extra.fontSize || 28,
    fontFamily: extra.fontFamily || 1,
    textAlign: extra.textAlign || "center",
    verticalAlign: extra.verticalAlign || "middle",
    baseline: extra.fontSize || 28,
    containerId: null,
    lineHeight: 1.25,
    autoResize: true,
    groupIds: extra.groupIds || ["ghost"],
    ...extra,
  });
}

const CX = 520;
const CY = 340;

function scene(elements, name) {
  return {
    type: "excalidraw",
    version: 2,
    source: "http://localhost:5000",
    elements,
    appState: {
      gridSize: null,
      viewBackgroundColor: "#f4f1ea",
      currentItemFontFamily: 1,
      name,
    },
    files: {},
  };
}

const shell = "#f1f3f5";
const shellStroke = "#495057";
const core = "#212529";
const eye = "#22b8cf";
const eyeInner = "#e7f5ff";
const pupil = "#0b7285";

const v1 = scene(
  [
    ellipse(CX - 160, CY - 160, 320, 320, {
      backgroundColor: "#99e9f2",
      strokeColor: "transparent",
      opacity: 25,
      roughness: 0,
      groupIds: ["ghost", "glow"],
    }),
    ellipse(CX - 95, CY - 95, 190, 190, {
      backgroundColor: core,
      strokeColor: "#000000",
      strokeWidth: 3,
    }),
    ellipse(CX - 48, CY - 48, 96, 96, {
      backgroundColor: eye,
      strokeColor: "#0c8599",
      strokeWidth: 2,
    }),
    ellipse(CX - 22, CY - 22, 44, 44, {
      backgroundColor: eyeInner,
      strokeColor: "transparent",
    }),
    ellipse(CX - 8, CY - 8, 16, 16, {
      backgroundColor: pupil,
      strokeColor: "transparent",
    }),
    diamond(CX - 28, CY - 195, 56, 110, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX - 28, CY + 85, 56, 110, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX - 195, CY - 28, 110, 56, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX + 85, CY - 28, 110, 56, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    text(CX - 160, CY + 210, 320, 40, "Destiny Ghost  v1", {
      fontSize: 32,
      strokeColor: "#1e1e1e",
      backgroundColor: "transparent",
      groupIds: [],
    }),
  ],
  "ghost-v1"
);

const v2 = scene(
  [
    ellipse(CX - 210, CY - 210, 420, 420, {
      backgroundColor: "#66d9e8",
      strokeColor: "transparent",
      opacity: 18,
      roughness: 0,
      groupIds: ["ghost", "glow"],
    }),
    ellipse(CX - 150, CY - 150, 300, 300, {
      backgroundColor: "#99e9f2",
      strokeColor: "transparent",
      opacity: 28,
      roughness: 0,
      groupIds: ["ghost", "glow"],
    }),
    diamond(CX - 42, CY - 230, 84, 150, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX - 42, CY + 80, 84, 150, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX - 230, CY - 42, 150, 84, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX + 80, CY - 42, 150, 84, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX + 78, CY - 198, 92, 92, {
      backgroundColor: "#dee2e6",
      strokeColor: shellStroke,
      strokeWidth: 2,
      angle: 0.78,
    }),
    diamond(CX - 170, CY - 198, 92, 92, {
      backgroundColor: "#dee2e6",
      strokeColor: shellStroke,
      strokeWidth: 2,
      angle: 0.78,
    }),
    diamond(CX + 78, CY + 106, 92, 92, {
      backgroundColor: "#dee2e6",
      strokeColor: shellStroke,
      strokeWidth: 2,
      angle: 0.78,
    }),
    diamond(CX - 170, CY + 106, 92, 92, {
      backgroundColor: "#dee2e6",
      strokeColor: shellStroke,
      strokeWidth: 2,
      angle: 0.78,
    }),
    ellipse(CX - 108, CY - 108, 216, 216, {
      backgroundColor: core,
      strokeColor: "#000000",
      strokeWidth: 4,
    }),
    ellipse(CX - 118, CY - 118, 236, 236, {
      backgroundColor: "transparent",
      strokeColor: "#868e96",
      strokeWidth: 1,
      opacity: 70,
    }),
    ellipse(CX - 58, CY - 58, 116, 116, {
      backgroundColor: "#0c8599",
      strokeColor: "#099268",
      strokeWidth: 2,
      opacity: 80,
    }),
    ellipse(CX - 50, CY - 50, 100, 100, {
      backgroundColor: eye,
      strokeColor: "#0b7285",
      strokeWidth: 2,
    }),
    ellipse(CX - 24, CY - 28, 48, 48, {
      backgroundColor: eyeInner,
      strokeColor: "transparent",
    }),
    ellipse(CX - 8, CY - 10, 16, 18, {
      backgroundColor: "#ffffff",
      strokeColor: "transparent",
    }),
    ellipse(CX - 10, CY - 6, 20, 20, {
      backgroundColor: pupil,
      strokeColor: "transparent",
    }),
    rect(CX - 10, CY - 248, 20, 36, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 2,
      roundness: { type: 3 },
    }),
    ellipse(CX - 8, CY - 262, 16, 16, {
      backgroundColor: eye,
      strokeColor: shellStroke,
      strokeWidth: 2,
    }),
    rect(CX - 70, CY - 8, 28, 12, {
      backgroundColor: "#868e96",
      strokeColor: "transparent",
      opacity: 55,
    }),
    rect(CX + 42, CY - 8, 28, 12, {
      backgroundColor: "#868e96",
      strokeColor: "transparent",
      opacity: 55,
    }),
    text(CX - 200, CY + 250, 400, 36, "Little Light  —  Ghost  v2", {
      fontSize: 28,
      strokeColor: "#1e1e1e",
      backgroundColor: "transparent",
      groupIds: [],
    }),
    text(CX - 200, CY + 290, 400, 28, "Traveler's companion, front view", {
      fontSize: 18,
      strokeColor: "#495057",
      backgroundColor: "transparent",
      groupIds: [],
    }),
  ],
  "ghost-v2"
);

const CY3 = 390;
const v3 = scene(
  [
    ellipse(CX - 200, CY3 - 200, 400, 400, {
      backgroundColor: "#99e9f2",
      strokeColor: "transparent",
      opacity: 22,
      roughness: 0,
      groupIds: ["ghost", "glow"],
    }),
    diamond(CX - 34, CY3 - 215, 68, 168, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX - 34, CY3 + 47, 68, 168, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX - 215, CY3 - 34, 168, 68, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX + 47, CY3 - 34, 168, 68, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 3,
    }),
    diamond(CX - 148, CY3 - 148, 72, 72, {
      backgroundColor: "#e9ecef",
      strokeColor: shellStroke,
      strokeWidth: 2,
    }),
    diamond(CX + 76, CY3 - 148, 72, 72, {
      backgroundColor: "#e9ecef",
      strokeColor: shellStroke,
      strokeWidth: 2,
    }),
    diamond(CX - 148, CY3 + 76, 72, 72, {
      backgroundColor: "#e9ecef",
      strokeColor: shellStroke,
      strokeWidth: 2,
    }),
    diamond(CX + 76, CY3 + 76, 72, 72, {
      backgroundColor: "#e9ecef",
      strokeColor: shellStroke,
      strokeWidth: 2,
    }),
    ellipse(CX - 100, CY3 - 100, 200, 200, {
      backgroundColor: core,
      strokeColor: "#000000",
      strokeWidth: 4,
    }),
    ellipse(CX - 88, CY3 - 88, 176, 176, {
      backgroundColor: "transparent",
      strokeColor: "#adb5bd",
      strokeWidth: 2,
      opacity: 55,
    }),
    ellipse(CX - 46, CY3 - 46, 92, 92, {
      backgroundColor: "#0c8599",
      strokeColor: "transparent",
      opacity: 70,
    }),
    ellipse(CX - 40, CY3 - 40, 80, 80, {
      backgroundColor: eye,
      strokeColor: "#0b7285",
      strokeWidth: 2,
    }),
    ellipse(CX - 18, CY3 - 22, 28, 28, {
      backgroundColor: eyeInner,
      strokeColor: "transparent",
    }),
    ellipse(CX - 6, CY3 - 8, 14, 14, {
      backgroundColor: pupil,
      strokeColor: "transparent",
    }),
    ellipse(CX - 22, CY3 - 26, 10, 10, {
      backgroundColor: "#ffffff",
      strokeColor: "transparent",
    }),
    rect(CX - 8, CY3 - 252, 16, 42, {
      backgroundColor: shell,
      strokeColor: shellStroke,
      strokeWidth: 2,
    }),
    ellipse(CX - 11, CY3 - 272, 22, 22, {
      backgroundColor: eye,
      strokeColor: shellStroke,
      strokeWidth: 2,
    }),
    text(CX - 220, CY3 + 250, 440, 36, "Little Light  —  Ghost  v3", {
      fontSize: 28,
      strokeColor: "#1e1e1e",
      backgroundColor: "transparent",
      groupIds: [],
    }),
    text(
      CX - 220,
      CY3 + 288,
      440,
      24,
      "Refined from screenshots: diamond petals, cleaner eye, antenna",
      {
        fontSize: 16,
        strokeColor: "#495057",
        backgroundColor: "transparent",
        groupIds: [],
      }
    ),
  ],
  "ghost-v3"
);

fs.writeFileSync(
  path.join(__dirname, "ghost-v1.excalidraw"),
  JSON.stringify(v1, null, 2)
);
fs.writeFileSync(
  path.join(__dirname, "ghost-v2.excalidraw"),
  JSON.stringify(v2, null, 2)
);
fs.writeFileSync(
  path.join(__dirname, "ghost-v3.excalidraw"),
  JSON.stringify(v3, null, 2)
);

module.exports = { v1, v2, v3 };
