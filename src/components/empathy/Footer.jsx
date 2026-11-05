import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="no-print mt-12 text-center text-xs text-muted-foreground">
    <Link to="/privacy" className="underline-offset-4 hover:underline">Privacy</Link>
  </footer>;
}
