import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, ChevronRight, Film, Home, Lock, Play, Search, UserRound, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

export type VipVideo = {
  title: string;
  description: string;
  image: string;
  duration: string;
  category: string;
  date: string;
};

export const FEATURED_VIDEO: VipVideo = {
  title: "The Bailey Experience",
  description: "Available to approved VIP members.",
  image: "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2Fc145982a3ebb4123b13ba1fa4d747756?format=webp&width=800&height=1200",
  duration: "09:24",
  category: "Featured",
  date: "May 25, 2024",
};

export const VIDEO_LIBRARY: VipVideo[] = [
  {
    title: "Feeling a little mischievous 😏",
    description: "Just here to cause harmless trouble.",
    date: "May 20, 2024",
    duration: "06:21",
    category: "Behind the Scenes",
    image: "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2F0caaf413a19f46108acd026e8100ceb1?format=webp&width=800&height=1200",
  },
  {
    title: "Caught being chaotic again 😂",
    description: "Apparently, behaving was never the plan.",
    date: "May 18, 2024",
    duration: "04:32",
    category: "Exclusive",
    image: "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2F2a05b7fd9020442d942080085bed0214?format=webp&width=800&height=1200",
  },
  {
    title: "Too much attitude in one video 😎",
    description: "Proceed with caution.",
    date: "May 15, 2024",
    duration: "08:15",
    category: "Behind the Scenes",
    image: "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2Fb9069db7015d47c89e2ff139f459bf46?format=webp&width=800&height=1200",
  },
  {
    title: "Guess who’s feeling bold today 👀",
    description: "A little confidence goes a long way.",
    date: "May 12, 2024",
    duration: "05:48",
    category: "Community",
    image: "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2F8870417cd1bf47fe9528a1a6e2582e23?format=webp&width=800&height=1200",
  },
  {
    title: "Plot twist: I’m the troublemaker.",
    description: "No further explanation needed.",
    date: "May 05, 2024",
    duration: "07:33",
    category: "Exclusive",
    image: "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2Ffe1db01cd55441aba581a746d10159c1?format=webp&width=800&height=1200",
  },
  {
    title: "Serving maximum mischief ✨",
    description: "Keeping things fun and unpredictable.",
    date: "April 30, 2024",
    duration: "05:02",
    category: "Preview",
    image: "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2F7016b9c0af5b4116bba77836ed190eb0?format=webp&width=800&height=1200",
  },
  {
    title: "Oops… did I steal the spotlight?",
    description: "Looks like it happened again.",
    date: "April 20, 2024",
    duration: "06:18",
    category: "Exclusive",
    image: "https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2Fdd6e0844072e4364ad2206d35b8c0ebc?format=webp&width=800&height=1200",
  },
];

const categories = ["All", ...Array.from(new Set(VIDEO_LIBRARY.map((video) => video.category)))];

type SortOrder = "newest" | "oldest";

export default function VipVideos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [search, setSearch] = useState("");

  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();
    return VIDEO_LIBRARY
      .filter((video) => category === "All" || video.category === category)
      .filter((video) => !query || [video.title, video.description, video.category].some((value) => value.toLowerCase().includes(query)))
      .sort((a, b) => {
        const difference = new Date(a.date).getTime() - new Date(b.date).getTime();
        return sortOrder === "newest" ? -difference : difference;
      });
  }, [category, search, sortOrder]);

  return <Layout><div className="min-h-screen bg-[#050505] pb-24 md:pb-0"><main className="mx-auto max-w-6xl"><Intro /><VideoFilters category={category} setCategory={setCategory} sortOrder={sortOrder} setSortOrder={setSortOrder} search={search} setSearch={setSearch} /><div className="px-4 pb-12 sm:px-6 lg:px-8"><FeaturedVideo video={FEATURED_VIDEO} onOpen={() => setModalOpen(true)} /><div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">{filteredVideos.map((video) => <VideoCard key={video.title} video={video} onOpen={() => setModalOpen(true)} />)}</div>{filteredVideos.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No videos match your search.</p>}<Pagination /></div><JoinBanner /></main><BottomNav /></div>{modalOpen && <VipVideoModal close={() => setModalOpen(false)} />}</Layout>;
}

