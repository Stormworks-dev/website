(() => {
  // node_modules/deadditizer/src/components.js
  var additiveComponents = /* @__PURE__ */ new Set([
    "additive_block"
    //comp list
  ]);

  // node_modules/deadditizer/src/parser.js
  function findNextComponent(xml, cursor) {
    while (cursor < xml.length) {
      const start = xml.indexOf("<c", cursor);
      if (start === -1) {
        return -1;
      }
      const next = xml[start + 2];
      if (next === ">" || /\s/.test(next)) {
        return start;
      }
      cursor = start + 2;
    }
    return -1;
  }
  function findAcAttributes(xml) {
    const attributes = [];
    let cursor = 0;
    while (true) {
      const componentStart = findNextComponent(xml, cursor);
      if (componentStart === -1) {
        break;
      }
      const componentEnd = xml.indexOf("</c>", componentStart);
      if (componentEnd === -1) {
        break;
      }
      const component = xml.slice(componentStart, componentEnd + 4);
      const objectStart = component.indexOf("<o");
      if (objectStart !== -1) {
        const objectEnd = component.indexOf(">", objectStart);
        if (objectEnd !== -1) {
          const object = component.slice(objectStart, objectEnd + 1);
          const acStart = object.search(/\sac="/);
          if (acStart !== -1) {
            const acEnd = object.indexOf('"', acStart + 5) + 1;
            const absoluteStart = componentStart + objectStart + acStart;
            const absoluteEnd = componentStart + objectStart + acEnd;
            attributes.push([absoluteStart, absoluteEnd]);
          }
        }
      }
      cursor = componentEnd + 4;
    }
    return attributes;
  }
  function deAdditize(xml) {
    const parser = new DOMParser();
    const document2 = parser.parseFromString(xml, "application/xml");
    if (document2.querySelector("parsererror")) {
      throw new Error("Invalid XML");
    }
    let blocksChanged2 = 0;
    let blocksPreserved2 = 0;
    const components = document2.querySelectorAll("c");
    const acAttributes = findAcAttributes(xml);
    let acIndex = 0;
    const removals = [];
    for (const component of components) {
      const object = component.querySelector("o");
      if (!object || !object.hasAttribute("ac")) {
        continue;
      }
      const componentName = component.getAttribute("d");
      if (additiveComponents.has(componentName)) {
        blocksPreserved2++;
      } else {
        const removal = acAttributes[acIndex];
        if (!removal) {
          throw new Error("Failed to locate additive color attribute");
        }
        removals.push(removal);
        blocksChanged2++;
      }
      acIndex++;
    }
    removals.reverse();
    let output2 = xml;
    for (const [start, end] of removals) {
      output2 = output2.slice(0, start) + output2.slice(end);
    }
    return {
      data: output2,
      blocksChanged: blocksChanged2,
      blocksPreserved: blocksPreserved2
    };
  }

  // web/static/deadditizer.js
  var input = document.querySelector(".deAddi-input .deAddi-editor");
  var output = document.querySelector(".deAddi-output-editor");
  var status = document.querySelector("#deAddi-status");
  var blocksChanged = document.querySelector("#blocks-changed");
  var blocksPreserved = document.querySelector("#blocks-preserved");
  var sizeBefore = document.querySelector("#size-before");
  var sizeAfter = document.querySelector("#size-after");
  var sizeReduction = document.querySelector("#size-reduction");
  var processTimeElement = document.querySelector("#process-time");
  var fileDrop = document.querySelector("#deAddi-file");
  var fileSelect = document.querySelector("#deAddi-select");
  var fileInput = document.querySelector("#deAddi-file-input");
  var download = document.querySelector("#deAddi-download");
  var copy = document.querySelector("#deAddi-copy");
  var outputFilename = "processed.xml";
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
    if (ms < 1e3) {
      return `${ms.toFixed(2)} ms`;
    }
    if (ms < 6e4) {
      return `${(ms / 1e3).toFixed(2)} s`;
    }
    return `${(ms / 6e4).toFixed(2)} min`;
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
    const result = deAdditize(xml);
    const processTime = performance.now() - start;
    output.value = result.data;
    blocksChanged.textContent = result.blocksChanged;
    blocksPreserved.textContent = result.blocksPreserved;
    const sizeBeforeBytes = new Blob([xml]).size;
    const sizeAfterBytes = new Blob([result.data]).size;
    sizeBefore.textContent = formatBytes(sizeBeforeBytes);
    sizeAfter.textContent = formatBytes(sizeAfterBytes);
    const reduction = (sizeBeforeBytes - sizeAfterBytes) / sizeBeforeBytes * 100;
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
      type: "application/xml"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = outputFilename;
    link.click();
    URL.revokeObjectURL(url);
  });
})();
