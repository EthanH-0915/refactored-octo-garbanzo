'use client'
import Image from "next/image";
import Link from 'next/link'
import { useRouter } from "next/navigation";


   
export default function Home() {
   const router = useRouter();
    const handleLogout = async (e: React.FormEvent) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // IMPORTANT — send/receive cookies
    });
    if (res.ok) {
      console.log("Logged out");
      router.push("/login");
    } else {
      console.error("Logout failed");
    };
  }
  return (
      <div>
        <h1>The hi are all gone. You kill them :(</h1>
        <Link href="/login">
          <button type="button" onClick={handleLogout}>Go to login</button>
        </Link>
      </div>
    );
  
}
