import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crown,
  Gem,
  Globe,
  Headphones,
  Lock,
  Mail,
  MapPin,
  Package,
  PartyPopper,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  Truck,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { openTelegramMessage } from "@/lib/telegram";

const goldImage = "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop";
const events = [
  { date: "15", month: "JUN", title: "VIP Meet & Greet", location: "Los Angeles, USA", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=700&auto=format&fit=crop" },
  { date: "28", month: "JUN", title: "Private Dinner", location: "Paris, France", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=700&auto=format&fit=crop" },
  { date: "12", month: "JUL", title: "Backstage Access", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=700&auto=format&fit=crop" },
];
const merchandise = [
  { title: "VIP Hoodie", price: "$59.99", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop" },
  { title: "VIP Cap", price: "$29.99", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop" },
  { title: "VIP T-Shirt", price: "$34.99", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop" },
  { title: "VIP Lanyard", price: "$14.99", image: "https://images.unsplash.com/photo-1585855509309-7c5e8b7e4d38?q=80&w=500&auto=format&fit=crop" },
];
const benefits = ["Official VIP Membership Card", "Exclusive News & Updates", "Early Ticket Access", "Priority Support", "Members-Only Events", "Exclusive Merchandise"];
const plans = [
  { name: "Silver VIP", price: "$500", accent: false, items: ["Official VIP Card", "Exclusive News & Updates", "Early Ticket Access", "Priority Support"] },
  { name: "Gold VIP", price: "$1500", accent: true, items: ["All Silver VIP Benefits", "Meet & Greet Access", "Signed Merchandise", "Birthday Message from Zona Mae", "Exclusive Videos & Photos"] },
  { name: "Platinum VIP", price: "$3000", accent: false, items: ["All Gold VIP Benefits", "Backstage Access", "Personalized Video Message", "VIP Concierge Support", "Exclusive Invitations"] },
];
const testimonials = [
  { quote: "Being a VIP member has given me experiences I never thought possible. Thank you Zona Mae and the entire team!", name: "Sarah M.", role: "Gold VIP Member", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
  { quote: "The private dinner was magical. Every detail was thoughtful and the team made us feel truly special.", name: "Jordan K.", role: "Platinum VIP Member", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { quote: "My VIP card arrived quickly and the exclusive content is worth every penny. I love this community.", name: "Amara R.", role: "Silver VIP Member", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop" },
];

export default function VipMembership() {
  return <Layout><VipHero /><WhyVip /><Benefits /><Plans /><Compare /><Process /><CardShowcase /><Events /><Merchandise /><Testimonials /><Faq /><Registration /><Trust /><FinalCta /></Layout>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>{copy && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy}</p>}</div>;
}

const VIP_CARD_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2F04dbbb8300b149b6b41cd6ca09b9bc7a?format=webp&width=800&height=1200";
const VIP_CARD_BACK_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2Fd999f36742844efdb10b949266a536a7?format=webp&width=800&height=1200";

function VipCard({ back = false }: { back?: boolean }) {
  return <div className="relative overflow-hidden rounded-xl border border-gold/40 bg-[#0b0b0b] shadow-2xl">
    <img src={back ? VIP_CARD_BACK_IMAGE : VIP_CARD_IMAGE} alt={back ? "Zona Mae VIP membership card back" : "Zona Mae VIP membership card front"} className="aspect-[1.62/1] w-full object-cover" />
    {back && <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[9px] uppercase tracking-wider text-gold">Card preview</span>}
  </div>;
}

function VipHero() {
  return <section className="relative overflow-hidden border-b border-border bg-noise py-14 sm:py-20"><div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[130px]" /><div className="container relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]"><div className="text-center lg:text-left"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Become an Official</p><h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] text-gradient-gold sm:text-7xl">VIP Member</h1><p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white">Exclusive access. Unforgettable experiences.</p><p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground lg:mx-0">Join thousands of loyal fans and unlock a world of exclusive content, VIP benefits, and unforgettable moments with Zona Mae.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"><a href="#plans" className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105"><Crown className="h-4 w-4" />Join VIP Membership</a><a href="#benefits" className="flex items-center justify-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-gold transition-colors hover:bg-gold/10">Learn More</a></div><div className="mt-7 flex items-center justify-center gap-3 lg:justify-start"><div className="flex -space-x-2">{testimonials.map((t) => <img key={t.name} src={t.avatar} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />)}</div><div><p className="text-sm font-bold text-white">250K+</p><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Happy VIP Members</p></div></div></div><div className="relative mx-auto w-full max-w-xl"><img src={goldImage} alt="Zona Mae" className="mx-auto aspect-[1.4/1] w-full rounded-2xl object-cover object-top opacity-90 sm:aspect-[1.65/1]" /><div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-background via-transparent to-transparent" /><div className="absolute -bottom-10 right-0 w-[80%] animate-float sm:-bottom-12 sm:w-[62%]"><VipCard /></div><div className="pointer-events-none absolute -bottom-16 left-1/2 h-16 w-[95%] -translate-x-1/2 rounded-[50%] border-2 border-gold/70 shadow-[0_0_45px_12px_hsl(var(--gold)/0.28)]" /></div></div></section>;
}

function WhyVip() {
  const items = [{ icon: Crown, title: "Exclusive Content", copy: "Access behind-the-scenes videos, photos, and updates." }, { icon: Users, title: "Meet & Greet Access", copy: "Get priority access to Meet & Greet events." }, { icon: WalletCards, title: "Official VIP Card", copy: "Receive your exclusive VIP membership card." }, { icon: Headphones, title: "Priority Support", copy: "Enjoy dedicated support and faster responses." }];
  return <section className="container py-12 sm:py-16"><div className="rounded-2xl border border-border bg-card/50 p-5 sm:p-7"><SectionHeading eyebrow="Why Join VIP?" title="A closer connection to Zona Mae" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map((item) => <div key={item.title} className="rounded-xl border border-border/80 bg-background/40 p-5 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_30px_-12px_hsl(var(--gold)/0.4)]"><item.icon className="h-7 w-7 text-gold" /><h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.copy}</p></div>)}</div></div></section>;
}

function Benefits() {
  return <section id="benefits" className="container py-10 sm:py-14"><div className="grid items-center gap-10 lg:grid-cols-2"><div className="relative mx-auto w-full max-w-lg"><div className="absolute -inset-4 rounded-3xl bg-gold/10 blur-3xl" /><div className="relative rounded-2xl border border-gold/30 bg-card p-6"><VipCard /><p className="mt-5 text-center font-display text-lg text-gold">Your access to the unforgettable</p></div></div><div><SectionHeading eyebrow="Membership Benefits" title="More than a membership. It's your backstage pass." copy="Every tier is built to make you feel closer to the music, the moments, and the Zona Mae community." /><div className="grid gap-3 sm:grid-cols-2">{benefits.map((item) => <div key={item} className="flex items-center gap-3 rounded-lg border border-border/70 bg-card/40 p-3 text-sm text-white"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><Check className="h-3.5 w-3.5" /></span>{item}</div>)}</div></div></div></section>;
}

function Plans() {
  return <section id="plans" className="container py-12 sm:py-16"><div className="flex flex-wrap items-end justify-between gap-4"><SectionHeading eyebrow="Membership Plans" title="Choose your level of access" /></div><div className="grid gap-5 lg:grid-cols-3">{plans.map((plan) => <div key={plan.name} className={cn("relative rounded-2xl border border-border bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-gold/50", plan.accent && "border-gold shadow-[0_0_45px_-15px_hsl(var(--gold)/0.65)]")}>
    {plan.accent && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-light to-gold px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-black">Most Popular</span>}
    <div className="flex items-center justify-between"><h3 className="font-display text-2xl text-gold">{plan.name}</h3><Gem className="h-6 w-6 text-gold/60" /></div><p className="mt-4 font-display text-3xl text-white">{plan.price}<span className="font-sans text-xs text-muted-foreground"> / month</span></p><ul className="mt-6 space-y-3">{plan.items.map((item) => <li key={item} className="flex gap-2 text-xs text-muted-foreground"><Check className="h-3.5 w-3.5 shrink-0 text-gold" />{item}</li>)}</ul><a href="#registration" className={cn("mt-7 flex items-center justify-center rounded-full border border-gold/60 py-3 text-xs font-bold uppercase tracking-wider text-gold transition-colors hover:bg-gold/10", plan.accent && "border-transparent bg-gradient-to-r from-gold-light to-gold text-black hover:brightness-110")}>Join {plan.name.replace(" VIP", " Gold").replace("Gold Gold", "Gold")}</a></div>)}</div></section>;
}

function Compare() {
  const rows = [["VIP Card", "✓", "✓", "✓"], ["Exclusive Content", "✓", "✓", "✓"], ["Early Ticket Access", "✓", "✓", "✓"], ["Meet & Greet", "—", "✓", "✓"], ["Backstage Access", "—", "—", "✓"], ["Signed Merchandise", "—", "✓", "✓"], ["Personalized Message", "—", "—", "✓"], ["Price / Month", "$500", "$1500", "$3000"]];
  return <section className="container py-10"><div className="rounded-2xl border border-border bg-card/40 p-5 sm:p-7"><div className="flex items-end justify-between"><SectionHeading eyebrow="Compare Plans" title="The right access for every fan" /></div><div className="overflow-x-auto"><table className="w-full min-w-[640px] border-collapse text-left text-xs"><thead><tr className="border-b border-gold/30 text-gold"><th className="p-3 font-semibold uppercase tracking-wider">Features</th><th className="p-3 text-center">Silver</th><th className="p-3 text-center">Gold</th><th className="p-3 text-center">Platinum</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border/70 last:border-0"><td className="p-3 text-muted-foreground">{row[0]}</td>{row.slice(1).map((v, i) => <td key={i} className={cn("p-3 text-center", v === "✓" ? "font-bold text-gold" : "text-muted-foreground")}>{v}</td>)}</tr>)}</tbody></table></div></div></section>;
}

function Process() {
  const steps = [{ icon: UserRound, title: "Apply", copy: "Submit your application" }, { icon: Mail, title: "Review", copy: "We review your details" }, { icon: WalletCards, title: "Payment", copy: "Secure payment" }, { icon: Check, title: "Approval", copy: "You get approved" }, { icon: Package, title: "VIP Card", copy: "We produce your card" }, { icon: Crown, title: "Welcome", copy: "Enjoy VIP benefits!" }];
  return <section className="container py-12 sm:py-16"><SectionHeading eyebrow="How Membership Works" title="Your journey to VIP starts here" /><div className="grid grid-cols-2 gap-7 sm:grid-cols-3 lg:grid-cols-6">{steps.map((step, i) => <div key={step.title} className="relative text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold"><step.icon className="h-5 w-5" /></div><p className="mt-3 text-sm font-semibold text-white">{i + 1}. {step.title}</p><p className="mt-1 text-[10px] text-muted-foreground">{step.copy}</p>{i < steps.length - 1 && <ArrowRight className="absolute -right-5 top-5 hidden h-5 w-5 text-gold/60 lg:block" />}</div>)}</div></section>;
}

function CardShowcase() {
  return <section className="container py-10 sm:py-14"><div className="grid gap-6 rounded-2xl border border-border bg-card/30 p-5 sm:p-8 md:grid-cols-2"><div><div className="flex items-center justify-between"><h2 className="font-display text-xl text-gold">VIP Card Preview</h2><span className="text-[10px] uppercase tracking-wider text-muted-foreground">Front</span></div><div className="mt-5"><VipCard /></div></div><div><div className="flex items-center justify-between"><h2 className="font-display text-xl text-gold">Your exclusive access</h2><span className="text-[10px] uppercase tracking-wider text-muted-foreground">Back</span></div><div className="mt-5"><VipCard back /></div></div></div></section>;
}

function Events() {
  return <section className="container py-12 sm:py-16"><div className="flex items-end justify-between"><SectionHeading eyebrow="Upcoming VIP Events" title="Be in the room" /><Link to="/meet-greet" className="mb-8 hidden items-center gap-1 text-xs uppercase tracking-wider text-gold sm:flex">View All <ArrowRight className="h-3.5 w-3.5" /></Link></div><div className="grid gap-4 md:grid-cols-3">{events.map((event) => <article key={event.title} className="group overflow-hidden rounded-2xl border border-border bg-card/40 transition-all hover:-translate-y-1 hover:border-gold/50"><div className="relative"><img src={event.image} alt={event.title} className="aspect-[1.6/1] w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute left-3 top-3 rounded-lg bg-background/90 px-3 py-2 text-center backdrop-blur"><strong className="block font-display text-xl leading-none text-gold">{event.date}</strong><span className="text-[9px] text-muted-foreground">{event.month}</span></div></div><div className="p-4"><h3 className="font-display text-lg text-white">{event.title}</h3><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-gold" />{event.location}</p><Link to="/meet-greet" className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold">View Details <ArrowRight className="h-3.5 w-3.5" /></Link></div></article>)}</div></section>;
}

function Merchandise() {
  return <section className="container py-10 sm:py-14"><div className="flex items-end justify-between"><SectionHeading eyebrow="VIP Merchandise" title="Wear the experience" /><Link to="/news" className="mb-8 hidden items-center gap-1 text-xs uppercase tracking-wider text-gold sm:flex">View All <ArrowRight className="h-3.5 w-3.5" /></Link></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{merchandise.map((item) => <article key={item.title} className="group rounded-xl border border-border bg-card/40 p-2 transition-all hover:border-gold/50"><img src={item.image} alt={item.title} className="aspect-square w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><div className="p-2"><h3 className="text-xs font-semibold text-white">{item.title}</h3><p className="mt-1 text-xs text-gold">{item.price}</p></div></article>)}</div></section>;
}

function Testimonials() {
  const [index, setIndex] = useState(0); const item = testimonials[index];
  return <section className="container py-12 sm:py-16"><div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]"><SectionHeading eyebrow="What Our VIPs Say" title="Real moments. Real community." copy="The Zona Mae VIP experience is made special by the fans who share it." /><div className="rounded-2xl border border-border bg-card/50 p-6"><div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold" />)}</div><p className="mt-5 text-sm italic leading-relaxed text-muted-foreground">“{item.quote}”</p><div className="mt-7 flex items-center justify-between"><div className="flex items-center gap-3"><img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full object-cover" /><div><p className="text-sm font-semibold text-white">{item.name}</p><p className="text-xs text-gold">{item.role}</p></div></div><div className="flex gap-2"><button aria-label="Previous testimonial" onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)} className="rounded-full border border-border p-2 text-muted-foreground hover:border-gold hover:text-gold"><ChevronLeft className="h-4 w-4" /></button><button aria-label="Next testimonial" onClick={() => setIndex((index + 1) % testimonials.length)} className="rounded-full border border-border p-2 text-muted-foreground hover:border-gold hover:text-gold"><ChevronRight className="h-4 w-4" /></button></div></div></div></div></section>;
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0); const questions = ["How do I become a VIP member?", "When will I receive my VIP card?", "Can I upgrade or downgrade my plan?", "Is VIP membership available worldwide?", "Is my personal information safe?"];
  return <section className="container py-10 sm:py-14"><div className="mx-auto max-w-3xl"><SectionHeading eyebrow="Frequently Asked Questions" title="Everything you need to know" />{questions.map((question, i) => <div key={question} className="border-b border-border"><button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between py-4 text-left text-sm text-white"><span>{question}</span><ChevronDown className={cn("h-4 w-4 text-gold transition-transform", open === i && "rotate-180")} /></button><div className={cn("grid transition-[grid-template-rows] duration-300", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}><p className="overflow-hidden text-xs leading-relaxed text-muted-foreground">{i === 0 ? "Choose your plan, complete the secure application below, and our team will confirm your membership by email." : i === 1 ? "Your official card is produced and shipped after approval. You can track every step from your member dashboard." : "Our support team can help with plan changes at any time."}</p></div></div>)}</div></section>;
}

function handleRegistrationSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const fullName = String(data.get("fullName") || "").trim();
  const email = String(data.get("email") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const country = String(data.get("country") || "").trim();
  const plan = String(data.get("plan") || "").trim();
  const dateOfBirth = String(data.get("dateOfBirth") || "").trim();
  const instagram = String(data.get("instagram") || "").trim();

  if (!fullName || !email || !phone || !country || !plan || !dateOfBirth) {
    window.alert("Please complete all required fields before continuing.");
    return;
  }

  const message = [
    "━━━━━━━━━━━━━━━━━━━━",
    "✨ ZONA MAE VIP MEMBERSHIP",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "👤 Full Name:",
    fullName,
    "",
    "📧 Email:",
    email,
    "",
    "📱 Phone:",
    phone,
    "",
    "🌍 Country:",
    country,
    "",
    "💎 Selected Plan:",
    plan,
    "",
    "🎂 Date of Birth:",
    dateOfBirth,
    "",
    "📷 Instagram:",
    instagram,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "Hello Management Team,",
    "",
    "I have completed my VIP Membership application and would like to proceed with payment.",
    "",
    "Kindly send me the available payment methods and the next steps for my selected VIP Membership plan.",
    "",
    "Thank you.",
    "",
    "━━━━━━━━━━━━━━━━━━━━",
  ].join("\n");

  openTelegramMessage(message);
}

function Registration() {
  return <section id="registration" className="container py-12 sm:py-16"><div className="grid gap-8 lg:grid-cols-[1fr_1.25fr]"><div><SectionHeading eyebrow="Join VIP Membership" title="Your exclusive access starts here" copy="Complete your details and continue to secure payment. A confirmation will be sent to your email." /><div className="rounded-xl border border-gold/30 bg-gold/5 p-5"><p className="flex items-center gap-2 text-sm font-semibold text-gold"><Lock className="h-4 w-4" /> Secure application</p><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Your information is encrypted and protected. You can cancel anytime.</p></div></div><form onSubmit={handleRegistrationSubmit} className="grid gap-4 rounded-2xl border border-border bg-card/50 p-5 sm:grid-cols-2 sm:p-7"><label className="text-xs text-muted-foreground">Full Name<input required name="fullName" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-white outline-none focus:border-gold" placeholder="Your full name" /></label><label className="text-xs text-muted-foreground">Email Address<input required name="email" type="email" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-white outline-none focus:border-gold" placeholder="you@example.com" /></label><label className="text-xs text-muted-foreground">Phone Number<input required name="phone" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-white outline-none focus:border-gold" placeholder="+1 000 000 0000" /></label><label className="text-xs text-muted-foreground">Country<select required name="country" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-white outline-none focus:border-gold"><option>United States</option><option>United Kingdom</option><option>France</option><option>United Arab Emirates</option></select></label><label className="text-xs text-muted-foreground">Preferred Plan<select required name="plan" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-white outline-none focus:border-gold"><option>Gold VIP — $1500 / month</option><option>Silver VIP — $500 / month</option><option>Platinum VIP — $3000 / month</option></select></label><label className="text-xs text-muted-foreground">Date of Birth<input required name="dateOfBirth" type="date" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-white outline-none focus:border-gold" /></label><label className="text-xs text-muted-foreground sm:col-span-2">Instagram / Social Media (Optional)<input name="instagram" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-white outline-none focus:border-gold" placeholder="@yourhandle" /></label><label className="flex items-start gap-2 text-[11px] text-muted-foreground sm:col-span-2"><input required type="checkbox" className="mt-0.5 accent-yellow-500" />I agree to the Terms & Conditions and Privacy Policy.</label><button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] sm:col-span-2">Continue to Payment <ArrowRight className="h-4 w-4" /></button></form></div></section>;
}

function Trust() {
  const items = [{ icon: Lock, title: "Secure & Safe Payments", copy: "Your transactions are encrypted and secure." }, { icon: Globe, title: "Worldwide Membership", copy: "Join fans from over 100+ countries." }, { icon: ShieldCheck, title: "Privacy Protected", copy: "Your data is safe with us." }];
  return <section className="container py-10"><div className="grid gap-3 rounded-2xl border border-border bg-card/40 p-5 sm:grid-cols-3">{items.map((item) => <div key={item.title} className="flex items-center gap-4 border-border/60 p-2 sm:border-r last:border-0"><item.icon className="h-8 w-8 shrink-0 text-gold" /><div><h3 className="text-xs font-semibold uppercase tracking-wider text-white">{item.title}</h3><p className="mt-1 text-[10px] text-muted-foreground">{item.copy}</p></div></div>)}</div><div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1 rounded border border-border px-3 py-2"><WalletCards className="h-4 w-4 text-gold" /> VISA</span><span className="flex items-center gap-1 rounded border border-border px-3 py-2">MASTERCARD</span><span className="flex items-center gap-1 rounded border border-border px-3 py-2">PayPal</span><span className="flex items-center gap-1 rounded border border-border px-3 py-2">Apple Pay</span><span className="flex items-center gap-1 rounded border border-border px-3 py-2">G Pay</span><span className="flex items-center gap-1 rounded border border-border px-3 py-2">₿ Crypto</span></div></section>;
}

function FinalCta() {
  return <section className="container pb-20 pt-10 sm:pb-28"><div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/15 via-card to-gold/10 p-8 text-center sm:p-14"><Sparkles className="absolute left-8 top-8 h-10 w-10 text-gold/20" /><PartyPopper className="absolute bottom-8 right-8 h-10 w-10 text-gold/20" /><h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Your VIP story starts now</h2><p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Join the official Zona Mae community and unlock experiences made exclusively for you.</p><a href="#plans" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-8 py-4 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105"><Crown className="h-4 w-4" />Join the VIP Community</a></div></section>;
}
