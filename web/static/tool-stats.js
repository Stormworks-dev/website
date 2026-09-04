async function updateToolStats() {
  try {
    const response = await fetch("/telemetry/stats");

    if (!response.ok) {
      return;
    }

    const stats = await response.json();

    const usage = document.querySelector("#tool-usage");
    const input = document.querySelector("#tool-input");

    if (usage) {
      usage.textContent = stats.uses.toLocaleString();
    }

    if (input) {
      input.textContent = stats.input_mb.toLocaleString(undefined, {
        maximumFractionDigits: 1,
      });
    }
  } catch {}
}

updateToolStats();
setInterval(updateToolStats, 60_000);
