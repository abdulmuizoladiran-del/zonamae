import { Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function Placeholder({ title }: { title: string }) {
  return (
    <Layout>
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-gold/10 text-gold">
          <Sparkles className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          This page is coming soon. Keep chatting with Fusion to design and
          build out the {title.toLowerCase()} experience.
        </p>
      </div>
    </Layout>
  );
}
