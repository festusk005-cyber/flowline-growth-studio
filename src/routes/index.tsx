import { createFileRoute } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import heroImg from "@/assets/hero-laptop.jpg";
import schoolImg from "@/assets/school.jpg";
import clinicImg from "@/assets/clinic.jpg";
import businessImg from "@/assets/business.jpg";
import { InquiryForm } from "@/components/InquiryForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OrbitEdge Digital — Websites & Workflow Automation" },
      { name: "description", content: "Websites, digital marketing and workflow automations that streamline daily operations for schools, clinics and small businesses." },
      { property: "og:title", content: "OrbitEdge Digital — Websites & Workflow Automation" },
      { property: "og:description", content: "Websites and automations that streamline daily operations for schools, clinics and small businesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function R({ children, d = 0, className = "" }: { children: ReactNode; d?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${d}ms` }}>{children}</div>;
}

const services = [
  { n: "01", t: "Websites that convert", d: "Fast, beautiful, mobile-first sites built to turn visitors into enquiries, admissions and bookings." },
  { n: "02", t: "Workflow automation", d: "Connect forms, spreadsheets, WhatsApp and email so repetitive tasks run themselves." },
  { n: "03", t: "Digital marketing", d: "SEO, social media and targeted campaigns that bring the right people to your door." },
  { n: "04", t: "Business systems", d: "Custom dashboards, portals and records tools that keep your whole team in sync." },
];
const sectors = [
  { img: schoolImg, t: "Schools", d: "Online admissions, fee reminders, parent communication and report automation." },
  { img: clinicImg, t: "Clinics", d: "Appointment booking, patient reminders, intake forms and follow-up workflows." },
  { img: businessImg, t: "Small businesses", d: "Online stores, invoicing, lead capture and customer follow-ups on autopilot." },
];
const steps = ["Discover", "Design", "Build", "Automate"];

function Index() {
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="glass fixed inset-x-0 top-0 z-50 border-b border-border/60">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 text-sm">
          <a href="#top" className="font-display font-semibold tracking-tight">OrbitEdge<span className="text-gradient">.</span></a>
          <div className="hidden gap-8 text-muted-foreground md:flex">
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#sectors" className="hover:text-foreground">Who we help</a>
            <a href="#process" className="hover:text-foreground">Process</a>
          </div>
          <a href="#contact" className="rounded-full bg-primary px-4 py-1.5 text-primary-foreground transition hover:opacity-90">Get started</a>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-screen items-center justify-center px-6 pt-14 text-center">
        <div className="animate-float absolute -left-32 top-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
        <div className="animate-float absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" style={{ animationDelay: "-4s" }} />
        <div className="relative max-w-4xl">
          <R><p className="mb-6 text-sm font-medium tracking-wide text-muted-foreground">Websites · Automation · Marketing</p></R>
          <R d={100}><h1 className="text-5xl font-semibold leading-[1.02] md:text-8xl">Run your business.<br /><span className="text-gradient">Not your paperwork.</span></h1></R>
          <R d={250}><p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">I build websites and workflow automations that help schools, clinics and small businesses streamline their daily operations.</p></R>
          <R d={400} className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#contact" className="rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground shadow-soft transition hover:scale-105">Book a free consultation</a>
            <a href="#services" className="rounded-full border border-border px-7 py-3 font-medium transition hover:bg-secondary">Explore services →</a>
          </R>
          <R d={550} className="mt-16"><img src={heroImg} alt="Laptop showing a website and workflow automation" width={1600} height={912} className="mx-auto w-full max-w-5xl rounded-3xl shadow-soft" /></R>
          <div className="mt-16 flex flex-col items-center" aria-hidden>
            <div className="relative h-40 w-16">
              <div className="animate-dribble absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full bg-accent shadow-soft" style={{ marginLeft: -16 }} />
              <div className="animate-shadowpulse absolute bottom-0 left-0 h-2 w-16 rounded-full bg-primary/30 blur-sm" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-32">
        <R><h2 className="max-w-3xl text-4xl font-semibold md:text-6xl">Everything you need to work <span className="text-gradient">smarter.</span></h2></R>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <R key={s.n} d={i * 120}>
              <div className="group h-full rounded-3xl border border-border bg-card p-10 transition duration-500 hover:-translate-y-2 hover:shadow-soft">
                <span className="text-sm font-medium text-muted-foreground">{s.n}</span>
                <h3 className="mt-6 text-2xl font-semibold">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.d}</p>
                <div className="mt-8 h-1 w-10 rounded-full bg-accent transition-all duration-500 group-hover:w-24" />
              </div>
            </R>
          ))}
        </div>
      </section>

      <section id="sectors" className="bg-primary py-32 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <R><p className="text-sm text-accent">Who we help</p></R>
          <R d={100}><h2 className="mt-4 max-w-3xl text-4xl font-semibold md:text-6xl">Built for the people who keep communities running.</h2></R>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-primary-foreground/10 md:grid-cols-3">
            {sectors.map((s, i) => (
              <R key={s.t} d={i * 150} className="bg-primary p-6">
                <img src={s.img} alt={s.t} loading="lazy" width={1024} height={768} className="mb-8 aspect-[4/3] w-full rounded-2xl object-cover transition duration-700 hover:scale-[1.03]" />
                <h3 className="text-3xl font-semibold text-accent">{s.t}</h3>
                <p className="mt-4 opacity-75">{s.d}</p>
              </R>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-6xl px-6 py-32">
        <R><h2 className="text-4xl font-semibold md:text-6xl">Simple process. <span className="text-gradient">Real results.</span></h2></R>
        <div className="mt-16 grid gap-10 md:grid-cols-4">
          {steps.map((s, i) => (
            <R key={s} d={i * 120}>
              <div className="font-display text-6xl font-semibold text-accent">{i + 1}</div>
              <h3 className="mt-4 text-xl font-semibold">{s}</h3>
              <div className="mt-4 h-px w-full bg-border" />
            </R>
          ))}
        </div>
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {[["70%", "less admin time"], ["24/7", "online bookings"], ["3×", "more enquiries"]].map(([k, v], i) => (
            <R key={v} d={i * 120} className="rounded-3xl bg-secondary p-10 text-center">
              <div className="font-display text-5xl font-semibold">{k}</div>
              <p className="mt-2 text-muted-foreground">{v}</p>
            </R>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 pb-32">
        <R className="mx-auto max-w-4xl rounded-[2.5rem] bg-primary px-6 py-16 text-primary-foreground shadow-soft md:px-14">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-semibold md:text-6xl">Ready to streamline?</h2>
            <p className="mx-auto mt-6 max-w-lg opacity-75">Tell me about your school, clinic or business. I'll show you what can be automated.</p>
            <a href="mailto:festusk005@gmail.com" className="mt-4 inline-block font-medium underline underline-offset-4">festusk005@gmail.com</a>
          </div>
          <InquiryForm />
        </R>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} OrbitEdge Digital. All rights reserved. · <a href="mailto:festusk005@gmail.com" className="text-foreground hover:underline">festusk005@gmail.com</a></footer>
    </div>
  );
}
