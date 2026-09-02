const telemetry = (() => {
  let config = null;

  function currentPage() {
    return config.pages[window.location.pathname];
  }

  function send(data) {
    const page = currentPage();

    if (page === undefined) {
      return;
    }

    fetch("/telemetry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        page,
      }),
      keepalive: true,
    });
  }

  function pageServed() {
    send({
      type: config.events.PAGE_SERVED,
    });
  }

  function view5() {
    send({
      type: config.events.VIEW_5,
    });
  }

  function read30() {
    send({
      type: config.events.READ_30,
    });
  }

  function link(target) {
    const targetId = config.link_targets[target];

    if (targetId === undefined) {
      return;
    }

    send({
      type: config.events.LINK_CLICK,
      target: targetId,
    });
  }

  function toolProcess({
    tool,
    inputBytes,
    outputBytes,
    processingMs,
    blocksChanged,
    blocksPreserved,
  }) {
    const toolId = config.tools[tool];

    if (toolId === undefined) {
      return;
    }

    send({
      type: config.events.TOOL_PROCESS,
      tool: toolId,
      input_bytes: inputBytes,
      output_bytes: outputBytes,
      processing_ms: processingMs,
      blocks_changed: blocksChanged,
      blocks_preserved: blocksPreserved,
    });
  }

  function setupLinks() {
    document.querySelectorAll("[data-telemetry]").forEach((element) => {
      element.addEventListener("click", () => {
        link(element.dataset.telemetry);
      });
    });
  }

  function setupTimers() {
    setTimeout(view5, 5000);
    setTimeout(read30, 30000);
  }

  async function setup() {
    const response = await fetch("/telemetry/config");

    if (!response.ok) {
      return;
    }

    config = await response.json();

    pageServed();
    setupLinks();
    setupTimers();
  }

  setup();

  return {
    pageServed,
    view5,
    read30,
    link,
    toolProcess,
  };
})();
