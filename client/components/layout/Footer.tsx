import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { openTelegramMessage } from "@/lib/telegram";

function subscribeToTelegram(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const email = String(new FormData(event.currentTarget).get("email") || "").trim();
  if (!email) return;
  openTelegramMessage([
    "━━━━━━━━━━━━━━━━━━━━",
    "📬 NEWSLETTER SUBSCRIPTION",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "📧 Email:",
    email,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "Hello Management Team,",
    "",
    "Please subscribe this email address to receive official news, exclusive VIP updates, Meet & Greet announcements, and future event notifications.",
    "",
    "Thank you.",
    "",
    "━━━━━━━━━━━━━━━━━━━━",
  ].join("\n"));
}

const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Youtube, href: "https://youtube.com" },
  { icon: Facebook, href: "https://facebook.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-14">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-border bg-card/60 p-8 sm:flex-row">
          <div>
            <h3 className="font-display text-xl font-bold text-gold">
              Join the VIP Community
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Subscribe for exclusive updates, offers and event announcements.
            </p>
          </div>
          <form
            onSubmit={subscribeToTelegram}
            className="flex w-full max-w-md gap-2 sm:w-auto"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gradient-to-r from-gold-light to-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/60 font-display text-sm font-bold text-gold">
              ZM
            </span>
            <p className="text-xs text-muted-foreground">
              © 2026 Zona Mae Official Fan Access. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold">
              Terms & Conditions
            </Link>
            <Link to="/contact" className="hover:text-gold">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
