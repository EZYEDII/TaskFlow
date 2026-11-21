
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await register({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
      });

      router.push("/login?registered=true");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="tf-label">Full name</label>
        <input
          required
          minLength={2}
          maxLength={150}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          className="tf-input"
        />
      </div>

      <div>
        <label className="tf-label">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="tf-input"
        />
      </div>

      <div>
        <label className="tf-label">Password</label>
        <input
          type="password"
          required
          minLength={8}
          maxLength={72}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          className="tf-input"
        />
      </div>

      {error && (
        <p role="alert" className="tf-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="tf-primary w-full"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm tf-muted">
        Already registered?{" "}
        <Link href="/login" className="tf-link">
          Sign in
        </Link>
      </p>
    </form>
  );
}
