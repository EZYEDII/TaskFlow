
"use client";

interface Props {
  name: string;
  email: string;
  onNameChange: (value: string) => void;
}

export default function ProfileSettings({
  name,
  email,
  onNameChange,
}: Props) {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="font-semibold text-slate-900">
          Profile
        </h3>
        <p className="text-sm text-slate-500">
          Manage your personal information.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Display name
        </label>

        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email address
        </label>

        <input
          type="email"
          value={email}
          disabled
          className="w-full rounded-xl border bg-slate-50 p-3 text-slate-500"
        />

        <p className="mt-1 text-xs text-slate-400">
          Email management will be available after authentication.
        </p>
      </div>
    </section>
  );
}
