import { Link } from 'react-router-dom';
export default function PageNotFound() {
  return <main className="mx-auto max-w-xl px-5 py-16 text-center">
    <h1 className="text-3xl font-semibold">Page not found</h1>
    <p className="my-4">This page is not part of the community preview.</p>
    <Link to="/" className="underline">Back to the start</Link>
  </main>;
}
