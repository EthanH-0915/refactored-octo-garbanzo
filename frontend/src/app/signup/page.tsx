// ...existing code...
'use client'
import Link from 'next/link'

export default function Signup() {
  return (
    <div>
      <h1>hi2</h1>
      <Link href="/login">
        <button type="button">Go to hi1</button>
      </Link>
    </div>
  )
}