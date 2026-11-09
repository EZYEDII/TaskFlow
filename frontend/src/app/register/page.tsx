
import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your TaskFlow account.",
};

export default function RegisterPage() {
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
          Create your account
        </h1>

        <p className="mb-8 mt-2 text-sm text-slate-500">
          Start organizing your work with TaskFlow.
        </p>

        <RegisterForm />
      </div>
    </main>
  );
}