function Intro() { return <section className="relative overflow-hidden px-4 pb-8 pt-10 text-center sm:px-6 sm:pt-16"><div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-[110px]" /><div className="relative"><span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold"><Lock className="h-3 w-3" /> VIP Members Only</span><h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-6xl">Exclusive <span className="text-gradient-gold">Videos</span></h1><p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">Premium content available exclusively to VIP members.</p></div></section>; }

function VideoFilters({ category, setCategory, sortOrder, setSortOrder, search, setSearch }: { category: string; setCategory: (value: string) => void; sortOrder: SortOrder; setSortOrder: (value: SortOrder) => void; search: string; setSearch: (value: string) => void }) { return <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><div className="flex gap-2"><label className="flex items-center justify-between gap-5 rounded-lg border border-border bg-card/60 px-3 py-2.5 text-[10px] text-muted-foreground focus-within:border-gold"><select value={category} onChange={(event) => setCategory(event.target.value)} className="bg-transparent text-white outline-none"><option value="All">All Categories</option>{categories.filter((item) => item !== "All").map((item) => <option key={item} value={item}>{item}</option>)}</select><ChevronRight className="h-3 w-3 rotate-90 text-gold" /></label><label className="flex items-center justify-between gap-5 rounded-lg border border-border bg-card/60 px-3 py-2.5 text-[10px] text-muted-foreground focus-within:border-gold"><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)} className="bg-transparent text-white outline-none"><option value="newest">Newest First</option><option value="oldest">Oldest First</option></select><ChevronRight className="h-3 w-3 rotate-90 text-gold" /></label></div><div className="flex items-center rounded-lg border border-border bg-card/60 px-3 focus-within:border-gold"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search videos..." className="w-full bg-transparent py-2.5 text-[10px] text-white outline-none placeholder:text-muted-foreground sm:w-48" /><Search className="h-3.5 w-3.5 text-muted-foreground" /></div></div>; }

function FeaturedVideo({ video, onOpen }: { video: VipVideo; onOpen: () => void }) { return <button onClick={onOpen} className="group relative mx-4 mb-5 block w-[calc(100%-2rem)] overflow-hidden rounded-xl border border-gold/40 text-left shadow-[0_0_35px_-15px_hsl(var(--gold)/0.5)] sm:mx-6 sm:w-[calc(100%-3rem)] lg:mx-8 lg:w-[calc(100%-4rem)]"><img src={video.image} alt={video.title} className="aspect-[2/1] w-full bg-black object-contain opacity-60" /><div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/70" /><div className="absolute inset-0 flex flex-col items-center justify-center text-center sm:items-start sm:justify-center sm:px-10 sm:text-left"><span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold"><Lock className="h-4 w-4" /> VIP Content</span><h2 className="mt-2 font-display text-2xl text-white sm:text-4xl">{video.title}</h2><p className="mt-2 text-xs text-muted-foreground">{video.description}</p><span className="mt-4 rounded-full bg-gradient-to-r from-gold-light to-gold px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-black">Join VIP</span></div><span className="absolute right-3 top-3 rounded bg-black/70 px-2 py-1 text-[9px] font-bold text-white">{video.duration}</span></button>; }

function VideoCard({ video, onOpen }: { video: VipVideo; onOpen: () => void }) { return <button onClick={onOpen} className="group block overflow-hidden rounded-xl border border-border bg-card/50 text-left transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_25px_-12px_hsl(var(--gold)/0.7)]"><div className="relative overflow-hidden"><img src={video.image} alt={video.title} className="aspect-[1.18/1] w-full object-cover opacity-45 blur-[1px] transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/20 to-black/10" /><div className="absolute inset-0 flex items-center justify-center"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 bg-black/50 text-gold shadow-[0_0_20px_hsl(var(--gold)/0.25)]"><Lock className="h-4 w-4" /></span></div><span className="absolute left-2 top-2 rounded bg-gold px-1.5 py-1 text-[8px] font-bold text-black">VIP</span><span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-1 text-[8px] font-semibold text-white">{video.duration}</span></div><div className="p-3"><h3 className="truncate text-xs font-semibold text-white sm:text-sm">{video.title}</h3><p className="mt-1 truncate text-[10px] text-muted-foreground">{video.description}</p><p className="mt-2 flex items-center gap-1 text-[9px] text-muted-foreground"><CalendarDays className="h-3 w-3 text-gold" />{video.date}</p></div></button>; }

