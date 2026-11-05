import { Link } from 'react-router-dom';
export default function Schools() {
  return <main className="mx-auto max-w-xl px-5 py-12 space-y-5">
    <h1 className="text-3xl font-semibold">For educators and researchers</h1>
    <p>This community preview is for exploring an experimental reflection design with fictional examples. It is not a validated student assessment.</p>
    <p>Do not use scores for admissions, grading, discipline, selection, or decisions about individual children. The release does not provide a school data-collection service.</p>
    <p>Before any supervised research with real participants, establish appropriate consent, privacy and safeguarding procedures and evaluate the instrument independently.</p>
    <Link to="/samples" className="underline">Explore fictional sample results</Link>
  </main>;
}
