import { Link } from "react-router-dom";
export default function Privacy() {
  return <main className="mx-auto max-w-xl px-5 py-10 space-y-5">
    <h1 className="text-3xl font-semibold">Privacy in the community edition</h1>
    <p>Live assessment is off until an operator configures their own backend. Sample reports are fictional. No production records are included in this source release.</p>
    <p>When enabled, interview answers and context are sent to the operator’s Base44 and AI providers to generate questions and results. Provider logging, retention, location and terms must be checked by that operator. This edition does not promise zero retention.</p>
    <p>This edition has no server record-storage or messaging feature. It automatically saves full results, answers and unfinished sessions in this browser’s local storage when available; there is no pre-session storage opt-out. Anyone with access to the same browser profile may see them. Clear saved results and browser site data when finished, especially on shared devices.</p>
    <p>Use nicknames. Do not enter identifying school, family, medical or other private information. A parent or guardian must review and supervise use involving a child. A checkbox alone does not establish all consent or child-privacy requirements.</p>
    <p>Optional dictation and read-aloud use browser/OS speech services, which may process audio or spoken text remotely. This app does not enforce on-device processing. Check the browser/OS vendor’s privacy terms before using them.</p>
    <p>Scores are exploratory model outputs, not a diagnosis or a validated measure of a person. Do not use them for admissions, hiring, discipline, clinical or other consequential decisions.</p>
    <Link to="/">Back to the start</Link>
  </main>;
}
