import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>hi</h1>
      <Link href="/signup">
        <button type="button">Go to hi2</button>
      </Link>
    </div>
  );
}
