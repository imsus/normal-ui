// Custom stylelint rules for the good-css adoption (plan P0.2). Runs through
// stylelint.config.mjs; covered by stylelint-good-css.test.mjs.
import stylelint from 'stylelint';

const HOVER_GATE = '(hover: hover) and (pointer: fine)';
const normalizeMedia = (params) => params.toLowerCase().replace(/\s+/g, ' ').trim();

function insideMedia(node, test) {
  let parent = node.parent;
  while (parent) {
    if (parent.type === 'atrule' && parent.name.toLowerCase() === 'media' && test(normalizeMedia(parent.params))) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

const hoverName = 'good-css/hover-media';
const hoverMessages = stylelint.utils.ruleMessages(hoverName, {
  rejected: 'Put :hover inside @media (hover: hover) and (pointer: fine) (good-css 5.2).',
});
const hoverRule = stylelint.createPlugin(
  hoverName,
  (primary) => (root, result) => {
    if (!stylelint.utils.validateOptions(result, hoverName, { actual: primary, possible: [true] })) return;
    root.walkRules((rule) => {
      if (!rule.selector || !/:hover/i.test(rule.selector)) return;
      if (insideMedia(rule, (params) => params === HOVER_GATE)) return;
      stylelint.utils.report({ ruleName: hoverName, result, node: rule, message: hoverMessages.rejected });
    });
  },
);

// Properties whose animation moves, scales or reflows content, so the
// transition belongs inside prefers-reduced-motion: no-preference (good-css
// motion). Everything else (opacity, colours, shadows, visibility) may fade
// anywhere. `all` is included: the disallowed-list rule flags the literal too.
const MOVING = new Set(
  `transform translate rotate scale perspective
   offset offset-position offset-path offset-distance offset-rotate offset-anchor
   top right bottom left inset inset-block inset-inline
   inset-block-start inset-block-end inset-inline-start inset-inline-end
   width height block-size inline-size min-width max-width min-height max-height
   min-block-size max-block-size min-inline-size max-inline-size aspect-ratio
   margin margin-top margin-right margin-bottom margin-left margin-block margin-inline
   margin-block-start margin-block-end margin-inline-start margin-inline-end
   padding padding-top padding-right padding-bottom padding-left padding-block padding-inline
   padding-block-start padding-block-end padding-inline-start padding-inline-end
   background-position background-position-x background-position-y background-size
   object-position clip-path
   font-size line-height letter-spacing word-spacing vertical-align
   gap row-gap column-gap flex flex-basis flex-grow flex-shrink order
   grid-template-columns grid-template-rows
   all`.split(/\s+/),
);
const TIME_RE = /^-?[\d.]+m?s$/i;
const TIMING_RE =
  /^(ease|linear|ease-in|ease-out|ease-in-out|step-start|step-end|jump-start|jump-end|jump-none|jump-both|start|end|allow-discrete|none)$/i;
const TIMING_FN_RE = /^(cubic-bezier|steps|linear)\(/i;

function splitTopLevel(value) {
  const parts = [];
  let depth = 0;
  let current = '';
  for (const char of value) {
    if (char === '(') depth++;
    if (char === ')') depth = Math.max(0, depth - 1);
    if (char === ',' && depth === 0) {
      parts.push(current);
      current = '';
    } else current += char;
  }
  parts.push(current);
  return parts;
}

/** Property names transitioned by a `transition` shorthand value. */
function shorthandProps(value) {
  const props = [];
  for (const item of splitTopLevel(value)) {
    // Whitespace split that keeps timing functions (which hold commas) whole.
    const tokens = [];
    let depth = 0;
    let current = '';
    for (const char of item.trim()) {
      if (char === '(') depth++;
      if (char === ')') depth = Math.max(0, depth - 1);
      if (/\s/.test(char) && depth === 0) {
        if (current) tokens.push(current);
        current = '';
      } else current += char;
    }
    if (current) tokens.push(current);
    if (tokens.length === 1 && tokens[0].toLowerCase() === 'none') continue;
    const prop = tokens.find(
      (t) => !TIME_RE.test(t) && !TIMING_RE.test(t) && !TIMING_FN_RE.test(t),
    );
    // No property named means the shorthand applies to all properties.
    props.push(prop ? prop.toLowerCase() : 'all');
  }
  return props;
}

const motionName = 'good-css/motion-media';
const motionMessages = stylelint.utils.ruleMessages(motionName, {
  rejected: (prop) =>
    `Put transitions of '${prop}' inside @media (prefers-reduced-motion: no-preference).`,
});
const motionRule = stylelint.createPlugin(
  motionName,
  (primary) => (root, result) => {
    if (!stylelint.utils.validateOptions(result, motionName, { actual: primary, possible: [true] })) return;
    root.walkDecls(/^transition(-property)?$/i, (decl) => {
      if (insideMedia(decl, (params) => params.includes('prefers-reduced-motion') && params.includes('no-preference'))) {
        return;
      }
      const props =
        decl.prop.toLowerCase() === 'transition-property'
          ? decl.value.split(',').map((p) => p.trim().toLowerCase())
          : shorthandProps(decl.value);
      for (const prop of props) {
        if (MOVING.has(prop)) {
          stylelint.utils.report({
            ruleName: motionName,
            result,
            node: decl,
            message: motionMessages.rejected(prop),
          });
          return;
        }
      }
    });
  },
);

const shorthandName = 'good-css/no-physical-shorthand';
const shorthandMessages = stylelint.utils.ruleMessages(shorthandName, {
  rejected: (prop) =>
    `Four-value ${prop} stays physical; use the -block / -inline pair (good-css 1.2).`,
});
const shorthandRule = stylelint.createPlugin(
  shorthandName,
  (primary) => (root, result) => {
    if (!stylelint.utils.validateOptions(result, shorthandName, { actual: primary, possible: [true] })) return;
    root.walkDecls(/^(margin|padding|inset)$/i, (decl) => {
      // Count whitespace-separated values, keeping var()/calc() whole.
      let depth = 0;
      let values = 1;
      let seen = false;
      for (const char of decl.value.trim()) {
        if (char === '(') depth++;
        if (char === ')') depth = Math.max(0, depth - 1);
        if (/\s/.test(char) && depth === 0) {
          if (seen) {
            values++;
            seen = false;
          }
        } else seen = true;
      }
      if (values === 4) {
        stylelint.utils.report({
          ruleName: shorthandName,
          result,
          node: decl,
          message: shorthandMessages.rejected(decl.prop.toLowerCase()),
        });
      }
    });
  },
);

export default [hoverRule, motionRule, shorthandRule];
