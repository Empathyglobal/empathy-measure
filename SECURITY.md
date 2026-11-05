# Security

## Supported scope

This is a research/source preview, not an audited production assessment service. No production app identity, secrets, or assessment records are included. Live inference is disabled by default. This edition does not include server record storage, messaging, or operational administration.

Before deploying any live feature, add and verify server-side authentication and authorization, request/schema validation, rate limits, spend limits, safe logging, retention/deletion controls, and abuse monitoring. Client-side feature flags and the one-session-per-day localStorage counter are not security controls. Never send secret keys to the browser.

The legacy AI integration needs review or replacement for newly created Base44 apps. No live end-to-end inference or email test is claimed by this release. Security controls must be tested against the operator's own configured environment with synthetic data.

Do not submit real assessment records, credentials, access tokens, or exploit details in public issues. Use the repository owner's private security-reporting channel if enabled. Do not test an unrelated production deployment without its operator's permission.
