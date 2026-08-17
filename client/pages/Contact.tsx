import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, ChevronDown, Clock3, Facebook, Headphones, Instagram, Mail, MapPin, MessageCircle, Send, ShieldCheck, Sparkles, Ticket, Twitter, Users, WalletCards, Youtube } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { openTelegramMessage } from "@/lib/telegram";

const heroImage = "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop";
const supportCards = [[Users, "VIP Membership", "Membership plans and exclusive benefits", "/vip-membership"], [Ticket, "Meet & Greet", "Event access and experience support", "/meet-greet"], [ShieldCheck, "Payments", "Secure payment assistance", "/vip-membership"], [Headphones, "General Support", "Anything else we can help with", "#contact-form"]] as const;
const faqs = ["How do I become a VIP Member?", "How do I book a Meet & Greet?", "How long does support take to respond?"];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "━━━━━━━━━━━━━━━━━━━━",
      "BAILEY CONTACT REQUEST",
      "━━━━━━━━━━━━━━━━━━━━",
      "",
      "Full Name: " + String(data.get("fullName") || "").trim(),
      "Email: " + String(data.get("email") || "").trim(),
      "Subject: " + String(data.get("subject") || "").trim(),
      "",
      "Message:",
      String(data.get("message") || "").trim(),
    ].join("\n");
    openTelegramMessage(message);
  };
  return <Layout><Hero /><div id="contact-form" className="container grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.25fr_0.75fr]"><ContactForm onSubmit={submit} /><ContactInfo /></div><FaqPreview openFaq={openFaq} setOpenFaq={setOpenFaq} /><SupportCategories /><Newsletter /><ContactFooterNote /></Layout>;
}

function Hero() { return <section className="relative overflow-hidden border-b border-border bg-noise py-14 sm:py-20"><div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-gold/10 blur-[130px]" /><div className="container relative grid items-center gap-10 lg:grid-cols-2"><div className="text-center lg:text-left"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Contact Us</p><h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] text-white sm:text-7xl">We're Here<br /><span className="text-gradient-gold">For You</span></h1><p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground lg:mx-0">We’re here to assist with VIP Membership, Meet &amp; Greet reservations, partnerships, and general enquiries.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"><a href="#contact-form" className="rounded-full bg-gradient-to-r from-gold-light to-gold px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105">Send a Message <ArrowRight className="inline h-4 w-4" /></a><Link to="/login" className="rounded-full border border-gold/60 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold/10">Member Login</Link></div></div><div className="relative mx-auto w-full max-w-md"><div className="overflow-hidden rounded-2xl border border-gold/30 shadow-2xl"><img src={heroImage} alt="Bailey" className="aspect-[1.15/1] w-full object-cover object-top" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" /></div><div className="absolute -bottom-8 right-0 w-52 rotate-[-5deg] rounded-xl border border-gold/60 bg-gradient-to-br from-[#242016] to-[#0b0b0b] p-4 shadow-[0_0_45px_-8px_hsl(var(--gold)/0.65)] sm:-right-8"><div className="flex items-center justify-between"><span className="font-display text-xl text-gold">ZM</span><MessageCircle className="h-5 w-5 text-gold" /></div><p className="mt-4 text-[10px] uppercase tracking-widest text-gold">Official support</p><p className="mt-1 font-display text-lg text-white">We’re here for you</p></div></div></div></section>; }

function ContactForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) { return <section className="rounded-2xl border border-border bg-card/50 p-5 sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Send Us a Message</p><h2 className="mt-2 font-display text-2xl text-white sm:text-3xl">Let’s start a conversation</h2><p className="mt-2 text-xs text-muted-foreground">Fill out the form below and our team will get back to you as soon as possible.</p><form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-xs text-muted-foreground">Full Name<input required name="fullName" className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold" placeholder="Your full name" /></label><label className="text-xs text-muted-foreground">Email Address<input required name="email" type="email" className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold" placeholder="you@example.com" /></label><label className="text-xs text-muted-foreground sm:col-span-2">Subject<select required name="subject" className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"><option value="">Select a subject</option><option>VIP Membership</option><option>Meet & Greet</option><option>Track VIP Card</option><option>General Enquiry</option><option>Partnership</option><option>Technical Support</option></select></label><label className="text-xs text-muted-foreground sm:col-span-2">Your Message<textarea required name="message" rows={6} className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold" placeholder="How can we help?" /></label><button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] sm:col-span-2">Send Message <Send className="h-4 w-4" /></button><p className="flex items-center justify-center gap-1 text-center text-[10px] text-muted-foreground sm:col-span-2"><ShieldCheck className="h-3 w-3 text-gold" /> Your information is 100% secure and will never be shared.</p></form></section>; }

