import { optimizeVehicle } from "vehicle-optimizer";

const input = document.querySelector(".veOpt-input .veOpt-editor");
const output = document.querySelector(".veOpt-output-editor");

const status = document.querySelector("#veOpt-status");
const blocksChanged = document.querySelector("#veOpt-blocks-changed");
const blocksPreserved = document.querySelector("#veOpt-blocks-preserved");
const sizeBefore = document.querySelector("#veOpt-size-before");
const sizeAfter = document.querySelector("#veOpt-size-after");
const sizeReduction = document.querySelector("#veOpt-size-reduction");
const processTimeElement = document.querySelector("#veOpt-process-time");

const fileDrop = document.querySelector("#veOpt-file");
const fileSelect = document.querySelector("#veOpt-select");
const fileInput = document.querySelector("#veOpt-file-input");

const download = document.querySelector("#veOpt-download");
const copy = document.querySelector("#veOpt-copy");

let outputFilename = "processed.xml";

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 ** 2) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  if (bytes < 1024 ** 3) {
    return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
  }

  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

function formatTime(ms) {
  if (ms < 1000) {
    return `${ms.toFixed(2)} ms`;
  }

  if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)} s`;
  }

  return `${(ms / 60000).toFixed(2)} min`;
}

function processInput() {
  const xml = input.value;

  if (!xml.trim()) {
    outputFilename = "processed.xml";

    status.textContent = "Ready";
    output.value = "";

    blocksChanged.textContent = "0";
    blocksPreserved.textContent = "0";
    sizeBefore.textContent = "0 B";
    sizeAfter.textContent = "0 B";
    sizeReduction.textContent = "0% smaller";
    processTimeElement.textContent = "0 ms";

    return;
  }

  const start = performance.now();
  const result = optimizeVehicle(xml);
  const processTime = performance.now() - start;

  const sizeBeforeBytes = new Blob([xml]).size;
  const sizeAfterBytes = new Blob([result.data]).size;

  telemetry.toolProcess({
    tool: "vehicle_optimizer",
    inputBytes: sizeBeforeBytes,
    outputBytes: sizeAfterBytes,
    processingMs: processTime,
    blocksChanged: result.blocksChanged,
    blocksPreserved: result.blocksPreserved,
  });

  output.value = result.data;

  blocksChanged.textContent = result.blocksChanged;
  blocksPreserved.textContent = result.blocksPreserved;

  sizeBefore.textContent = formatBytes(sizeBeforeBytes);
  sizeAfter.textContent = formatBytes(sizeAfterBytes);

  const reduction =
    ((sizeBeforeBytes - sizeAfterBytes) / sizeBeforeBytes) * 100;

  sizeReduction.textContent = `${reduction.toFixed(1)}% smaller`;
  processTimeElement.textContent = formatTime(processTime);

  status.textContent = "Processed";
}

input.addEventListener("input", processInput);

fileSelect.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (!file) {
    return;
  }

  outputFilename = file.name;

  file.text().then((xml) => {
    input.value = xml;
    processInput();
  });
});

fileDrop.addEventListener("dragenter", (event) => {
  if (event.dataTransfer.types.includes("Files")) {
    event.preventDefault();
    fileDrop.classList.add("dragging");
  }
});

fileDrop.addEventListener("dragover", (event) => {
  if (event.dataTransfer.types.includes("Files")) {
    event.preventDefault();
    fileDrop.classList.add("dragging");
  }
});

fileDrop.addEventListener("dragleave", () => {
  fileDrop.classList.remove("dragging");
});

fileDrop.addEventListener("drop", (event) => {
  if (!event.dataTransfer.types.includes("Files")) {
    return;
  }

  event.preventDefault();
  fileDrop.classList.remove("dragging");

  const file = event.dataTransfer.files[0];

  if (!file) {
    return;
  }

  outputFilename = file.name;

  file.text().then((xml) => {
    input.value = xml;
    processInput();
  });
});

copy.addEventListener("click", async () => {
  if (!output.value) {
    return;
  }

  await navigator.clipboard.writeText(output.value);
});

download.addEventListener("click", () => {
  if (!output.value) {
    return;
  }

  const blob = new Blob([output.value], {
    type: "application/xml",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = outputFilename;
  link.click();

  URL.revokeObjectURL(url);
});
