Here’s a concise summary of the main technologies and concepts I used in my resume maker project:

React + TypeScript (optional) – Component-based architecture for dynamic UI.

State Management with useState – Stored formData in the parent App.tsx for a single source of truth.

Dynamic Forms – Used .map() to render multiple work experience inputs and textareas.

Add/Remove/Update Functionality – Implemented addExperience, removeExperience, and updateExperience to modify the state array.

Props and Callbacks – Passed state and update functions from parent to child components for live updates.

Controlled Inputs – Bound form inputs to state so the resume preview updates instantly.

React Keys – Used key={exp.id} to help React track list items.

Tailwind CSS – Styled the app with utility classes, including flex layouts and spacing.

Prevented Default Form Behavior – Avoided <form> submission issues by using div wrappers or type="button" on buttons.

Dynamic Resume Preview – Separate <Resume /> component renders live updates from formData.
