
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your TaskFlow account.",
};

export default function LoginPage() {
  return (
    <main className="auth-layout">
      <section className="auth-brand-panel">
        <Link href="/" className="auth-brand-logo text-white no-underline">
          TaskFlow.
        </Link>

        <h2 className="auth-brand-title">
          Work smarter.
          <br />
          Achieve more.
        </h2>

        <p className="auth-brand-description">
          Organize your work, manage your priorities and
          keep track of your progress, all in one place.
        </p>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-container">
          <h1 className="auth-form-title">Welcome back</h1>

          <p className="auth-form-description">
            Sign in to manage your tasks and stay productive.
          </p>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}
