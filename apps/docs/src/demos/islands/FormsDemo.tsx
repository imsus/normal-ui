import { Forms } from '../forms';

/** One forms demo, hydrated. Its own island so a page loads only this group's demos. */
export default function FormsDemo({ name }: { name: keyof typeof Forms }) {
  const D = Forms[name];
  return <D />;
}
