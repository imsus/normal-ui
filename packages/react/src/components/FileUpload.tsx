'use client';

import * as stylex from '@stylexjs/stylex';
import { useId, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { color, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { mergeRootProps, shared } from './shared';

export type UploadItem = { name: string; size: number; progress?: number; status: string };

/**
 * A native file input inside a large dashed drop zone. The whole zone is the label,
 * so a click anywhere opens the picker; dropping files is optional.
 */
export function FileUpload({
  label,
  prompt,
  hint,
  accept,
  multiple = true,
  files = [],
  onFiles,
  className,
  style,
}: {
  label: ReactNode;
  /** The words inside the zone. */
  prompt: ReactNode;
  /** Accepted types and size, in words. */
  hint: ReactNode;
  accept?: string;
  multiple?: boolean;
  /** Files to list under the zone, each with progress and a status word. */
  files?: UploadItem[];
  onFiles?: (files: File[]) => void;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const drag = (on: boolean) => (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(on);
  };
  return (
    <div {...mergeRootProps(stylex.props(shared.field, styles.wrap), { className, style })}>
      <span id={`${id}-l`}>{label}</span>
      <label
        onDragEnter={drag(true)}
        onDragOver={drag(true)}
        onDragLeave={drag(false)}
        onDrop={(e) => {
          drag(false)(e);
          onFiles?.([...e.dataTransfer.files]);
        }}
        {...stylex.props(styles.drop, dragging && styles.dragging)}
      >
        <span>{prompt}</span>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          aria-labelledby={`${id}-l`}
          aria-describedby={`${id}-h`}
          onChange={(e) => onFiles?.([...(e.target.files ?? [])])}
          {...stylex.props(styles.input)}
        />
        <small id={`${id}-h`} {...stylex.props(shared.muted)}>{hint}</small>
      </label>
      {files.length ? (
        <ul {...stylex.props(styles.list)}>
          {files.map((f, i) => (
            <li key={f.name + i}>
              <label htmlFor={`${id}-p${i}`}>
                {f.name}, {(f.size / 1048576).toFixed(1)} MB
              </label>
              {f.progress != null ? (
                <progress id={`${id}-p${i}`} max={100} value={f.progress}>{f.status}</progress>
              ) : null}{' '}
              <small>{f.status}</small>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const styles = stylex.create({
  wrap: { maxWidth: '28rem' },
  drop: {
    display: 'grid',
    justifyItems: 'center',
    gap: space.xs,
    paddingBlock: space.lg,
    paddingInline: space.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: { default: color.controlBorder, ':hover': color.canvasText },
    backgroundColor: { default: null, ':hover': color.highlight },
    color: { default: null, ':hover': color.highlightText },
    textAlign: 'center',
    cursor: 'pointer',
    outline: { default: null, ':has(input:focus-visible)': `${shape.focusWidth} solid ${color.focusRing}` },
    outlineOffset: shape.focusOffset,
  },
  dragging: { borderColor: color.canvasText, backgroundColor: color.highlight, color: color.highlightText },
  input: { maxWidth: '100%' },
  list: { listStyle: 'none', padding: 0, marginBlock: '8px 0', display: 'grid', gap: space.sm },
});
