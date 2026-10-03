import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CommandPalette } from '../components/CommandPalette';
import type { Command } from '../components/CommandPalette';

/**
 * The docs' page finder palette, loaded on demand by the script in Docs.astro. It
 * fetches the page index (/search.json), mounts once, and from then on owns the
 * Ctrl+K shortcut itself. Returns a function that opens it.
 */
export async function mount(): Promise<() => void> {
  const commands: Command[] = await fetch(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/search.json`).then((r) => r.json());
  let open = () => {};
  const ready = new Promise<void>((resolve) => {
    function Palette() {
      const [isOpen, setOpen] = useState(false);
      useEffect(() => {
        open = () => setOpen(true);
        resolve();
      }, []);
      return (
        <CommandPalette open={isOpen} onOpenChange={setOpen} commands={commands} shortcut="k"
          label="Search the docs" placeholder="Go to a page…" noun={['page', 'pages']} />
      );
    }
    const host = document.createElement('div');
    document.body.append(host);
    createRoot(host).render(<Palette />);
  });
  await ready;
  return () => open();
}
