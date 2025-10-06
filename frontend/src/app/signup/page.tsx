"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Example login flow - replace with real API call
    try {
      // const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      // if (!res.ok) throw new Error('Login failed');
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
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
    <div className="register">
  <h1 className="register__title">Register</h1>
      <form className="register__form" onSubmit={handleRegister}>
        <div>
          <p>Email</p>
          <input
            type="email"
            id="email"
            className="register__input"
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
            className="register__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Confirm Password</p>
          <input
            type="password"
            id="confirmPassword"
            className="register__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="register__button">Register</button>
        </div>
        <div>
          <button type="button" onClick={handleBack} className="register__button">Back</button>
        </div>
        {message && (
          <p
            className="register__message"
            style={{ color: status === "success" ? "green" : "red", marginTop: "10px", fontSize: "20px" }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
