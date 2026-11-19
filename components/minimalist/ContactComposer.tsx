"use client";

import React, { useState } from "react";
import { VscArrowRight, VscCheck, VscError } from "react-icons/vsc";

const inputClass =
  "w-full rounded-xl bg-paper-deep px-4 py-3 text-base text-ink placeholder:text-stone-warm outline-none transition hover:bg-sand focus:bg-sand focus:ring-2 focus:ring-ember/60";

const INTERESTS = ["Full-time role", "Freelance project", "Collaboration", "Other"];

/** Professional contact form with a quick "interested in" selector. */
export default function ContactComposer() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: [`Interested in: ${interest}`, form.subject ? `Subject: ${form.subject}` : null, "", form.message]
            .filter((l) => l !== null)
            .join("\n"),
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset>
        <legend className="text-sm font-semibold text-ink">I&apos;m interested in</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((opt) => {
            const selected = interest === opt;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={selected}
                onClick={() => setInterest(opt)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                  selected ? "bg-ink text-paper" : "bg-paper-deep text-ink hover:bg-sand"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${selected ? "bg-ember" : "bg-ink/25"}`}
                />
                {opt}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-ink">Full name</label>
          <input id="name" required value={form.name} onChange={update("name")} placeholder="Jane Doe" className={inputClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-ink">Email</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-semibold text-ink">
          Subject <span className="font-normal text-stone-warm">(optional)</span>
        </label>
        <input
          id="subject"
          value={form.subject}
          onChange={update("subject")}
          placeholder="e.g. Full-stack developer role"
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-ink">Message</label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell me about the role or project…"
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-6 text-sm font-medium" aria-live="polite">
          {status === "success" && (
            <span className="flex items-center gap-1.5 text-emerald-700">
              <VscCheck /> Thanks! Your message was sent. I&apos;ll reply soon.
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-1.5 text-rose-700">
              <VscError /> Couldn&apos;t send. Please email me directly.
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-ember-deep px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {status === "loading" ? "Sending…" : "Send message"}
          <VscArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
