import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { checkSource, applyAllowlist } from './check-stylex.mjs';

const file = 'packages/react/src/components/X.tsx';
const rules = (text) => checkSource(file, text).map((v) => [v.rule, v.fragment, v.line]);

describe('physical', () => {
  it('flags directional margin, padding, border and inset keys', () => {
    assert.deepEqual(rules(`const s = { marginTop: 0 };`), [['physical', 'marginTop', 1]]);
    assert.deepEqual(rules(`const s = { paddingLeft: 8 };`), [['physical', 'paddingLeft', 1]]);
    assert.deepEqual(rules(`const s = { borderBottomWidth: 1 };`), [['physical', 'borderBottomWidth', 1]]);
    assert.deepEqual(rules(`const s = { borderTop: '1px solid red' };`), [['physical', 'borderTop', 1]]);
    assert.deepEqual(rules(`const s = { top: 0 };`), [['physical', 'top', 1]]);
    assert.deepEqual(rules(`const s = { left: '8px' };`), [['physical', 'left', 1]]);
    assert.deepEqual(rules(`const s = { borderTopLeftRadius: 4 };`), [['physical', 'borderTopLeftRadius', 1]]);
  });

  it('passes logical keys', () => {
    assert.deepEqual(
      checkSource(file, `const s = { marginBlockStart: 0, paddingInline: 8, borderBlockEndWidth: 1, insetInlineStart: 0 };`),
      [],
    );
  });

  it('ignores matches inside comments', () => {
    assert.deepEqual(checkSource(file, `// marginTop: 0\nconst s = {};`), []);
    assert.deepEqual(checkSource(file, `/* marginTop: 0 */\nconst s = {};`), []);
    assert.deepEqual(checkSource(file, `/*\nmarginTop: 0\n*/\nconst s = {};`), []);
  });
});

describe('hover-media', () => {
  it('flags :hover keys outside the hover media query', () => {
    const [v] = checkSource(file, `const s = { color: { default: 'a', ':hover': 'b' } };`);
    assert.equal(v.rule, 'hover-media');
    assert.equal(v.fragment, "':hover'");
  });

  it('flags :hover with extra pseudo-classes', () => {
    const [v] = checkSource(file, `const s = { x: { default: 1, ':hover:not(:disabled)': 2 } };`);
    assert.equal(v.rule, 'hover-media');
    assert.equal(v.fragment, "':hover:not(:disabled)'");
  });

  it('passes :hover nested under the hover media query', () => {
    assert.deepEqual(
      checkSource(
        file,
        `const s = { color: { default: 'a', '@media (hover: hover) and (pointer: fine)': { ':hover': 'b' } } };`,
      ),
      [],
    );
  });

  it('ignores :hover outside key position', () => {
    assert.deepEqual(checkSource(file, `if (!t.matches(':hover, :focus-within')) onDismiss();`), []);
  });
});

describe('outline-none, overflow-hidden, transition-all, ease-in', () => {
  it("flags outline: 'none' but not replacements", () => {
    assert.deepEqual(rules(`const s = { outline: 'none' };`), [['outline-none', 'outline', 1]]);
    assert.deepEqual(checkSource(file, `const s = { outlineColor: 'transparent' };`), []);
    assert.deepEqual(checkSource(file, `const s = { outline: '2px solid blue' };`), []);
  });

  it("flags overflow: 'hidden' but not clip", () => {
    assert.deepEqual(rules(`const s = { overflow: 'hidden' };`), [['overflow-hidden', 'overflow', 1]]);
    assert.deepEqual(checkSource(file, `const s = { overflow: 'clip' };`), []);
  });

  it("flags transition of 'all' but not named properties", () => {
    assert.deepEqual(rules(`const s = { transition: 'all 0.2s' };`), [['transition-all', 'transition', 1]]);
    assert.deepEqual(rules(`const s = { transitionProperty: 'all' };`), [['transition-all', 'transitionProperty', 1]]);
    assert.deepEqual(checkSource(file, `const s = { transition: 'rotate 0.15s' };`), []);
  });

  it('flags ease-in but not ease-in-out', () => {
    assert.deepEqual(rules(`const s = { transition: 'opacity 0.2s ease-in' };`), [['ease-in', 'ease-in', 1]]);
    assert.deepEqual(checkSource(file, `const s = { transition: 'opacity 0.2s ease-in-out' };`), []);
  });
});

