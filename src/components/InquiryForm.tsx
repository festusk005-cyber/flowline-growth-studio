import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const TYPES = ["School", "Clinic", "Small business", "Other"];
const NEEDS = ["New website", "Website redesign", "Workflow automation", "Booking / admissions system", "Digital marketing", "Custom dashboard"];

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  organization: z.string().trim().max(150).optional(),
  business_type: z.string().min(1, "Choose your business type"),
  needs: z.array(z.string()).min(1, "Pick at least one need"),
  message: z.string().trim().max(2000).optional(),
});

const field = "w-full rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 outline-none transition focus:border-accent";

export function InquiryForm() {
  const [type, setType] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: f.get("name"), email: f.get("email"),
      phone: f.get("phone") || undefined, organization: f.get("organization") || undefined,
      business_type: type, needs, message: f.get("message") || undefined,
    });
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    setStatus("sending");
    const { error } = await supabase.from("project_inquiries").insert(parsed.data);
    if (error) { setStatus("idle"); return setError("Something went wrong. Please try again."); }
    setStatus("done");
  }

  if (status === "done")
    return <div className="py-16 text-center"><h3 className="text-3xl font-semibold text-accent">Thank you!</h3><p className="mt-4 opacity-75">Your inquiry was received. I'll get back to you soon.</p></div>;

  const chip = (on: boolean) => `rounded-full border px-4 py-2 text-sm transition ${on ? "border-accent bg-accent text-accent-foreground" : "border-primary-foreground/20 hover:border-accent"}`;

  return (
    <form onSubmit={onSubmit} className="space-y-8 text-left">
      <div>
        <p className="mb-3 text-sm opacity-75">Business type</p>
        <div className="flex flex-wrap gap-2">{TYPES.map((t) => <button type="button" key={t} onClick={() => setType(t)} className={chip(type === t)}>{t}</button>)}</div>
      </div>
      <div>
        <p className="mb-3 text-sm opacity-75">What do you need?</p>
        <div className="flex flex-wrap gap-2">{NEEDS.map((n) => <button type="button" key={n} onClick={() => setNeeds((p) => p.includes(n) ? p.filter((x) => x !== n) : [...p, n])} className={chip(needs.includes(n))}>{n}</button>)}</div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" placeholder="Your name *" maxLength={100} className={field} />
        <input name="email" type="email" placeholder="Email *" maxLength={255} className={field} />
        <input name="phone" placeholder="Phone / WhatsApp" maxLength={40} className={field} />
        <input name="organization" placeholder="School / clinic / business name" maxLength={150} className={field} />
      </div>
      <textarea name="message" rows={4} maxLength={2000} placeholder="Tell me about your daily operations and challenges" className={field} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button disabled={status === "sending"} className="w-full rounded-full bg-accent px-8 py-4 font-medium text-accent-foreground transition hover:scale-[1.02] disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
