import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Crown,
  Ticket,
  Users,
  Star,
  Globe,
  Gem,
  ArrowRight,
  QrCode,
  ChevronLeft,
  ChevronRight,
  Check,
  Mail,
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const STATS = [
  { icon: Users, value: "250K+", label: "Official Members" },
  { icon: Star, value: "35+", label: "Official Events" },
  { icon: Globe, value: "18", label: "Countries Reached" },
  { icon: Gem, value: "99%", label: "Fan Satisfaction" },
];

const FEATURES = [
  {
    icon: Crown,
    title: "VIP Membership",
    description: "Unlock exclusive benefits and experiences.",
    to: "/vip-membership",
  },
  {
    icon: Ticket,
    title: "Meet & Greet",
    description: "Exclusive access to Meet & Greet events.",
    to: "/meet-greet",
  },
];

const EVENTS = [
  {
    day: "15",
    month: "FEB",
    title: "Live Concert",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop",
  },
  {
    day: "05",
    month: "MAR",
    title: "VIP Lounge",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop",
  },
  {
    day: "22",
    month: "APR",
    title: "Fan Experience",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Being a VIP member has given me experiences I never thought possible. Thank you Bailey and the entire team!",
    name: "Sarah M.",
    role: "VIP Member",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "The Meet & Greet experience was beyond anything I imagined. Worth every second of waiting.",
    name: "Daniel R.",
    role: "VIP Member",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Fast access approval and the app made tracking everything so easy. Highly recommend the membership.",
    name: "Amara K.",
    role: "VIP Member",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
  },
];

export default function Index() {
  return (
    <Layout>
      <Hero />
      <QuickLinks />
      <Stats />
      <FeatureShowcase />
      <ContactCta />
      <EventsAndTestimonials />
    </Layout>
  );
}

const VIP_ACCESS_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2F3cf1ee6a5c104470871b22f882725a5a?format=webp&width=800&height=1200";

function VipAccessDesign() {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gold/30 shadow-2xl">
      <img src={VIP_ACCESS_IMAGE} alt="Bailey VIP access design" className="aspect-[1.5/1] w-full object-cover" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-noise pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />

      <div className="container relative grid items-center gap-12 lg:grid-cols-2">
        <div className="animate-fade-in-up text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Welcome to the Official Portal
          </p>
          <h1 className="mt-4 font-display text-6xl font-black leading-none text-gradient-gold sm:text-7xl lg:text-8xl">
            BAILEY
          </h1>
          <p className="mt-2 text-lg font-semibold tracking-[0.25em] text-white sm:text-xl">
            OFFICIAL FAN ACCESS
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground lg:mx-0">
            The official management platform for loyal fans. Exclusive
            experiences. VIP benefits. Unforgettable memories.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/vip-membership"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-8 py-4 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 sm:w-auto"
            >
              <Crown className="h-4 w-4" />
              Explore VIP Access
            </Link>
            <Link
              to="/login"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 px-8 py-4 text-xs font-bold uppercase tracking-wider text-gold transition-colors hover:bg-gold/10 sm:w-auto"
            >
              Member Login
            </Link>
          </div>

          <div className="mt-8 hidden items-center justify-center gap-3 lg:flex lg:justify-start">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=100&auto=format&fit=crop",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white">250K+</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Official Members
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-gold/20 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
              alt="Bailey"
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
          </div>
          <div className="absolute -bottom-10 left-1/2 w-[85%] -translate-x-1/2 animate-float lg:-bottom-12 lg:left-auto lg:right-[-2rem] lg:w-80 lg:translate-x-0">
            <VipAccessDesign />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="container grid max-w-3xl grid-cols-1 gap-3 py-8 sm:grid-cols-2 sm:gap-4">
        {FEATURES.map((f) => (
          <Link
            key={f.title}
            to={f.to}
            className="flex flex-col items-center gap-2 rounded-xl border border-transparent px-3 py-4 text-center transition-colors hover:border-gold/30 hover:bg-gold/5"
          >
            <span className="text-xs font-semibold text-white">
              {f.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="container py-12 sm:py-16">
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card/50 p-6 sm:grid-cols-4 sm:p-8">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <s.icon className="mb-3 h-6 w-6 text-gold" />
            <p className="font-display text-2xl font-bold text-white sm:text-3xl">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureShowcase() {
  return (
    <section className="container pb-16 sm:pb-24">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="group rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_0_40px_-10px_hsl(var(--gold)/0.35)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <Crown className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-white">
            VIP Membership
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Unlock exclusive benefits and experiences.
          </p>
          <ul className="mt-5 space-y-2">
            {[
              "Official Bailey VIP Access",
              "Priority Event Access",
              "Exclusive Merchandise",
              "Members Only Events",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <Check className="h-3.5 w-3.5 text-gold" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/vip-membership"
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold py-3 text-xs font-bold uppercase tracking-wider text-black transition-transform group-hover:scale-105"
          >
            Apply Now
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="group rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_0_40px_-10px_hsl(var(--gold)/0.35)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <Ticket className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-white">
            Meet & Greet
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Upcoming exclusive Meet & Greet events.
          </p>
          <div className="mt-5 space-y-3">
            {[
              { day: "20", month: "DEC", title: "Los Angeles, USA", sub: "VIP Meet & Greet" },
              { day: "10", month: "JAN", title: "New York, USA", sub: "Private Fan Dinner" },
            ].map((ev) => (
              <div
                key={ev.title}
                className="flex items-center gap-3 rounded-xl border border-border/70 p-3"
              >
                <div className="flex h-11 w-11 flex-col items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <span className="text-sm font-bold leading-none">
                    {ev.day}
                  </span>
                  <span className="text-[9px] leading-none">{ev.month}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {ev.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{ev.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/meet-greet"
            className="mt-6 flex items-center justify-center gap-2 rounded-full border border-gold/60 py-3 text-xs font-bold uppercase tracking-wider text-gold transition-colors group-hover:bg-gold/10"
          >
            View All Events
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section id="contact" className="container pb-16 sm:pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-card/70 to-gold/5 p-7 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/50 bg-gold/10 text-gold">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Connect With Us
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Have a question for the Bailey team?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Reach out to official management for support, partnerships, and VIP community questions.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105"
          >
            Contact Management
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function EventsAndTestimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const t = TESTIMONIALS[index];

  return (
    <section className="container pb-20 sm:pb-28">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
              Upcoming Events
            </h2>
            <Link
              to="/meet-greet"
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light"
            >
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Don't miss out on these amazing experiences.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {EVENTS.map((ev) => (
              <div
                key={ev.title}
                className="group relative overflow-hidden rounded-2xl border border-border"
              >
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute left-3 top-3 flex flex-col items-center rounded-lg bg-background/90 px-2.5 py-1.5 backdrop-blur">
                  <span className="text-sm font-bold leading-none text-gold">
                    {ev.day}
                  </span>
                  <span className="text-[9px] leading-none text-muted-foreground">
                    {ev.month}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-bold text-white">{ev.title}</p>
                  <p className="text-xs text-gold-light">{ev.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
              What Fans Say
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Real experiences from our VIP members.
          </p>

          <div className="mt-6 rounded-2xl border border-border bg-card/50 p-6">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold" />
              ))}
            </div>
            <p className="mt-4 text-sm italic leading-relaxed text-muted-foreground">
              "{t.quote}"
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
