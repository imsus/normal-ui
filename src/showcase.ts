/**
 * Auto-generates <pre><code> snippets from live demo markup.
 * Each demo wrapper: <div data-demo="button">…markup…</div>
 * Sibling target: <pre data-snippet-for="button"> — filled at runtime.
 */

export function initSnippets() {
  document.querySelectorAll<HTMLElement>("[data-demo]").forEach((demo) => {
    const id = demo.dataset.demo;
    if (!id) return;
    const target = document.querySelector<HTMLElement>(`[data-snippet-for="${id}"]`);
    if (!target) return;
    target.textContent = demo.innerHTML.trim().replace(/></g, ">\n<");
  });
}
