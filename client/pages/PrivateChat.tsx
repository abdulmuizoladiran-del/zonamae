import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  LockKeyhole,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

const BAILEY_IMAGE =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop";

export const PRIVATE_CHAT_OPTIONS = [
  { id: "30-minutes", label: "30 minutes", amount: 150 },
  { id: "1-hour", label: "1 hour", amount: 275 },
  { id: "2-hours", label: "2 hours", amount: 500 },
  { id: "3-hours", label: "3 hours", amount: 700 },
] as const;

const AVAILABLE_WEEKDAYS = [2, 4, 6];
const AVAILABLE_TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "3:30 PM",
  "5:00 PM",
  "7:00 PM",
];
const BOOKED_SLOTS = new Set(["2030-01-01|10:00 AM"]);

type ChatType = "video" | "text";
type Booking = {
  reference: string;
  name: string;
  email: string;
  date: string;
  time: string;
  duration: string;
  amount: number;
  chatType: ChatType;
};

function getAvailableDates() {
  const dates: string[] = [];
  const date = new Date();
  date.setHours(12, 0, 0, 0);

  for (let index = 0; index < 35 && dates.length < 12; index += 1) {
    if (AVAILABLE_WEEKDAYS.includes(date.getDay())) {
      dates.push(date.toISOString().slice(0, 10));
    }
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function createBookingReference() {
  return `BAI-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function slotKey(date: string, time: string) {
  return `${date}|${time}`;
}

export default function PrivateChat() {
  const availableDates = useMemo(getAvailableDates, []);
  const [chatType, setChatType] = useState<ChatType>("video");
  const [durationId, setDurationId] = useState(PRIVATE_CHAT_OPTIONS[0].id);
  const [selectedDate, setSelectedDate] = useState(availableDates[0] ?? "");
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_TIME_SLOTS[0]);
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [booking, setBooking] = useState<Booking | null>(null);

  const selectedDuration = PRIVATE_CHAT_OPTIONS.find(
    (option) => option.id === durationId,
  ) ?? PRIVATE_CHAT_OPTIONS[0];
  const availableTimes = AVAILABLE_TIME_SLOTS.filter(
    (time) =>
      !BOOKED_SLOTS.has(slotKey(selectedDate, time)) &&
      !bookedSlots.has(slotKey(selectedDate, time)),
  );

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const nextTime = AVAILABLE_TIME_SLOTS.find(
      (time) =>
        !BOOKED_SLOTS.has(slotKey(date, time)) &&
        !bookedSlots.has(slotKey(date, time)),
    );
    setSelectedTime(nextTime ?? "");
  };

  const handleBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const key = slotKey(selectedDate, selectedTime);

    if (bookedSlots.has(key) || BOOKED_SLOTS.has(key)) return;

    setBookedSlots((current) => new Set(current).add(key));
    setBooking({
      reference: createBookingReference(),
      name,
      email,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration.label,
      amount: selectedDuration.amount,
      chatType,
    });
  };

  return (
    <Layout>
      <main className="overflow-hidden">
        <section className="relative border-b border-border bg-noise py-14 sm:py-20">
          <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-gold/10 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
          <div className="container relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.24em] text-gold">
                <LockKeyhole className="h-3 w-3" /> Private access · 18+ only
              </span>
              <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-[0.95] text-white sm:text-7xl">
                Private Chat
                <br />
                <span className="text-gradient-gold">With Bailey</span>
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground lg:mx-0">
                A private one-on-one conversation reserved for adults who want an
                unhurried, personal moment with Bailey.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground lg:justify-start">
                <span className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Secure booking
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2">
                  <MessageCircle className="h-3.5 w-3.5 text-gold" /> One-to-one access
                </span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 rounded-[2rem] bg-gold/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 shadow-2xl">
                <img
                  src={BAILEY_IMAGE}
                  alt="Bailey"
                  className="aspect-[1.05/1] w-full object-cover object-top opacity-90 sm:aspect-[1.25/1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                      Bailey Private Room
                    </p>
                    <p className="mt-1 font-display text-2xl text-white sm:text-3xl">
                      Just you and Bailey.
                    </p>
                  </div>
                  <Sparkles className="h-7 w-7 shrink-0 text-gold" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {booking ? (
          <Confirmation booking={booking} />
        ) : (
          <BookingExperience
            chatType={chatType}
            setChatType={setChatType}
            durationId={durationId}
            setDurationId={setDurationId}
            selectedDuration={selectedDuration}
            availableDates={availableDates}
            selectedDate={selectedDate}
            setSelectedDate={handleDateChange}
            availableTimes={availableTimes}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            onSubmit={handleBooking}
          />
        )}
      </main>
    </Layout>
  );
}

function BookingExperience({
  chatType,
  setChatType,
  durationId,
  setDurationId,
  selectedDuration,
  availableDates,
  selectedDate,
  setSelectedDate,
  availableTimes,
  selectedTime,
  setSelectedTime,
  onSubmit,
}: {
  chatType: ChatType;
  setChatType: (value: ChatType) => void;
  durationId: string;
  setDurationId: (value: string) => void;
  selectedDuration: (typeof PRIVATE_CHAT_OPTIONS)[number];
  availableDates: string[];
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  availableTimes: string[];
  selectedTime: string;
  setSelectedTime: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section className="container py-12 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-black">1</span>
            Select your private experience
            <span className="h-px flex-1 bg-border" />
            <span className="text-muted-foreground">2</span>
            Schedule
            <span className="h-px flex-1 bg-border" />
            <span className="text-muted-foreground">3</span>
            Confirm
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Choose your format
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setChatType("video")}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                  chatType === "video"
                    ? "border-gold bg-gold/10 text-white shadow-[0_0_30px_-14px_hsl(var(--gold)/0.7)]"
                    : "border-border text-muted-foreground hover:border-gold/50",
                )}
              >
                <Video className="h-5 w-5 text-gold" />
                <span>
                  <strong className="block text-sm text-white">Private video chat</strong>
                  <small className="mt-1 block text-[10px]">Face-to-face, one-on-one</small>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setChatType("text")}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                  chatType === "text"
                    ? "border-gold bg-gold/10 text-white shadow-[0_0_30px_-14px_hsl(var(--gold)/0.7)]"
                    : "border-border text-muted-foreground hover:border-gold/50",
                )}
              >
                <MessageCircle className="h-5 w-5 text-gold" />
                <span>
                  <strong className="block text-sm text-white">Private text chat</strong>
                  <small className="mt-1 block text-[10px]">A focused private conversation</small>
                </span>
              </button>
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Choose your duration
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PRIVATE_CHAT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDurationId(option.id)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all",
                    durationId === option.id
                      ? "border-gold bg-gold/10 shadow-[0_0_30px_-14px_hsl(var(--gold)/0.7)]"
                      : "border-border hover:border-gold/50",
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{option.label}</span>
                    {durationId === option.id && <Check className="h-4 w-4 text-gold" />}
                  </span>
                  <span className="mt-3 block font-display text-2xl text-gold">${option.amount}</span>
                  <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    One-time payment
                  </span>
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="mt-8 border-t border-border pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Choose your date and time
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-xs text-muted-foreground">
                  Available date
                  <span className="relative mt-2 block">
                    <CalendarDays className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gold" />
                    <select
                      required
                      value={selectedDate}
                      onChange={(event) => setSelectedDate(event.target.value)}
                      className="w-full appearance-none rounded-lg border border-border bg-background px-10 py-3 text-sm text-white outline-none focus:border-gold"
                    >
                      {availableDates.map((date) => (
                        <option key={date} value={date}>{formatDate(date)}</option>
                      ))}
                    </select>
                  </span>
                </label>
                <label className="text-xs text-muted-foreground">
                  Available time
                  <span className="relative mt-2 block">
                    <Clock3 className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gold" />
                    <select
                      required
                      value={selectedTime}
                      onChange={(event) => setSelectedTime(event.target.value)}
                      className="w-full appearance-none rounded-lg border border-border bg-background px-10 py-3 text-sm text-white outline-none focus:border-gold"
                    >
                      {availableTimes.map((time) => <option key={time} value={time}>{time}</option>)}
                    </select>
                  </span>
                </label>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <label className="text-xs text-muted-foreground">
                  Full name
                  <input required name="name" className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-white outline-none focus:border-gold" placeholder="Your full name" />
                </label>
                <label className="text-xs text-muted-foreground">
                  Email address
                  <input required name="email" type="email" className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-white outline-none focus:border-gold" placeholder="you@example.com" />
                </label>
              </div>

              <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-xl border border-gold/30 bg-gold/5 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">Your selection</p>
                  <p className="mt-2 text-sm font-semibold text-white">{selectedDuration.label} · {chatType === "video" ? "Video" : "Text"} chat</p>
                  <p className="mt-1 text-xs text-muted-foreground">{selectedDate ? formatDate(selectedDate) : "Choose a date"} · {selectedTime || "Choose a time"}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">One-time payment</p>
                  <p className="mt-1 font-display text-3xl text-gold">${selectedDuration.amount}</p>
                </div>
              </div>

              <button type="submit" disabled={!selectedDate || !selectedTime || availableTimes.length === 0} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-6 py-4 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50">
                Proceed to One-Time Payment <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/10 via-card/60 to-card/40 p-6 sm:p-8 lg:sticky lg:top-28">
          <div className="flex items-center gap-3 text-gold"><LockKeyhole className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.2em]">Private by design</span></div>
          <h2 className="mt-5 font-display text-3xl text-white">A moment made just for you.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Your selected time is reserved for a single private session. Chat details and joining instructions are sent to your email after payment confirmation.</p>
          <div className="mt-7 space-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
            <p className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-gold" /> Adults 18+ only. Identity and age confirmation may be required.</p>
            <p className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-gold" /> Reschedule requests are accepted up to 24 hours before the session.</p>
            <p className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-gold" /> Cancellations are reviewed according to the private chat policy.</p>
          </div>
          <p className="mt-7 text-[10px] leading-relaxed text-muted-foreground">By continuing, you confirm that you are 18 or older and agree to the cancellation and rescheduling policy.</p>
        </aside>
      </div>
    </section>
  );
}

function Confirmation({ booking }: { booking: Booking }) {
  return (
    <section className="container py-16 sm:py-24">
      <div className="mx-auto max-w-3xl rounded-3xl border border-gold/40 bg-gradient-to-b from-gold/10 via-card/70 to-card/40 p-6 text-center shadow-[0_0_70px_-30px_hsl(var(--gold)/0.8)] sm:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold"><Check className="h-8 w-8" /></span>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.28em] text-gold">Payment confirmed</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Your private chat with Bailey is booked!</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">A confirmation with your private chat instructions will be sent to {booking.email}.</p>
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          {[
            ["Booking reference", booking.reference],
            ["Date", formatDate(booking.date)],
            ["Time", booking.time],
            ["Duration", booking.duration],
            ["Format", booking.chatType === "video" ? "Private video chat" : "Private text chat"],
            ["Amount paid", `$${booking.amount} · ONE-TIME PAYMENT`],
          ].map(([label, value]) => <div key={label} className="rounded-xl border border-border bg-background/40 p-4"><p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 text-sm font-semibold text-white">{value}</p></div>)}
        </div>
        <div className="mt-8 rounded-xl border border-gold/30 bg-gold/5 p-5 text-left"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold"><Mail className="h-4 w-4" /> Joining instructions</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Check your confirmation email for the private room link and access instructions. Please join a few minutes early with a valid photo ID available if requested.</p></div>
      </div>
    </section>
  );
}
