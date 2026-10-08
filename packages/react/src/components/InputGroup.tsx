'use client';

import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { Children, cloneElement, Fragment, isValidElement } from 'react';
import type { CSSProperties, InputHTMLAttributes, ReactElement, ReactNode, SelectHTMLAttributes } from 'react';
import { color, font, shape, space, text } from '@imsus/normal-ui-css/tokens.stylex';
import { FieldFrame, useFieldIds } from './Field';
import type { FieldBits } from './Field';
import { JoinedContext, joined, useJoined } from './Joined';
import { mergeRootProps } from './shared';

// process.env.NODE_ENV is inlined by the consumer's bundler (Vite leaves it
// alone in library builds, so it survives here into dist).
declare const process: { env: { NODE_ENV?: string } };

export type InputGroupProps = FieldBits & {
  /** Disables every member. A single member can still be disabled on its own. */
  disabled?: boolean;
  /**
   * The group's id. With one input or select it becomes that member's id
   * (unless the member has its own), so the visible label points at it.
   */
  id?: string;
  children: ReactNode;
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
};

/**
 * A field whose control is a row of joined members: inputs and selects that
 * grow, addons (`https://`, `kg`) in their own bordered boxes, and buttons.
 * Wired like a TextField: one visible label plus hint and error.
 *
 * With one input or select the visible label points at it; with two or more
 * the row is a labelled group and each member names itself through a `label`
 * prop. Members must be direct children (fragments allowed): StyleX cannot
 * style them through selectors, so the group finds them here to wire their ids.
 */
export function InputGroup({ label, hint, error, layout, disabled, id, xstyle, className, style, children }: InputGroupProps) {
  const ids = useFieldIds(id, hint, error, undefined);

  const flat: ReactElement[] = [];
  const collect = (nodes: ReactNode) => {
    Children.forEach(nodes, (child) => {
      if (!isValidElement(child)) return;
      if (child.type === Fragment) collect((child.props as { children?: ReactNode }).children);
      else flat.push(child);
    });
  };
  collect(children);

  const isField = (el: ReactElement) => el.type === InputGroupInput || el.type === InputGroupSelect;
  const isAddon = (el: ReactElement) => el.type === InputGroupAddon;
  const fields = flat.filter(isField);
  const multi = fields.length > 1;

  const singleId = !multi ? ((fields[0]?.props as { id?: string } | undefined)?.id ?? ids.fieldId) : undefined;
  const labelId = multi ? `${ids.fieldId}-label` : undefined;

  // Every text addon takes an id; each input and select references its
  // neighbours'. Icon-only addons are aria-hidden and add nothing.
  const injected = new Map<ReactElement, Record<string, string>>();
  let addons = 0;
  flat.forEach((el) => {
    if (!isAddon(el)) return;
    const props = el.props as { id?: string; iconOnly?: boolean };
    if (props.iconOnly) return;
    injected.set(el, { id: props.id ?? `${ids.fieldId}-addon-${addons++}` });
  });
  flat.forEach((el, i) => {
    if (!isField(el)) return;
    const extra: Record<string, string> = {};
    if (!multi) extra.id = (el.props as { id?: string }).id ?? ids.fieldId;
    const neighbours = [flat[i - 1], flat[i + 1]]
      .filter((n): n is ReactElement => !!n && isAddon(n))
      .map((n) => injected.get(n)?.id)
      .filter((v): v is string => !!v);
    if (neighbours.length) extra.addonDescribedBy = neighbours.join(' ');
    if (Object.keys(extra).length) injected.set(el, extra);
  });
  const renderNodes = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (child) => {
      if (!isValidElement(child)) return child;
      if (child.type === Fragment) {
        const props = child.props as { children?: ReactNode };
        return cloneElement(child as ReactElement<{ children?: ReactNode }>, { children: renderNodes(props.children) });
      }
      const extra = injected.get(child);
      return extra ? cloneElement(child, extra) : child;
    });

  return (
    <JoinedContext.Provider value={{ joined: true, disabled, invalid: !!error, groupDescribedBy: ids.describedBy, multi }}>
      <FieldFrame
        label={label} hint={hint} error={error} layout={layout} xstyle={xstyle} className={className} style={style}
        fieldId={singleId ?? ids.fieldId} labelId={labelId} hintId={ids.hintId} errorId={ids.errorId}
      >
        <div role={multi ? 'group' : undefined} aria-labelledby={labelId} {...stylex.props(styles.row)}>
          {renderNodes(children)}
        </div>
      </FieldFrame>
    </JoinedContext.Provider>
  );
}

export type InputGroupInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Names this member for screen readers when the group holds two or more
   * inputs or selects. Rendered as aria-label; ignored when the group holds
   * one, where the visible label names it.
   */
  label?: string;
  xstyle?: StyleXStyles;
  /** @internal Adjacent text-addon ids, set by InputGroup. */
  addonDescribedBy?: string;
};

