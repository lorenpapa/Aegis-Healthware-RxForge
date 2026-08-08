# RxForge

RxForge is an interactive outpatient-pharmacy training prototype from Aegis
Healthware. It presents 15 fictional workflow scenarios and asks pharmacy
trainees to choose the safest next action.

The module provides immediate feedback, a running score, and links to FDA, DEA,
and HHS reference material. A score of 12 out of 15 (80%) passes the module. It
is an educational prototype, not clinical or legal guidance, and it does not
collect or store user or patient information.

Training content is educational. Technician responsibilities vary by
jurisdiction and must follow applicable law, pharmacist supervision, and
pharmacy policy.

## What the prototype includes

- 15 decision-based outpatient-pharmacy scenarios
- Three answer choices per scenario
- Immediate correct-answer feedback and explanations
- A running score and completion summary
- An unambiguous 12/15 (80%) passing score
- Links to primary government resources
- Responsive desktop and mobile layouts
- Fictional patients and events
- No login and no persistent data

## How the application is organized

- `app/page.tsx` contains the page components and quiz behavior.
- `app/training-data.ts` contains the scenarios and reference links.
- `app/globals.css` contains the visual design and responsive styles.
- `app/layout.tsx` defines the page metadata, fonts, and favicon.
- `public/` contains the RxForge favicon.
- `tests/` contains content, scoring, restart, and rendered-page tests.
- `worker/`, `build/`, `scripts/`, and `vite.config.ts` support the OpenAI Sites,
  Cloudflare, Vite, and Vinext deployment environment.
- `db/`, `drizzle/`, `examples/d1/`, and `app/chatgpt-auth.ts` are optional
  starter infrastructure and are not used by the current prototype.

The quiz runs entirely in browser memory. Refreshing the page clears the current
question and score.

## Requirements

- Node.js 22.13.0 or newer
- The deployment helper scripts require Linux with `bash`, `flock`, `curl`, and
  GNU `timeout`

## Development

Dependencies are locked in `package-lock.json`.

```bash
npm run install:ci
npm run dev
```

The main project commands are:

- `npm run dev` — start the local Vite/Vinext development server
- `npm run lint` — run the ESLint checks
- `npm run build` — produce and validate the Sites deployment artifact
- `npm test` — build the application and run the rendered-page test
- `npm run validate:artifact` — validate an existing deployment artifact
- `npm run db:generate` — generate optional Drizzle migrations

## Editing the training content

Each entry in `app/training-data.ts` contains:

- a category and pharmacy station
- a scenario title and description
- three answer choices
- the zero-based position of the correct answer
- a feedback explanation
- an FDA, DEA, or HHS source

For example, `correct: 1` means the second answer choice is correct.

Changes to pharmacy guidance—and the current content—should be reviewed before
publication by a licensed pharmacist familiar with the target jurisdiction.
Technician duties vary by jurisdiction, and state law and organizational policy
may add requirements beyond the FDA, DEA, and HHS sources linked by the
prototype.

## Deployment structure

RxForge keeps the bundled OpenAI Sites architecture:

- Vinext provides the Next-compatible application runtime.
- Vite builds the application.
- A Cloudflare Worker serves the deployed site.
- `.openai/hosting.json` contains the Sites project metadata and optional
  resource bindings.
- The database, object-storage, and authentication scaffolding remain available
  for possible future modules but are not enabled in this release.

## Brand

- Studio: Aegis Healthware
- Product: RxForge
- Positioning: interactive training tools for safer healthcare workflows

RxForge currently uses fictional content for demonstration and educational
purposes only.