function ContactInfo() { const info = [[Mail, "Email Us", "support@Baileyofficial.com", "We typically reply within 24 hours."], [Headphones, "VIP Support", "support@Baileyofficial.com", "For VIP members only."], [Clock3, "Business Hours", "Monday – Friday", "9:00 AM – 6:00 PM (GMT)"], [MapPin, "Management Office", "Bailey Official", "Los Angeles, CA 90028, USA"]] as const; return <section><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Get In Touch</p><h2 className="mt-2 font-display text-2xl text-white sm:text-3xl">Official support channels</h2><p className="mt-2 text-xs text-muted-foreground">Here are other ways to reach us.</p><div className="mt-6 space-y-3">{info.map(([Icon, title, value, copy]) => <div key={title} className="flex items-center gap-4 rounded-xl border border-border bg-card/40 p-4 transition-all hover:border-gold/50 hover:bg-gold/5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold"><Icon className="h-5 w-5" /></span><div><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-1 text-xs text-gold">{value}</p><p className="mt-1 text-[10px] text-muted-foreground">{copy}</p></div></div>)}</div><a href="https://t.me/ZonaOfficialMgmt" target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-full border border-gold/60 py-3 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold/10"><Send className="h-3.5 w-3.5" /> Chat on Telegram</a><div className="mt-5 flex gap-2">{[[Instagram, "Instagram"], [MessageCircle, "TikTok"], [Youtube, "YouTube"], [Facebook, "Facebook"], [Twitter, "X"]].map(([Icon, label]) => <a key={String(label)} href="https://instagram.com" target="_blank" rel="noreferrer" aria-label={label as string} className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"><Icon className="h-4 w-4" /></a>)}</div></section>; }

function FaqPreview({ openFaq, setOpenFaq }: { openFaq: number | null; setOpenFaq: (index: number | null) => void }) { return <section className="container py-12 sm:py-16"><div className="rounded-2xl border border-border bg-card/40 p-5 sm:p-8"><div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Need To Know</p><h2 className="mt-2 font-display text-3xl text-white">Frequently Asked Questions</h2></div><Sparkles className="mb-2 h-6 w-6 text-gold" /></div><div className="mt-6 grid gap-x-8 sm:grid-cols-2">{faqs.map((question, i) => <div key={question} className="border-b border-border"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between py-4 text-left text-xs text-white"><span>{question}</span><ChevronDown className={cn("h-4 w-4 text-gold transition-transform", openFaq === i && "rotate-180")} /></button><div className={cn("grid transition-[grid-template-rows] duration-300", openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}><p className="overflow-hidden pb-3 text-[10px] leading-relaxed text-muted-foreground">Our official team can guide you through this. Send us a message and we’ll share the latest details for your account.</p></div></div>)}</div></div></section>; }

function SupportCategories() { return <section className="container py-10 sm:py-14"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">How Can We Help?</p><h2 className="mt-2 font-display text-3xl text-white">Choose a support category</h2><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{supportCards.map(([Icon, title, copy, to]) => <Link key={title} to={to} className="group rounded-xl border border-border bg-card/40 p-4 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_30px_-12px_hsl(var(--gold)/0.55)]"><Icon className="h-6 w-6 text-gold" /><h3 className="mt-4 text-xs font-semibold text-white">{title}</h3><p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{copy}</p></Link>)}</div></section>; }

function subscribeToTelegram(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const email = String(new FormData(event.currentTarget).get("email") || "").trim();
  if (!email) return;
  openTelegramMessage([
    "━━━━━━━━━━━━━━━━━━━━",
    "📬 MEMBER UPDATES SUBSCRIPTION",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "📧 Email:",
    email,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "Hello Management Team,",
    "",
    "Please subscribe this email address to receive exclusive VIP updates, Meet & Greet announcements, and future event notifications.",
    "",
    "Thank you.",
    "",
    "━━━━━━━━━━━━━━━━━━━━",
  ].join("\n"));
}

function Newsletter() { return <section className="container py-10"><div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card/50 p-7 sm:flex-row"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Stay Connected</p><p className="mt-2 text-sm text-muted-foreground">Subscribe for upcoming events and exclusive offers.</p></div><form onSubmit={subscribeToTelegram} className="flex w-full max-w-md gap-2 sm:w-auto"><input name="email" required type="email" placeholder="Enter your email address" className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-3 text-xs text-white outline-none focus:border-gold" /><button className="rounded-full bg-gradient-to-r from-gold-light to-gold px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-black">Subscribe</button></form></div></section>; }
function ContactFooterNote() { return <div className="container pb-12 text-center text-xs text-muted-foreground"><p>© 2026 Bailey Official Fan Access. All Rights Reserved.</p></div>; }
