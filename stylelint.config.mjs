// Stylelint config for the good-css adoption (plan P0.2). Generated token
// files are excluded here and checked through the token build instead.
export default {
  plugins: ['stylelint-use-logical', './scripts/stylelint-good-css.mjs'],
  // Phases must remove the disable comment with the violation it covers.
  reportNeedlessDisables: true,
  ignoreFiles: ['packages/css/src/styles/tokens.css', 'packages/css/src/styles/themes.css', '**/dist/**'],
  rules: {
    // Sizes stay physical: good-css 1.2 covers left/right/top/bottom in
    // spacing, borders, offsets and alignment, not width/height.
    'csstools/use-logical': ['always', { except: ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'] }],
    'good-css/hover-media': true,
    'good-css/motion-media': true,
    'good-css/no-physical-shorthand': true,
    'declaration-property-value-disallowed-list': [
      {
        outline: ['none', '0'],
        '/^transition/': ['/\\ball\\b/i', '/ease-in(?!-out)/i'],
        '/^animation/': ['/ease-in(?!-out)/i'],
        overflow: ['/\\bhidden\\b/i'],
        '/^overflow-(x|y|block|inline)$/': ['/\\bhidden\\b/i'],
      },
    ],
  },
};
