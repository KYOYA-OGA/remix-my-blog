import { Link } from '@remix-run/react';
import Container from './container';

export default function Header() {
  return (
    <Container>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight pt-8">
        <Link
          to="/"
          className="font-kaisei transition-colors hover:text-blue-900"
        >
          こっそり生きる。
        </Link>
      </h2>
    </Container>
  );
}