function Pagination() { return <div className="mt-8 flex items-center justify-center gap-2"><button className="rounded-lg border border-border p-2 text-muted-foreground hover:border-gold hover:text-gold"><ArrowLeft className="h-3.5 w-3.5" /></button>{[1, 2, 3].map((page) => <button key={page} className={cn("h-8 w-8 rounded-lg border text-xs", page === 1 ? "border-gold bg-gold text-black" : "border-border text-muted-foreground hover:border-gold hover:text-gold")}>{page}</button>)}<button className="rounded-lg border border-border p-2 text-muted-foreground hover:border-gold hover:text-gold"><ChevronRight className="h-3.5 w-3.5" /></button></div>; }

function JoinBanner() { return <section className="mx-4 mb-10 overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-r from-gold/15 via-card to-gold/5 p-5 sm:mx-6 sm:p-7 lg:mx-8"><div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left"><img src="https://cdn.builder.io/api/v1/image/assets%2F387c17f062d04bd5837dfeec0d29ae1e%2F04dbbb8300b149b6b41cd6ca09b9bc7a?format=webp&width=400&height=300" alt="VIP membership card" className="h-20 w-32 rounded-lg object-cover shadow-lg" /><div className="flex-1"><h2 className="font-display text-xl text-white">Not a VIP Member Yet?</h2><p className="mt-1 text-xs text-muted-foreground">Join now and get unlimited access to all exclusive videos and premium content.</p></div><Link to="/vip-membership" className="rounded-full bg-gradient-to-r from-gold-light to-gold px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-black">Join VIP Now</Link></div></section>; }

function BottomNav() { return <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/20 bg-[#090909]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden"><div className="mx-auto flex max-w-lg items-center justify-around"><BottomNavItem icon={Home} label="Home" to="/" /><BottomNavItem icon={CrownIcon} label="VIP" to="/vip-membership" /><BottomNavItem icon={Film} label="Videos" to="/vip-videos" active /><BottomNavItem icon={UserRound} label="Profile" to="/login" /></div></nav>; }
function CrownIcon() { return <span className="font-display text-lg leading-none">♛</span>; }
function BottomNavItem({ icon: Icon, label, to, active = false }: { icon: typeof Home | (() => JSX.Element); label: string; to: string; active?: boolean }) { return <Link to={to} className={cn("flex min-w-14 flex-col items-center gap-1 py-1 text-[9px] transition-colors", active ? "text-gold" : "text-muted-foreground hover:text-gold")}><Icon className={cn("h-4 w-4", active && "drop-shadow-[0_0_8px_hsl(var(--gold))]")} /><span>{label}</span></Link>; }

function VipVideoModal({ close }: { close: () => void }) { return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="relative w-full max-w-md rounded-2xl border border-gold/50 bg-[#0b0b0b] p-7 text-center shadow-[0_0_70px_-15px_hsl(var(--gold)/0.6)]"><button onClick={close} aria-label="Close video access modal" className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-white"><X className="h-5 w-5" /></button><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold shadow-[0_0_25px_hsl(var(--gold)/0.3)]"><Lock className="h-7 w-7" /></span><h2 className="mt-6 font-display text-2xl font-bold text-white">VIP Members Only</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">This exclusive video is available to VIP members.</p><p className="mt-3 text-xs leading-relaxed text-gold-light">Become a VIP member to unlock access to exclusive videos, events and premium fan experiences.</p><div className="mt-7 flex flex-col gap-3"><Link to="/vip-membership" className="rounded-full bg-gradient-to-r from-gold-light to-gold px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black">Join VIP Membership</Link><button onClick={close} className="rounded-full border border-gold/60 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold/10">Back to Videos</button></div></div></div>; }
