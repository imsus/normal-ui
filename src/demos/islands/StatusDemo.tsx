import { Status } from '../status';

/** One status demo, hydrated. Its own island so a page loads only this group's demos. */
export default function StatusDemo({ name }: { name: keyof typeof Status }) {
  const D = Status[name];
  return <D />;
}
