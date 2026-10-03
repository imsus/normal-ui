import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { color, space } from '../tokens.stylex';
import { shared } from './shared';

/*
 * Text fields, selects, checkboxes, radios and fieldsets. The native elements get
 * their look from base.css (16px text, 24px targets, 3:1 borders, :user-invalid);
 * these components add the label, hint and error wiring that every field needs.
 */

type FieldBits = {
  /** Visible label. Never replaced by a placeholder. */
  label: ReactNode;
  /** Help text under the field, linked with aria-describedby. */
  hint?: ReactNode;
  /** What went wrong and how to fix it. Sets aria-invalid and is linked with aria-describedby. */
  error?: ReactNode;
  /**
   * `stacked` (default): label above the field, for forms.
   * `inline`: label beside the field on one line, for toolbars, filters and top bars.
   * Hint and error text sit under the field either way.
   */
  layout?: 'stacked' | 'inline';
  xstyle?: StyleXStyles;
};

function useFieldIds(id: string | undefined, hint: unknown, error: unknown, describedBy?: string) {
  const auto = useId();
  const fieldId = id ?? auto;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const ids = [describedBy, errorId, hintId].filter(Boolean).join(' ') || undefined;
  return { fieldId, hintId, errorId, describedBy: ids };
}

function FieldFrame({ fieldId, label, hint, hintId, error, errorId, layout = 'stacked', xstyle, children }: FieldBits & {
  fieldId: string;
  hintId?: string;
  errorId?: string;
  children: ReactNode;
}) {
  return (
    <div {...stylex.props(shared.field, layout === 'inline' ? styles.inline : styles.frame, xstyle)}>
      <label htmlFor={fieldId}>{label}</label>
      {children}
      {error ? <small id={errorId} {...stylex.props(layout === 'inline' && styles.under)}>{error}</small> : null}
      {hint ? <small id={hintId} {...stylex.props(shared.muted, layout === 'inline' && styles.under)}>{hint}</small> : null}
    </div>
  );
}

export type TextFieldProps = FieldBits &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> & {
    /** Render a growing textarea (3 to 12 lines) instead of an input. */
    multiline?: false;
  };
export type TextAreaFieldProps = FieldBits &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'> & { multiline: true };

/** A label above an input or textarea, with optional hint and error text. */
export function TextField(props: TextFieldProps | TextAreaFieldProps) {
  const { label, hint, error, layout, xstyle, id, multiline, ...rest } = props;
  const ids = useFieldIds(id, hint, error, rest['aria-describedby']);
  const common = {
    id: ids.fieldId,
    'aria-describedby': ids.describedBy,
    'aria-invalid': error ? true : rest['aria-invalid'],
  };
  return (
    <FieldFrame label={label} hint={hint} error={error} layout={layout} xstyle={xstyle} {...ids}>
      {multiline ? (
        <textarea {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} {...common} />
      ) : (
        <input type="text" {...(rest as InputHTMLAttributes<HTMLInputElement>)} {...common} />
      )}
    </FieldFrame>
  );
}

export type SelectProps = FieldBits & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'style'>;

/** The native select, with the browser's own popup. Use for eight or more choices. */
export function Select({ label, hint, error, layout, xstyle, id, children, ...rest }: SelectProps) {
  const ids = useFieldIds(id, hint, error, rest['aria-describedby']);
  return (
    <FieldFrame label={label} hint={hint} error={error} layout={layout} xstyle={xstyle} {...ids}>
      {/* base.css draws the system arrow; the select keeps the browser's own popup. */}
      <select {...rest} id={ids.fieldId} aria-describedby={ids.describedBy} aria-invalid={error ? true : rest['aria-invalid']}>
        {children}
      </select>
    </FieldFrame>
  );
}

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'type'> & {
  label: ReactNode;
  xstyle?: StyleXStyles;
};

/** A checkbox wrapped in its label, so the whole label is the target. */
export function Checkbox({ label, xstyle, ...rest }: ChoiceProps) {
  return (
    <label {...stylex.props(styles.choice, xstyle)}>
      <input type="checkbox" {...rest} /> {label}
    </label>
  );
}

/** A radio wrapped in its label. Always inside a Fieldset whose legend asks the question. */
export function Radio({ label, xstyle, ...rest }: ChoiceProps) {
  return (
    <label {...stylex.props(styles.choice, xstyle)}>
      <input type="radio" {...rest} /> {label}
    </label>
  );
}

/** A fieldset with a legend that states the question or group name. */
export function Fieldset({ legend, children, xstyle }: { legend: ReactNode; children: ReactNode; xstyle?: StyleXStyles }) {
  return (
    <fieldset {...stylex.props(styles.fieldset, xstyle)}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}

const styles = stylex.create({
  frame: { maxWidth: '20rem' },
  inline: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto auto',
    // Size to the content even when a grid or flex parent would stretch it.
    width: 'fit-content',
    maxWidth: '100%',
    alignItems: 'center',
    columnGap: space.sm,
    rowGap: space.xs,
  },
  under: { gridColumn: 2 },
  choice: { display: 'block', width: 'fit-content' },
  fieldset: { maxWidth: '24rem', borderColor: color.controlBorder, marginInline: space.xxs },
});
