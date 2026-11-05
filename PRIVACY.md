# Privacy and data flow

This source release contains code, schemas, and fictional examples. It contains no production assessment records, real interview exports, credentials, or account secrets. The default preview does not configure a Base44 client and does not run live interviews.

If an operator enables live assessment:

1. Answers, nicknames, age band, selected context, and other prompt content are transmitted to the operator's configured Base44/AI providers. Their terms, retention, logs, locations, and subprocessors apply. The application cannot promise that providers retain nothing.
2. Full reports, questions, answers, names/nicknames, and unfinished sessions are saved automatically in browser localStorage when it is available. There is no pre-session storage opt-out in this preview. It is not encrypted by this application and is accessible to the same browser profile. Clear results and site data on shared devices. The local history currently keeps up to twelve reports.
3. This edition has no server record-storage, messaging, enquiry-submission, or account-management feature. An operator adding any of these must establish a separate data-flow and consent policy. No claims here describe other deployments.
4. Optional dictation and read-aloud use browser/OS speech services, which may process audio or spoken text remotely. The app does not enforce an on-device speech provider. Review the browser/OS vendor's privacy terms before use. Print/share actions can reveal report content to whoever receives it.


Use fictional data for development. Do not enter private information about other people. For any work involving children, establish appropriate parental consent, access controls, retention limits, deletion procedures, and applicable school/child-data requirements before enabling collection. A checkbox alone is not enough. This repository does not include legal advice or a compliance certification.

Base44 SDK analytics, development analytics, and visual-editor notifications are disabled in the release configuration. External informational links are user-initiated. Downloaded third-party services or adapted deployments may have additional behavior that their operator must review.
