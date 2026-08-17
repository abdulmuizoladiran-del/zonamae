import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Crown, LogIn, LogOut, Menu, X } from "lucide-react";
import { clearVipSession, getLoggedInMember } from "@/lib/vip-auth";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "VIP Membership", to: "/vip-membership" },
  { label: "Meet & Greet", to: "/meet-greet" },
  { label: "VIP Videos", to: "/vip-videos" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getLoggedInMember()));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLoggedIn(Boolean(getLoggedInMember()));
  }, [location.pathname]);

  const handleLogout = () => {
    clearVipSession();
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border/80 bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gold/60 bg-gradient-to-br from-gold-light/20 to-gold/10 font-display text-lg font-bold text-gold">
            B
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-wide text-white">
              BAILEY
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
              OFFICIAL FAN ACCESS
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-gold",
                  active && "text-gold",
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-gold-light to-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden items-center gap-2 rounded-full border border-gold/60 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:bg-gold/10 sm:flex"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-full border border-gold/60 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:bg-gold/10 sm:flex"
            >
              <LogIn className="h-3.5 w-3.5" />
              Login
            </Link>
          )}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-in-out lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-gold/10 hover:text-gold",
                  active && "bg-gold/10 text-gold",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center justify-center gap-2 rounded-full border border-gold/60 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gold"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mt-2 flex items-center justify-center gap-2 rounded-full border border-gold/60 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gold"
            >
              <LogIn className="h-3.5 w-3.5" />
              Member Login
            </Link>
          )}
          <Link
            to="/vip-membership"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-5 py-3 text-xs font-bold uppercase tracking-wider text-black"
          >
            <Crown className="h-3.5 w-3.5" />
            Join VIP Membership
          </Link>
        </nav>
      </div>
    </header>
  );
}