/** A native input joined into an InputGroup. Grows to share the row; several share it equally. */
export function InputGroupInput({ label, xstyle, className, style, addonDescribedBy, ...rest }: InputGroupInputProps) {
  const member = useMemberState(label, addonDescribedBy, rest);
  return (
    <input
      {...rest}
      aria-label={member.name}
      aria-describedby={member.describedBy}
      aria-invalid={member.ariaInvalid}
      disabled={member.disabled}
      {...mergeRootProps(stylex.props(member.group.joined && joined.item, styles.grow, member.invalid && joined.raised, xstyle), { className, style })}
    />
  );
}

export type InputGroupSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  /**
   * Names this member for screen readers when the group holds two or more
   * inputs or selects. Rendered as aria-label; ignored when the group holds
   * one, where the visible label names it.
   */
  label?: string;
  xstyle?: StyleXStyles;
  /** @internal Adjacent text-addon ids, set by InputGroup. */
  addonDescribedBy?: string;
};

/** A native select joined into an InputGroup. Grows like an input. */
export function InputGroupSelect({ label, xstyle, className, style, addonDescribedBy, ...rest }: InputGroupSelectProps) {
  const member = useMemberState(label, addonDescribedBy, rest);
  return (
    <select
      {...rest}
      aria-label={member.name}
      aria-describedby={member.describedBy}
      aria-invalid={member.ariaInvalid}
      disabled={member.disabled}
      {...mergeRootProps(stylex.props(member.group.joined && joined.item, styles.grow, member.invalid && joined.raised, xstyle), { className, style })}
    />
  );
}

export type InputGroupAddonProps = {
  /** Static text (`https://`, `kg`, `$`) or an icon. */
  children: ReactNode;
  /**
   * The addon is an icon with no text: it is hidden from screen readers and
   * adds nothing to its neighbours. Text addons are read through the adjacent
   * input's or select's description instead.
   */
  iconOnly?: boolean;
  xstyle?: StyleXStyles;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
  /** @internal The id neighbours reference, set by InputGroup. */
  id?: string;
};

/**
 * A static segment joined into an InputGroup: text or an icon in its own
 * bordered box, never inset inside the input's border. Fits its content.
 */
export function InputGroupAddon({ children, iconOnly = false, id, xstyle, className, style }: InputGroupAddonProps) {
  const group = useJoined();
  return (
    <span
      id={iconOnly ? undefined : id}
      aria-hidden={iconOnly || undefined}
      {...mergeRootProps(
        stylex.props(styles.addon, group.joined && joined.item, group.disabled && styles.addonDisabled, xstyle),
        { className, style },
      )}
    >
      {children}
    </span>
  );
}

function useMemberState(
  label: string | undefined,
  addonDescribedBy: string | undefined,
  attrs: { 'aria-label'?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling'; disabled?: boolean },
) {
  const group = useJoined();
  const name = group.multi ? (label ?? attrs['aria-label']) : attrs['aria-label'];
  if (group.multi && label == null && process.env.NODE_ENV !== 'production') {
    console.error('InputGroup: each input and select needs a `label` prop when the group holds more than one.');
  }
  // The invalid states, as base.css draws them: :user-invalid lifts through
  // joined.item itself, so only an explicit aria-invalid="true" lifts here.
  const selfInvalid = attrs['aria-invalid'] === true || attrs['aria-invalid'] === 'true';
  return {
    group,
    invalid: (group.invalid ?? false) || selfInvalid,
    name,
    // The addon's words read as part of the field, before the group's error and hint.
    describedBy: [attrs['aria-describedby'], addonDescribedBy, group.groupDescribedBy].filter(Boolean).join(' ') || undefined,
    ariaInvalid: group.invalid ? true : attrs['aria-invalid'],
    disabled: attrs.disabled || group.disabled,
  };
}

const styles = stylex.create({
  row: {
    display: 'flex',
    // The row never wraps: members share one line, inputs shrinking past their content.
    flexWrap: 'nowrap',
    // Members stretch to the tallest one, so an addon and its buttons line up with the field.
    alignItems: 'stretch',
  },
  // Inputs and selects share the row's space equally; xstyle can size one.
  grow: { flexGrow: 1, flexShrink: 1, flexBasis: '0%', minWidth: 0 },
  addon: {
    display: 'flex',
    alignItems: 'center',
    // The same box as the input beside it: its padding, the field surface, and its
    // own border. Never inset inside the input's border. The 6px is base.css's
    // input inline padding, which owns that value (there is no token for it).
    paddingBlock: space.xs,
    paddingInline: 6,
    backgroundColor: color.field,
    color: color.fieldText,
    borderWidth: shape.controlBorderWidth,
    borderStyle: 'solid',
    borderColor: { default: color.controlBorder, '@media (forced-colors: active)': 'CanvasText' },
    fontFamily: font.sans,
    fontSize: text.controlFontSize,
    lineHeight: text.controlLineHeight,
    whiteSpace: 'nowrap',
  },
  // Disabled takes the look base.css gives disabled fields: transparent, gray
  // text, dashed border. The written error still carries an invalid group.
  addonDisabled: {
    backgroundColor: 'transparent',
    color: { default: color.grayText, '@media (forced-colors: active)': 'GrayText' },
    borderStyle: 'dashed',
  },
});
