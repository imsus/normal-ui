import { Content } from '../content';

/** One content demo, hydrated. Its own island so a page loads only this group's demos. */
export default function ContentDemo({ name }: { name: keyof typeof Content }) {
  const D = Content[name];
  return <D />;
}
