
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your TaskFlow account.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600"
        >
          TaskFlow.
        </Link>

        <h1 className="mt-8 text-3xl font-bold text-slate-900">
          Welcome back
        </h1>

        <p className="mb-8 mt-2 text-sm text-slate-500">
          Sign in to manage your tasks and stay productive.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
