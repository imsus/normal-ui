---
"@imsus/normal-ui-react": patch
---

Joined seams follow the border width: the member overlap is `calc(-1 * control-border-width)` instead of a hardcoded `-1px`, so the govuk theme (2px borders) keeps single-line seams in ButtonGroup, Spinbutton and the new InputGroup instead of 3px ones.
