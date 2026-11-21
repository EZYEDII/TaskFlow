"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password);
      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="tf-label">Email</label>
        <div className="tf-field">
          <Mail size={18} />
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="tf-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="tf-label">Password</label>
        <div className="tf-field">
          <Lock size={18} />
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            aria-invalid={!!error}
            className="tf-input"
          />
        </div>
        {error && (
          <p role="alert" className="tf-field-error">{error}</p>
        )}
      </div>

      <button type="submit" disabled={loading} className="tf-primary w-full">
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm tf-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="tf-link">Create account</Link>
      </p>
    </form>
  );
}