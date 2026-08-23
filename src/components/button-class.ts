/**
 * The respec'd button baseline shared by every button composition.
 * State layers (busy/latched/disabled) key off attributes, mirroring the link atoms.
 */

export const buttonClass =
  "inline-flex min-h-8 @max-sm/preview:min-h-11 cursor-default select-none items-center justify-center gap-1.5 rounded-sm shadow-2xs shadow-zinc-300 dark:shadow-white/10 border border-zinc-500 dark:border-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 @max-sm/preview:px-3 text-base @max-sm/preview:text-lg leading-none text-black dark:text-white transition duration-100 enabled:hover:brightness-95 enabled:active:scale-98 enabled:active:brightness-90 enabled:active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed motion-reduce:transition-none enabled:motion-reduce:active:scale-100";

/** Latched visual state, driven by aria-pressed */
export const buttonLatched =
  "aria-pressed:text-blue-500 aria-pressed:border-zinc-600 dark:aria-pressed:border-zinc-500 aria-pressed:shadow-none aria-pressed:brightness-90 aria-pressed:inset-shadow-sm aria-pressed:inset-shadow-black/30";
