import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";
import RegisterForm from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your TaskFlow account.",
};

export default function RegisterPage() {
  return (
    <main className="auth-layout">
      <section className="auth-brand-panel">
        <Link href="/" className="auth-brand-logo">
          <Zap size={22} />
          TaskFlow
        </Link>

        <div className="auth-brand-content">
          <h2 className="auth-brand-title">
            Your work.
            <br />
            Your progress.
          </h2>
          <p className="auth-brand-description">
            Create your account and start organizing your daily
            activities with TaskFlow.
          </p>
          <Link href="/login" className="auth-brand-cta">
            Sign in
          </Link>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-container">
          <h1 className="auth-form-title">Create your account</h1>
          <p className="auth-form-description">
            Start organizing your work with TaskFlow.
          </p>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}