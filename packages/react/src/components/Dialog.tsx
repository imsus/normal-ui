import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { useEffect, useId, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { space } from '@imsus/normal-ui-css/tokens.stylex';
import { mergeRootProps } from './shared';

/**
 * A native <dialog> opened with showModal(): the browser traps focus, makes the page
 * inert and closes on Esc. `open` drives it; `onClose` gets the closing button's
 * value (form method="dialog"). Focus returns to the opener on close.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  role,
  children,
  actions,
  xstyle,
  className,
  style,
}: {
  open: boolean;
  onClose: (returnValue: string) => void;
  title: ReactNode;
  description?: ReactNode;
  /** "alertdialog" for confirmations of loss: description is read straight away. */
  role?: 'dialog' | 'alertdialog';
  children?: ReactNode;
  /** Buttons for the footer. A <button value="x"> closes the dialog with that value. */
  actions?: ReactNode;
  xstyle?: StyleXStyles;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      opener.current = document.activeElement;
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      role={role === 'alertdialog' ? 'alertdialog' : undefined}
      aria-labelledby={`${id}-h`}
      aria-describedby={description ? `${id}-d` : undefined}
      onClose={(e) => {
        onClose(e.currentTarget.returnValue);
        e.currentTarget.returnValue = '';
        (opener.current as HTMLElement | null)?.focus?.();
      }}
      {...mergeRootProps(stylex.props(styles.dialog, xstyle), { className, style })}
    >
      <form method="dialog">
        <h2 id={`${id}-h`} {...stylex.props(styles.title)}>{title}</h2>
        {description ? <p id={`${id}-d`}>{description}</p> : null}
        {children}
        {actions ? <p {...stylex.props(styles.actions)}>{actions}</p> : null}
      </form>
    </dialog>
  );
}

/**
 * A dialog that interrupts to confirm loss or an irreversible action. The first
 * action is the safe one and gets focus.
 */
export function AlertDialog({
  open,
  onClose,
  title,
  description,
  cancel,
  confirm,
  className,
  style,
}: {
  open: boolean;
  onClose: (confirmed: boolean) => void;
  title: ReactNode;
  description: ReactNode;
  /** The safe choice, named with a verb: "Keep editing". */
  cancel: string;
  /** The destructive choice: "Discard changes". */
  confirm: string;
  /** Extra classes, forwarded to the dialog. */
  className?: string;
  /** Inline style, forwarded to the dialog. */
  style?: CSSProperties;
}) {
  return (
    <Dialog
      open={open}
      role="alertdialog"
      onClose={(v) => onClose(v === 'confirm')}
      title={title}
      description={description}
      className={className}
      style={style}
      actions={
        <>
          <button value="cancel" autoFocus>{cancel}</button>
          <button value="confirm">{confirm}</button>
        </>
      }
    />
  );
}

const styles = stylex.create({
  dialog: { maxWidth: `min(26rem, calc(100% - 2 * ${space.md}))` },
  title: { marginTop: 0, fontSize: '1.17em' },
  actions: { display: 'flex', gap: space.sm, justifyContent: 'flex-end', flexWrap: 'wrap', marginBottom: 0 },
});
