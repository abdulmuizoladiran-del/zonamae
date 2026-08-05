import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { findMember, getLoggedInMember, saveVipSession } from "@/lib/vip-auth";

export default function Login() {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getLoggedInMember()) navigate("/member/dashboard", { replace: true });
  }, [navigate]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const member = findMember(memberId.trim());
    if (!member) {
      setError("Invalid Member ID.");
      return;
    }
    if (member.status !== "Active") {
      setError("Your membership is not active.");
      return;
    }
    saveVipSession(member.memberId, rememberMe);
    navigate("/member/dashboard", { replace: true });
  };

  return (
    <Layout>
      <main className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-noise py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div className="hidden text-center lg:block lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Official Fan Access</p>
            <h1 className="mt-4 font-display text-6xl font-bold leading-none text-white">Welcome to<br /><span className="text-gradient-gold">Your VIP World</span></h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">Access your exclusive Zona Mae membership dashboard, digital card, event privileges, and personalized updates.</p>
            <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground"><ShieldCheck className="h-5 w-5 text-gold" /> Secure member-only access</div>
          </div>

          <div className="mx-auto w-full max-w-md rounded-2xl border border-gold/40 bg-card/70 p-6 shadow-[0_0_60px_-18px_hsl(var(--gold)/0.5)] backdrop-blur-sm sm:p-8">
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-gold/10 text-gold"><KeyRound className="h-6 w-6" /></span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-gold">Member Login</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white">Access VIP Dashboard</h2>
              <p className="mt-2 text-xs text-muted-foreground">Enter your official membership ID to continue.</p>
            </div>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <label className="block text-xs text-muted-foreground">Member ID
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:border-gold">
                  <UserRound className="h-4 w-4 text-gold" />
                  <input required value={memberId} onChange={(event) => setMemberId(event.target.value)} className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-muted-foreground" placeholder="ZM-2026-000001" />
                </div>
              </label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="accent-yellow-500" />Remember Me</label>
              {error && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200">{error}</p>}
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02]">Access VIP Dashboard <ArrowRight className="h-4 w-4" /></button>
            </form>

            <div className="mt-6 border-t border-border pt-5 text-center">
              <Link to="/contact" className="text-xs text-gold transition-colors hover:text-gold-light">Need help? Contact Management</Link>
              <p className="mt-4 flex items-center justify-center gap-1 text-[10px] text-muted-foreground"><ShieldCheck className="h-3 w-3 text-gold" /> Your session is securely stored on this device.</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
