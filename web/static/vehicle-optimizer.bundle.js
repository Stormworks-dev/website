(() => {
  // node_modules/vehicle-optimizer/src/components.js
  var defaultRotation = "1,0,0,0,1,0,0,0,1";
  var additiveComponents = /* @__PURE__ */ new Set([
    "additive_block"
    //
  ]);
  var nonRotatingComponents = /* @__PURE__ */ new Set([
    "01_block_weight",
    "no_sleep",
    "map_icon"
  ]);
  var defaultRotationRemovableComponents = /* @__PURE__ */ new Set([
    "01_block_weight",
    "no_sleep",
    "map_icon",
    "multibody_compact_pivot_b"
    //
  ]);

  // node_modules/vehicle-optimizer/src/parser.js
  function isWhitespace(code) {
    return code === 32 || code === 9 || code === 10 || code === 13;
  }
  function isNameChar(code) {
    return code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95 || code === 45 || code === 58 || code === 46;
  }
  function findNextC(xml, cursor) {
    while (cursor < xml.length) {
      const start = xml.indexOf("<c", cursor);
      if (start === -1) {
        return -1;
      }
      const next = xml.charCodeAt(start + 2);
      if (next === 62 || next === 47 || isWhitespace(next)) {
        return start;
      }
      cursor = start + 2;
    }
    return -1;
  }
  function findTagEnd(xml, cursor) {
    let quote = 0;
    while (cursor < xml.length) {
      const code = xml.charCodeAt(cursor);
      if (quote !== 0) {
        if (code === quote) {
          quote = 0;
        }
      } else if (code === 34 || code === 39) {
        quote = code;
      } else if (code === 62) {
        return cursor;
      }
      cursor++;
    }
    return -1;
  }
  function findComponentEnd(xml, cursor) {
    const start = xml.indexOf("</c>", cursor);
    if (start === -1) {
      return -1;
    }
    return start + 4;
  }
  function findObjectStart(xml, cursor, end) {
    while (cursor < end) {
      const start = xml.indexOf("<o", cursor);
      if (start === -1 || start >= end) {
        return -1;
      }
      const next = xml.charCodeAt(start + 2);
      if (next === 62 || next === 47 || isWhitespace(next)) {
        return start;
      }
      cursor = start + 2;
    }
    return -1;
  }
  function readComponentId(xml, start, end) {
    let cursor = start + 2;
    while (cursor < end) {
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= end || xml.charCodeAt(cursor) === 62 || xml.charCodeAt(cursor) === 47) {
        return null;
      }
      const nameStart = cursor;
      while (cursor < end && isNameChar(xml.charCodeAt(cursor))) {
        cursor++;
      }
      const nameEnd = cursor;
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= end || xml.charCodeAt(cursor) !== 61) {
        cursor++;
        continue;
      }
      cursor++;
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= end || xml.charCodeAt(cursor) !== 34) {
        cursor++;
        continue;
      }
      cursor++;
      const valueStart = cursor;
      while (cursor < end && xml.charCodeAt(cursor) !== 34) {
        cursor++;
      }
      if (nameEnd - nameStart === 1 && xml.charCodeAt(nameStart) === 100) {
        return xml.slice(valueStart, cursor);
      }
      if (cursor < end) {
        cursor++;
      }
    }
    return null;
  }
  function matches(xml, start, end, value) {
    if (end - start !== value.length) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (xml.charCodeAt(start + i) !== value.charCodeAt(i)) {
        return false;
      }
    }
    return true;
  }
  function isDefaultRotation(xml, start, end) {
    return matches(xml, start, end, defaultRotation);
  }
  function isPureRotation(xml, start, end) {
    let cursor = start;
    let count = 0;
    let sum = 0;
    while (cursor < end) {
      while (cursor < end && (xml.charCodeAt(cursor) === 44 || isWhitespace(xml.charCodeAt(cursor)))) {
        cursor++;
      }
      if (cursor >= end) {
        break;
      }
      let sign = 1;
      if (xml.charCodeAt(cursor) === 45) {
        sign = -1;
        cursor++;
      }
      let value = 0;
      let digits = 0;
      while (cursor < end) {
        const code = xml.charCodeAt(cursor);
        if (code < 48 || code > 57) {
          break;
        }
        value = value * 10 + code - 48;
        digits++;
        cursor++;
      }
      if (digits === 0) {
        return false;
      }
      sum += Math.abs(sign * value);
      count++;
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor < end && xml.charCodeAt(cursor) !== 44) {
        return false;
      }
    }
    return count === 9 && sum === 3;
  }
  function isNumericSc(xml, start, end) {
    if (start === end) {
      return false;
    }
    for (let cursor = start; cursor < end; cursor++) {
      const code = xml.charCodeAt(cursor);
      if (code < 48 || code > 57) {
        return false;
      }
    }
    return true;
  }
  function isBcAttribute(xml, start, end) {
    if (end - start === 2) {
      return xml.charCodeAt(start) === 98 && xml.charCodeAt(start + 1) === 99;
    }
    if (end - start < 3 || xml.charCodeAt(start) !== 98 || xml.charCodeAt(start + 1) !== 99) {
      return false;
    }
    for (let cursor = start + 2; cursor < end; cursor++) {
      const code = xml.charCodeAt(cursor);
      if (code < 48 || code > 57) {
        return false;
      }
    }
    return true;
  }
  function addRemoval(removals, start, end) {
    let cursor = removals.length;
    while (cursor > 0 && removals[cursor - 2] > start) {
      cursor -= 2;
    }
    removals.splice(cursor, 0, start, end);
  }
  function isEmptySlot(xml, start, end) {
    let cursor = start + 5;
    while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
      cursor++;
    }
    if (cursor >= end || xml.charCodeAt(cursor) !== 47) {
      return false;
    }
    cursor++;
    while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
      cursor++;
    }
    return cursor < end && xml.charCodeAt(cursor) === 62;
  }
  function isEmptyLogicSlots(xml, start, end) {
    let cursor = start;
    while (cursor < end) {
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= end) {
        return true;
      }
      const slotStart = xml.indexOf("<slot", cursor);
      if (slotStart !== cursor) {
        return false;
      }
      const slotEnd = findTagEnd(xml, slotStart);
      if (slotEnd === -1 || slotEnd >= end || !isEmptySlot(xml, slotStart, slotEnd + 1)) {
        return false;
      }
      cursor = slotEnd + 1;
    }
    return true;
  }
  function processObject(xml, objectStart, objectEnd, componentEnd, componentId) {
    const removals = [];
    const bcRanges = [];
    let scPresent = false;
    let scNumeric = false;
    let blocksChanged2 = 0;
    let blocksPreserved2 = 0;
    let cursor = objectStart + 2;
    while (cursor < objectEnd) {
      while (cursor < objectEnd && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= objectEnd || xml.charCodeAt(cursor) === 47) {
        break;
      }
      const nameStart = cursor;
      while (cursor < objectEnd && isNameChar(xml.charCodeAt(cursor))) {
        cursor++;
      }
      const nameEnd = cursor;
      while (cursor < objectEnd && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= objectEnd || xml.charCodeAt(cursor) !== 61) {
        cursor++;
        continue;
      }
      cursor++;
      while (cursor < objectEnd && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= objectEnd || xml.charCodeAt(cursor) !== 34) {
        cursor++;
        continue;
      }
      cursor++;
      const valueStart = cursor;
      while (cursor < objectEnd && xml.charCodeAt(cursor) !== 34) {
        cursor++;
      }
      const valueEnd = cursor;
      const attrEnd = cursor < objectEnd ? cursor + 1 : cursor;
      const attrStart = nameStart > objectStart && isWhitespace(xml.charCodeAt(nameStart - 1)) ? nameStart - 1 : nameStart;
      if (matches(xml, nameStart, nameEnd, "ac")) {
        if (additiveComponents.has(componentId)) {
          blocksPreserved2++;
        } else {
          addRemoval(removals, attrStart, attrEnd);
          blocksChanged2++;
        }
      } else if (matches(xml, nameStart, nameEnd, "r")) {
        if (isDefaultRotation(xml, valueStart, valueEnd) && defaultRotationRemovableComponents.has(componentId) || isPureRotation(xml, valueStart, valueEnd) && (componentId === null || nonRotatingComponents.has(componentId))) {
          addRemoval(removals, attrStart, attrEnd);
        }
      } else if (matches(xml, nameStart, nameEnd, "sc")) {
        scPresent = true;
        scNumeric = isNumericSc(xml, valueStart, valueEnd);
        if (scNumeric) {
          addRemoval(removals, attrStart, attrEnd);
        }
      } else if (isBcAttribute(xml, nameStart, nameEnd)) {
        bcRanges.push(attrStart, attrEnd);
      } else if (matches(xml, nameStart, nameEnd, "name")) {
        if (matches(xml, valueStart, valueEnd, "Microcontroller")) {
          addRemoval(removals, attrStart, attrEnd);
        }
      } else if (matches(xml, nameStart, nameEnd, "description")) {
        if (matches(xml, valueStart, valueEnd, "No description set.")) {
          addRemoval(removals, attrStart, attrEnd);
        }
      }
      if (cursor < objectEnd) {
        cursor++;
      }
    }
    if (scPresent && !scNumeric) {
      for (let i = 0; i < bcRanges.length; i += 2) {
        addRemoval(removals, bcRanges[i], bcRanges[i + 1]);
      }
    }
    cursor = objectEnd + 1;
    while (cursor < componentEnd - 4) {
      const tagStart = xml.indexOf("<", cursor);
      if (tagStart === -1 || tagStart >= componentEnd - 4) {
        break;
      }
      if (xml.startsWith("<logic_slots", tagStart)) {
        const logicEnd = findTagEnd(xml, tagStart);
        if (logicEnd === -1 || logicEnd >= componentEnd - 4) {
          break;
        }
        if (xml.charCodeAt(logicEnd - 1) === 47) {
          cursor = logicEnd + 1;
          continue;
        }
        const closeStart = xml.indexOf("</logic_slots>", logicEnd + 1);
        if (closeStart === -1 || closeStart >= componentEnd - 4) {
          break;
        }
        if (isEmptyLogicSlots(xml, logicEnd + 1, closeStart)) {
          addRemoval(removals, tagStart, closeStart + 14);
          cursor = closeStart + 14;
          continue;
        }
        cursor = logicEnd + 1;
        continue;
      }
      if (xml.startsWith("<slot", tagStart)) {
        const slotEnd = findTagEnd(xml, tagStart);
        if (slotEnd !== -1 && slotEnd < componentEnd - 4 && isEmptySlot(xml, tagStart, slotEnd + 1)) {
          addRemoval(removals, tagStart, slotEnd + 1);
          cursor = slotEnd + 1;
          continue;
        }
      }
      cursor = tagStart + 1;
    }
    return {
      removals,
      blocksChanged: blocksChanged2,
      blocksPreserved: blocksPreserved2
    };
  }
  function optimizeVehicle(xml) {
    let cursor = 0;
    let copyCursor = 0;
    let output2 = null;
    let blocksChanged2 = 0;
    let blocksPreserved2 = 0;
    while (cursor < xml.length) {
      const componentStart = findNextC(xml, cursor);
      if (componentStart === -1) {
        break;
      }
      const componentTagEnd = findTagEnd(xml, componentStart);
      if (componentTagEnd === -1) {
        break;
      }
      const componentEnd = findComponentEnd(xml, componentTagEnd + 1);
      if (componentEnd === -1) {
        break;
      }
      const componentId = readComponentId(xml, componentStart, componentTagEnd);
      const objectStart = findObjectStart(
        xml,
        componentTagEnd + 1,
        componentEnd - 4
      );
      if (objectStart !== -1) {
        const objectEnd = findTagEnd(xml, objectStart);
        if (objectEnd !== -1 && objectEnd < componentEnd - 4) {
          const result = processObject(
            xml,
            objectStart,
            objectEnd,
            componentEnd,
            componentId
          );
          for (let i = 0; i < result.removals.length; i += 2) {
            const start = result.removals[i];
            const end = result.removals[i + 1];
            if (output2 === null) {
              output2 = [];
            }
            output2.push(xml.slice(copyCursor, start));
            copyCursor = end;
          }
          blocksChanged2 += result.blocksChanged;
          blocksPreserved2 += result.blocksPreserved;
        }
      }
      cursor = componentEnd;
    }
    if (output2 === null) {
      return {
        data: xml,
        blocksChanged: blocksChanged2,
        blocksPreserved: blocksPreserved2
      };
    }
    output2.push(xml.slice(copyCursor));
    return {
      data: output2.join(""),
      blocksChanged: blocksChanged2,
      blocksPreserved: blocksPreserved2
    };
  }

  // web/static/vehicle-optimizer.js
  var input = document.querySelector(".veOpt-input .veOpt-editor");
  var output = document.querySelector(".veOpt-output-editor");
  var status = document.querySelector("#veOpt-status");
  var blocksChanged = document.querySelector("#veOpt-blocks-changed");
  var blocksPreserved = document.querySelector("#veOpt-blocks-preserved");
  var sizeBefore = document.querySelector("#veOpt-size-before");
  var sizeAfter = document.querySelector("#veOpt-size-after");
  var sizeReduction = document.querySelector("#veOpt-size-reduction");
  var processTimeElement = document.querySelector("#veOpt-process-time");
  var fileDrop = document.querySelector("#veOpt-file");
  var fileSelect = document.querySelector("#veOpt-select");
  var fileInput = document.querySelector("#veOpt-file-input");
  var download = document.querySelector("#veOpt-download");
  var copy = document.querySelector("#veOpt-copy");
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
      blocksPreserved: result.blocksPreserved
    });
    output.value = result.data;
    blocksChanged.textContent = result.blocksChanged;
    blocksPreserved.textContent = result.blocksPreserved;
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
