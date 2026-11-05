# Community preview 0.1.0

## Release changes

- Backend-free default preview; explicit opt-in for assessment inference.
- No original hosted app identity or API credits supplied.
- Messaging, server record storage, enquiry submission, account management, and operational administration are outside this edition.
- Community local-storage keys are separate from other deployments.
- Privacy wording describes model-provider processing and browser-local retention.
- Experimental scoring limitations visible throughout the application.
- Remote font/image dependencies removed, template dependencies reduced, and third-party notices added.
- Local tests and reproducible build instructions added.

## Known limitations

- The inference adapter targets a legacy Base44 client integration; new apps may need a server-side replacement.
- No live model inference, browser interaction, or production deployment was tested in preparing this snapshot.
- No evidence of psychometric validity, age norms, cross-language equivalence, or stability across model versions is supplied.
- LocalStorage is not encrypted and the client session counter does not prevent abuse.

Use fictional data and complete your own security/privacy review before enabling a real deployment.

## Source-preview checks (2026-11-05)

- Clean `npm ci --ignore-scripts`: passed.
- Nine Node tests, ESLint, TypeScript check, and Vite production build: passed.
- Server rendering of Landing, Samples, Privacy, and Schools: passed without browser use.
- Full `npm audit`: zero reported vulnerabilities at preparation time, after compatible updates and migration to React Router 7.18.5. This is not a guarantee of vulnerability-free software.
- Dependency inventory matches the 543 locked dependency entries.
- No live provider calls, real participant data, browser interactions, or deployments were used in these checks.

The MIT copyright holder is Eric Gonzalez, as confirmed by the project owner. Professional attribution uses Eric Gonzalez-Payne.
