# The Empathy Measure

Community source preview 0.1.0. See the release notes for verification and remaining limitations.

An experimental open-source conversation and reflection app created by **Eric Gonzalez-Payne**, part of **Empathy Global**. The project explores seven emotional skills through adaptive interview prompts, reflective reports, charts, and practical follow-up ideas.

## What you can run now

The community edition opens as a **backend-free preview**. You can explore the interface, fictional sample reports, and research background without an API key or access to the original hosted service. Live inference is off by default. This edition does not include messaging, server record storage, or operational administration.

```sh
npm ci --ignore-scripts
npm run dev
```

Use Node.js 20 or later. `npm run build` creates `dist/`; `npm run preview` serves that build. A static host must route application paths back to `index.html`. No original app ID or production credentials are included.

## Features and scope

- Ten-question adaptive interview design, with limited follow-up questions.
- Adult, teenager, and parent-report flows and multilingual prompts.
- Seven-axis report visualizations, printable views, and fictional sample reports.
- Automatic browser-local saving of results and unfinished sessions when storage is available; saved data can be cleared.
- Original prompt and scoring design retained for study and adaptation.

**This is not a validated psychological test.** Reliability, age norms, cross-language equivalence, and comparability across sessions have not been established. Scores are model-generated interpretations with heuristic constraints, including a minimum spread between skills; they are not population percentiles. Research cited in the app concerns broader social and emotional skills and does not validate this instrument. Do not use it for clinical diagnosis, school admission, grading, discipline, employment, or other consequential decisions.

## Bringing your own backend

Copy `.env.example` to `.env.local` and configure only an app that you own. Keep `VITE_ENABLE_ASSESSMENT=false` while reviewing and adapting the backend. The original service is not provided by this release, and its owners do not supply credits, credentials, user accounts, or support commitments.

The current integration is based on a legacy Base44 app. Its browser-side `Core.InvokeLLM` path may not be supported by newly created Base44 apps. A production deployment needs an authenticated backend adapter, schema validation, rate limits and budget controls, appropriate provider configuration, and an operator-specific privacy/consent review. Simply setting the feature flag is not a production deployment procedure.

After implementing those controls in your own environment, set `VITE_ENABLE_ASSESSMENT=true` to enable the interview and coaching boundary. AI requests send the entered answers and context to your configured providers. Do not place secret keys in any `VITE_` variable; these values become public browser code.

This edition contains the reflection interface, scoring/prompt design, fictional examples, and browser-local result handling. It does not include a database service, messaging system, account-management UI, or operational administration. Any added data collection needs a separately designed and reviewed backend. The optional inference client supplies no original-service access.


See [PRIVACY.md](PRIVACY.md), [SECURITY.md](SECURITY.md), [PROVENANCE.md](PROVENANCE.md), and [DEVELOPMENT_HISTORY.md](DEVELOPMENT_HISTORY.md) before adapting or deploying.

## Development checks

```sh
npm test
npm run lint
npm run build
npm run typecheck
```

Tests cover local result storage, score boundaries, fictional examples, and release safety invariants. Build and lint are executable checks; they do not establish clinical validity or production security. The community preview passes type checking; check outcomes and limitations are documented in [RELEASE_NOTES.md](RELEASE_NOTES.md). No live service or real assessment data is required for the checks.

## License and credits

Project code and documentation are released under the [MIT License](LICENSE). Third-party packages and copied UI components retain their own licenses and notices; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Empathy Global names and logos are not a grant of endorsement or trademark rights. Do not present an adapted deployment as the original hosted service.
