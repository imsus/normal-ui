import { Actions } from './actions';
import { Content } from './content';
import { Forms } from './forms';
import { Status } from './status';
import { CardDemo } from './card';
import { LoadingDemo } from './loading';

const demos: Record<string, () => React.ReactNode> = { ...Actions, ...Content, ...Forms, ...Status, Card: CardDemo, Loading: LoadingDemo };

/** Renders one component's demo on the server. Interactive demos hydrate through their group's island in islands/. */
export default function Demo({ name }: { name: string }) {
  const D = demos[name];
  return D ? <D /> : <p>No demo for {name}.</p>;
}
