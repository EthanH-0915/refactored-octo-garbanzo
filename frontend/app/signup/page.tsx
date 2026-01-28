"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      // if (!res.ok) throw new Error('Login failed');
      
      setMessage("Register successful. Redirecting...");
      setStatus("success");
      // redirect to login (or dashboard) after success
      router.push("/login");
    } catch (err) {
      setMessage(err instanceof Error ? ` ${err.message}` : "");
      setStatus("error");
    }
  };

  const handleBack = () => {
    try {
      // const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      // if (!res.ok) throw new Error('Login failed');
      router.push("/login");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-gray-100 px-4 gap-20">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign in to your account</h2>
      <div className=" w-full max-w-md bg-gray-200 rounded-2xl shadow-lg p-8">
        <form className="space-y-5 flex flex-col items-center" onSubmit={handleRegister}>
          <div>
            <label className="flex flex-col justify-center items-center block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-80 h-[40px] border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            onClick={handleRegister}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already Have an Account?
          <Link href="/login" className="text-blue-600 hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
