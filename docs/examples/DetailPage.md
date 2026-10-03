# Order detail

Everything about one order: status, facts, items, a private note, an activity timeline, a main action and a More actions menu.

**Consumer provides:** the record's data, its history and the available actions.

- Breadcrumb back to the list; the `h1` names the record and carries its status Badge.
- One primary action as a button (the most likely next step); everything else goes in a MenuButton.
- Facts are a two-column `<dl>`: label in `gray-text`, value in `canvas-text`.
- The timeline is an `<ol reversed>`, newest first, each entry with a `<time>`. The newest dot is filled; the line joining them is `rule`.
- On narrow screens the activity column stacks under the details.
