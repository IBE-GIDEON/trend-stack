"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to admin workspace page
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed. Try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink text-soft px-4 select-none">
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,rgba(92,60,230,0.08),transparent_50%)] pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-sm rounded-xl border border-fog bg-charcoal p-8 shadow-xl backdrop-blur-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 border border-fog/40 p-2.5 mb-3 shadow-md">
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="Trend Stack Logo"
              className="object-contain"
            />
          </div>
          <h1 className="text-xl font-sans font-bold text-soft leading-none">
            Trend Stack Newsroom
          </h1>
          <p className="text-[12px] text-muted mt-2">
            Company Administrator Workspace Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-ash/80 block">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure passcode…"
              required
              className="w-full h-10 px-3 bg-graphite/40 border border-fog rounded text-[13px] text-soft placeholder:text-ash focus:outline-none focus:border-accent/50 focus:bg-graphite/80 transition-colors"
            />
          </div>

          {error && (
            <div className="rounded bg-breaking/10 border border-breaking/20 px-3 py-2 text-xs text-breaking font-sans">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-accent hover:bg-accent/80 text-accent-ink font-sans font-bold text-[13px] rounded transition-all active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Authenticating…" : "LOG IN TO WORKSPACE"}
          </button>
        </form>
      </div>

      {/* Back button to landing */}
      <a
        href="/"
        className="mt-6 text-xs text-muted hover:text-soft hover:underline font-sans transition-colors"
      >
        ← Back to landing page
      </a>
    </div>
  );
}
