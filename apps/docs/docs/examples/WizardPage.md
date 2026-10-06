# Wizard

A four-step setup. Each step asks about one topic, shows where you are, and saves as you go.

**Consumer provides:** the steps, each step's fields, and the save handler.

- Show the Stepper at the top and "Step 2 of 4" under the heading. The `h1` names the step.
- Back is on the left, the forward button on the right and names the next step ("Continue to payments"). Back never loses what was entered.
- Offer "Save and finish later" on every step.
- The last step is Review: every answer with a Change link back to its step, then one button to finish.
- On error, stay on the step and show the error summary; do not jump to another step.
