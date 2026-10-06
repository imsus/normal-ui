// StyleX never reads the value of a token imported from a .stylex module: it writes
// var(--x<hash>) where the hash comes from the importing package's path to the module
// (e.g. "@imsus/normal-ui-css:dist/tokens.stylex.js//space.md"), and fills in the
// value only if the defining file goes through the same build. Our token modules ship
// precompiled, so that never happens. Instead, define those names as real custom
// properties, computed by StyleX itself for each published path.
import { transformSync } from '@babel/core';
import stylexBabel from '@stylexjs/babel-plugin';
import syntaxTypescript from '@babel/plugin-syntax-typescript';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * `sources` are the token modules (URLs to their .stylex.ts sources); `published`
 * maps each to the canonical name consumers' StyleX hashes, `<package>:<path in package>`.
 * Returns a CSS rule declaring every constant under its hashed name.
 */
export function stylexConstVars(sources) {
  const decls = [];
  for (const { source, published } of sources) {
    const filename = fileURLToPath(source);
    const { metadata } = transformSync(readFileSync(filename, 'utf8'), {
      filename,
      babelrc: false,
      configFile: false,
      plugins: [
        syntaxTypescript,
        [stylexBabel, {
          dev: false,
          unstable_moduleResolution: {
            type: 'custom',
            getCanonicalFilePath: () => published,
            filePathResolver: () => null,
          },
        }],
      ],
    });
    for (const [, rule] of metadata.stylex) {
      if (rule?.constKey != null && rule.constVal != null) decls.push(`  --${rule.constKey}: ${rule.constVal};`);
    }
  }
  if (decls.length === 0) throw new Error('stylexConstVars: StyleX reported no constants');
  // A custom property holding var() resolves where it is declared, so redeclare it
  // wherever a scheme or theme can change the underlying token.
  return `/* StyleX names for the tokens (see scripts/stylex-const-vars.mjs). */\n` +
    `:root, [data-theme], [data-color-scheme] {\n${decls.join('\n')}\n}\n`;
}
