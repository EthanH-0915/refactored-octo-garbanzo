"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Example login flow - replace with real API call
    try {
      // const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      // if (!res.ok) throw new Error('Login failed');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT — send/receive cookies
        body: JSON.stringify({ email, password }),
      });
      setMessage("Login successful. Redirecting...");
      setStatus("success");
      // redirect to dashboard
      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Invalid username or password.")
      }
    } catch (err) {
      setMessage("Login failed.");
      setStatus("error");
    }
  };

  const handleRegister = () => {
    try {
      // const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      // if (!res.ok) throw new Error('Login failed');
      setStatus("success");
      // redirect to dashboard
      router.push("/signup");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">Welcome!</h1>
      <form className="login__form" onSubmit={handleLogin}>
        <div>
          <p>Email</p>
          <input
            type="email"
            id="email"
            className="login__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            id="password"
            className="login__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="login__button">Log in</button>
        </div>
        <div>
          <button type="button" onClick={handleRegister} className="login__button">Register</button>
        </div>
        {message && (
          <p
            className="login__message"
            style={{ color: status === "success" ? "green" : "red", marginTop: "10px", fontSize: "20px" }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
