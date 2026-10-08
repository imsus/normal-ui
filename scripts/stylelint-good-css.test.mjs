import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { default: config } = await import('../stylelint.config.mjs');

async function lint(css) {
  const { results } = await stylelint.lint({ code: css, config, configBasedir: ROOT });
  return results[0].warnings.map((w) => `${w.line}:${w.rule}`);
}

describe('good-css/hover-media', () => {
  it('flags :hover outside the hover media query', async () => {
    assert.deepEqual(await lint(`a:hover { color: red; }`), ['1:good-css/hover-media']);
  });

  it('passes :hover inside @media (hover: hover) and (pointer: fine)', async () => {
    assert.deepEqual(
      await lint(`@media (hover: hover) and (pointer: fine) { a:hover { color: red; } }`),
      [],
    );
  });

  it('flags :hover inside an unrelated media query', async () => {
    assert.deepEqual(await lint(`@media (max-width: 40rem) { a:hover { color: red; } }`), [
      '1:good-css/hover-media',
    ]);
  });

  it('ignores selectors without :hover', async () => {
    assert.deepEqual(await lint(`a:focus-visible { outline: 2px solid blue; }`), []);
  });
});

describe('good-css/motion-media', () => {
  it('flags moving transitions outside no-preference', async () => {
    assert.deepEqual(await lint(`.c { transition: rotate 0.15s; }`), ['1:good-css/motion-media']);
    assert.deepEqual(await lint(`.c { transition: block-size 0.2s ease; }`), ['1:good-css/motion-media']);
    assert.deepEqual(await lint(`.c { transition-property: transform; }`), ['1:good-css/motion-media']);
    assert.deepEqual(await lint(`.c { transition: opacity 0.2s, translate 0.2s; }`), [
      '1:good-css/motion-media',
    ]);
  });

  it('passes moving transitions inside no-preference', async () => {
    assert.deepEqual(
      await lint(
        `@media (prefers-reduced-motion: no-preference) { .c { transition: rotate 0.15s; } }`,
      ),
      [],
    );
  });

  it('passes opacity and colour fades anywhere', async () => {
    assert.deepEqual(await lint(`.c { transition: opacity 0.2s ease; }`), []);
    assert.deepEqual(await lint(`.c { transition: color 0.2s, background-color 0.2s; }`), []);
    assert.deepEqual(await lint(`.c { transition: content-visibility 0.2s allow-discrete; }`), []);
    assert.deepEqual(await lint(`.c { transition: none; }`), []);
  });

  it('reads the property even when the duration comes first', async () => {
    assert.deepEqual(await lint(`.c { transition: 0.2s ease transform; }`), ['1:good-css/motion-media']);
    assert.deepEqual(await lint(`.c { transition: 0.2s ease opacity; }`), []);
  });
});

describe('good-css/no-physical-shorthand', () => {
  it('flags four-value margin, padding and inset shorthands', async () => {
    assert.deepEqual(await lint(`.c { margin: 0 8px 0 0; }`), ['1:good-css/no-physical-shorthand']);
    assert.deepEqual(await lint(`.c { padding: 1px 2px 3px 4px; }`), ['1:good-css/no-physical-shorthand']);
    assert.deepEqual(await lint(`.c { inset: 0 0 auto auto; }`), ['1:good-css/no-physical-shorthand']);
  });

  it('passes shorter and logical shorthands', async () => {
    assert.deepEqual(await lint(`.c { margin: 0; }`), []);
    assert.deepEqual(await lint(`.c { margin: 8px auto; }`), []);
    assert.deepEqual(await lint(`.c { padding: var(--a, 4px) var(--b, 8px); }`), []);
    assert.deepEqual(await lint(`.c { margin-block: 8px; padding-inline: 4px; }`), []);
  });
});

describe('disallowed values', () => {
  it('flags outline none, transition all, ease-in and overflow hidden', async () => {
    const rule = 'declaration-property-value-disallowed-list';
    assert.deepEqual(await lint(`.c { outline: none; }`), [`1:${rule}`]);
    assert.deepEqual(await lint(`.c { outline: 0; }`), [`1:${rule}`]);
    // `all` moves, so the motion rule reports it alongside the disallowed list.
    assert.deepEqual(await lint(`.c { transition: all 0.2s; }`), ['1:good-css/motion-media', `1:${rule}`]);
    assert.deepEqual(await lint(`.c { transition-timing-function: ease-in; }`), [`1:${rule}`]);
    assert.deepEqual(await lint(`.c { overflow: hidden; }`), [`1:${rule}`]);
  });

  it('passes the replacements', async () => {
    assert.deepEqual(await lint(`.c { outline: 2px solid blue; }`), []);
    assert.deepEqual(await lint(`.c { outline-color: transparent; }`), []);
    assert.deepEqual(await lint(`.c { transition: opacity 0.2s ease-in-out; }`), []);
    assert.deepEqual(await lint(`.c { overflow: clip; }`), []);
  });
});

describe('logical properties', () => {
  it('flags physical properties', async () => {
    assert.deepEqual(await lint(`.c { margin-top: 0; }`), ['1:csstools/use-logical']);
    assert.deepEqual(await lint(`.c { border-bottom: 1px solid red; }`), ['1:csstools/use-logical']);
  });

  it('passes logical properties', async () => {
    assert.deepEqual(await lint(`.c { margin-block-start: 0; border-block-end: 1px solid red; }`), []);
  });

  it('passes width and height: 1.2 covers directions, not sizes', async () => {
    assert.deepEqual(await lint(`.c { width: 100%; max-width: 40rem; height: auto; min-height: 24px; }`), []);
  });
});
