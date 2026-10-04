import { Actions } from '../actions';

/** One actions demo, hydrated. Its own island so a page loads only this group's demos. */
export default function ActionsDemo({ name }: { name: keyof typeof Actions }) {
  const D = Actions[name];
  return <D />;
}
