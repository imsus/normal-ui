/**
 * Renders token swatches by reading CSS custom properties at runtime.
 * Keeps tokens.css the single source of truth — no duplicated hex values.
 */

export function cssVar(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value;
}

interface Swatch {
  name: string;
  varName: string;
  text?: string;
}

function swatchBlock(swatch: Swatch): string {
  const { name, varName, text } = swatch;
  return `
    <div class="flex items-center gap-3">
      <div class="size-10 shrink-0 rounded-lg border border-border ${text ?? ""}" style="background-color: var(${varName})"></div>
      <div class="min-w-0">
        <p class="truncate font-mono text-xs text-foreground">${name}</p>
        <p class="truncate font-mono text-xs text-muted-foreground">${cssVar(varName)}</p>
      </div>
    </div>`;
}

export function renderScale(containerId: string, prefix: string, steps: string[]) {
  const container = document.querySelector<HTMLElement>(`#${containerId}`);
  if (!container) return;
  container.innerHTML = steps
    .map((step) =>
      swatchBlock({
        name: `${prefix}-${step}`,
        varName: `--color-${prefix}-${step}`,
      }),
    )
    .join("");
}

export function renderSemantic(containerId: string) {
  const container = document.querySelector<HTMLElement>(`#${containerId}`);
  if (!container) return;
  const semantic = [
    "background",
    "foreground",
    "card",
    "card-foreground",
    "muted",
    "muted-foreground",
    "border",
    "input",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
    "ring",
    "success",
    "warning",
  ];
  container.innerHTML = semantic
    .map((name) =>
      swatchBlock({
        name,
        varName: `--color-${name}`,
        text:
          name.startsWith("foreground") || name === "primary" || name === "destructive"
            ? "text-background"
            : "",
      }),
    )
    .join("");
}