describe('disable comments', () => {
  it('suppresses a violation with a reasoned disable-line comment', () => {
    assert.deepEqual(
      checkSource(file, `const s = { top: 0 }; // check-stylex-disable-line physical -- anchored popover`),
      [],
    );
  });

  it('suppresses with a reasoned disable-next-line comment', () => {
    assert.deepEqual(
      checkSource(file, `// check-stylex-disable-next-line physical -- anchored popover\nconst s = { top: 0 };`),
      [],
    );
  });

  it('reports a disable comment without a reason', () => {
    const [v] = checkSource(file, `const s = { top: 0 }; // check-stylex-disable-line physical`);
    assert.equal(v.rule, 'disable-reason');
  });
});

describe('allowlist', () => {
  const violation = { file, line: 3, rule: 'physical', fragment: 'marginTop', message: 'm' };

  it('suppresses listed violations and reports unlisted ones', () => {
    const { unlisted, stale } = applyAllowlist([violation], [{ file, rule: 'physical', fragment: 'marginTop' }]);
    assert.deepEqual(unlisted, []);
    assert.deepEqual(stale, []);
  });

  it('reports stale entries so phases clean them up', () => {
    const { unlisted, stale } = applyAllowlist([], [{ file, rule: 'physical', fragment: 'marginTop' }]);
    assert.deepEqual(unlisted, []);
    assert.deepEqual(stale, [{ file, rule: 'physical', fragment: 'marginTop' }]);
  });

  it('counts duplicates: fixing one of two identical lines leaves one unlisted', () => {
    const { unlisted, stale } = applyAllowlist(
      [violation],
      [
        { file, rule: 'physical', fragment: 'marginTop' },
        { file, rule: 'physical', fragment: 'marginTop' },
      ],
    );
    assert.deepEqual(unlisted, []);
    assert.deepEqual(stale, [{ file, rule: 'physical', fragment: 'marginTop' }]);
  });
});

describe('cli', () => {
  const script = new URL('./check-stylex.mjs', import.meta.url).pathname;

  function makeRoot(files) {
    const root = mkdtempSync(join(tmpdir(), 'check-stylex-'));
    for (const [name, content] of Object.entries(files)) {
      const path = join(root, name);
      mkdirSync(join(path, '..'), { recursive: true });
      writeFileSync(path, content);
    }
    return root;
  }

  it('exits 0 on a clean tree', () => {
    const root = makeRoot({ 'packages/react/src/A.tsx': `export const s = { marginBlockStart: 0 };\n` });
    execFileSync(process.execPath, [script, '--root', root], { stdio: 'pipe' });
  });

  it('exits 1 on an unlisted violation', () => {
    const root = makeRoot({ 'packages/react/src/A.tsx': `export const s = { marginTop: 0 };\n` });
    assert.throws(() => execFileSync(process.execPath, [script, '--root', root], { stdio: 'pipe' }));
  });

  it('generates a valid allowlist that suppresses every violation', async () => {
    const root = makeRoot({
      'packages/react/src/A.tsx': `export const s = { color: { default: 1, ':hover': 2 }, marginTop: 0 };\n`,
    });
    const out = execFileSync(process.execPath, [script, '--root', root, '--generate-allowlist'], { encoding: 'utf8' });
    mkdirSync(join(root, 'scripts'), { recursive: true });
    writeFileSync(join(root, 'scripts', 'check-stylex.allowlist.mjs'), `export default [\n${out}];\n`);
    execFileSync(process.execPath, [script, '--root', root], { stdio: 'pipe' });
  });

  it('exits 0 when the violation is allowlisted', () => {
    const root = makeRoot({
      'packages/react/src/A.tsx': `export const s = { marginTop: 0 };\n`,
      'scripts/check-stylex.allowlist.mjs':
        `export default [{ file: 'packages/react/src/A.tsx', rule: 'physical', fragment: 'marginTop' }];\n`,
    });
    execFileSync(process.execPath, [script, '--root', root], { stdio: 'pipe' });
  });
});
