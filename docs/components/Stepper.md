# Stepper

An ordered list of steps: `<ol class="pd-steps" aria-label>`, with `data-done` on finished steps and `aria-current="step"` on the current one.

**Consumer provides:** the step names and which are done.

- Finished steps show a filled circle with a tick, read as "Done: Basket". The current step is bold with a 2px ring. Later steps are `gray-text`.
- Also say the position in the page heading or a line of text ("Step 3 of 4: Payment").
- Steps are not links unless people can really jump back; if they can, make finished steps links.
- For more than five steps, show "Step 3 of 7" instead of the full list on phones.
