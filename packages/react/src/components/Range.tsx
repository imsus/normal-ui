'use client';

import * as stylex from '@stylexjs/stylex';
import { useId, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { Button } from './Button';
import { ButtonGroup, buttonGroupItem } from './ButtonGroup';
import { Fieldset } from './Field';
import { clamp, mergeRootProps, shared } from './shared';

const styles = stylex.create({
  range: { width: '100%', minHeight: shape.targetMin, margin: 0 },
  wrap: { maxWidth: '24rem' },
  out: { display: 'block', marginBlockStart: space.sm },
});

/**
 * A native range input with its value in words beside it. `describe` turns the
 * value into the sentence (and `valueText` into what screen readers say).
 */
export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = min,
  onChange,
  describe,
  valueText = String,
  className,
  style,
}: {
  label: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  describe: (value: number) => ReactNode;
  valueText?: (value: number) => string;
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  return (
    <div {...mergeRootProps(stylex.props(shared.field, styles.wrap), { className, style })}>
      <label htmlFor={id}>{label}</label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText(value)}
        aria-describedby={`${id}-o`}
        onChange={(e) => {
          setValue(+e.target.value);
          onChange?.(+e.target.value);
        }}
        {...stylex.props(styles.range)}
      />
      <output id={`${id}-o`} htmlFor={id}>
        {describe(value)}
      </output>
    </div>
  );
}

/**
 * The multi-thumb slider as two labelled native ranges. The minimum never passes the
 * maximum: moving one pushes the other.
 */
export function RangeSlider({
  legend,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [min, max],
  format = String,
  labels = ['Minimum', 'Maximum'],
  onChange,
  className,
  style,
}: {
  legend: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: [number, number];
  format?: (value: number) => string;
  labels?: [string, string];
  onChange?: (value: [number, number]) => void;
  /** Extra classes, forwarded to the Fieldset. Unlayered CSS wins. */
  className?: string;
  /** Inline style, forwarded to the Fieldset. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  const [[lo, hi], setRange] = useState(defaultValue);
  const set = (next: [number, number]) => {
    setRange(next);
    onChange?.(next);
  };
  return (
    <Fieldset legend={legend} xstyle={styles.wrap} className={className} style={style}>
      <div {...stylex.props(shared.field)}>
        <label htmlFor={`${id}-lo`}>{labels[0]}</label>
        <input type="range" id={`${id}-lo`} min={min} max={max} step={step} value={lo} aria-valuetext={format(lo)}
          onChange={(e) => { const v = +e.target.value; set([v, Math.max(v, hi)]); }} {...stylex.props(styles.range)} />
        <label htmlFor={`${id}-hi`}>{labels[1]}</label>
        <input type="range" id={`${id}-hi`} min={min} max={max} step={step} value={hi} aria-valuetext={format(hi)}
          onChange={(e) => { const v = +e.target.value; set([Math.min(lo, v), v]); }} {...stylex.props(styles.range)} />
      </div>
      <output htmlFor={`${id}-lo ${id}-hi`} {...stylex.props(styles.out)}>
        Showing products from <b>{format(lo)}</b> to <b>{format(hi)}</b>.
      </output>
    </Fieldset>
  );
}

/**
 * A number field with large − and + buttons (44px targets). Buttons disable at the
 * limits, and `hint` states the limits in words.
 */
export function Spinbutton({
  label,
  min,
  max,
  step = 1,
  defaultValue = min,
  hint,
  noun = 'quantity',
  onChange,
  className,
  style,
}: {
  label: ReactNode;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  hint: ReactNode;
  /** Used in the button names: "Decrease quantity". */
  noun?: string;
  onChange?: (value: number) => void;
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  // The latest value, read by the buttons, so clicks in quick succession all count
  // (the rendered `value` can lag a click behind).
  const latest = useRef(defaultValue);
  const set = (v: number) => {
    latest.current = v;
    setValue(v);
    onChange?.(v);
  };
  const stepBy = (d: number) => set(clamp(latest.current + d, min, max));
  return (
    <div {...mergeRootProps(stylex.props(shared.field), { className, style })}>
      <label htmlFor={id}>{label}</label>
      {/* One joined control: the buttons are extra 44px square targets around the native field. */}
      <ButtonGroup>
        <Button aria-controls={id} aria-label={`Decrease ${noun}`} disabled={value <= min}
          onClick={() => stepBy(-step)} square xstyle={spin.btn}>−</Button>
        <input type="number" id={id} min={min} max={max} step={step} value={value} inputMode="numeric"
          aria-describedby={`${id}-h`} onChange={(e) => set(+e.target.value)}
          {...stylex.props(buttonGroupItem.item, spin.input)} />
        <Button aria-controls={id} aria-label={`Increase ${noun}`} disabled={value >= max}
          onClick={() => stepBy(step)} square xstyle={spin.btn}>+</Button>
      </ButtonGroup>
      <small id={`${id}-h`} {...stylex.props(shared.muted)}>{hint}</small>
    </div>
  );
}

const spin = stylex.create({
  // 44px square targets; the field between them stretches to the same height.
  btn: { width: 44, height: 44 },
  input: { width: '5ch', textAlign: 'center' },
});
