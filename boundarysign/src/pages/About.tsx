import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/components/Seo";

const DEFAULT_STORY = [
  "Boundary Sign was born out of necessity, not a boardroom.",
  "It started in the foothills of Eagle, Idaho, on the Norwood Aikman Ranch, where trespassing was a constant problem and the signs available on the market simply were not up to the job. They faded in the sun, cracked in the cold, got rubbed off by cattle, were inconsistent from one to the next, and were a headache to install. So we built something better: signs designed to actually stand up to the country they were meant to protect.",
  "This is a brand built by landowners, for landowners. The idea is not to restrict access, but to provide clear communication between landowners and landusers, further developing their relationships.",
  "That moment came in the fall of 2025. Owner Tyler Christner pitched Boundary Sign at a University of Idaho business competition, making the case that the demand had never gone away, and the response proved it. A new partnership with a trusted manufacturer in Spokane, Washington, gave the company exactly what it had been missing.",
  "In December 2025, Boundary Sign officially relaunched: built smarter, stronger, and ready to scale. Today our signs are protecting properties across Idaho and Montana, with new states on the horizon.",
  "Every sign we make carries the same belief that started it all: your boundaries deserve better."
];

export default function About() {
  const [content, setContent] = useState<{ title: string | null; body: string | null; image_url: string | null } | null>(null);

  useEffect(() => {
    supabase.from("site_content").select("title, body, image_url").eq("key", "about_hero").maybeSingle()
      .then(({ data }) => setContent(data));
  }, []);

  const paragraphs = content?.body
    ? content.body.replace(/—/g, ", ").split("\n").filter(Boolean)
    : DEFAULT_STORY;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="My Story | Boundary Sign"
        description="The story behind Boundary Sign: built by a rancher to make durable, state-compliant aluminum no trespassing signs for landowners."
        path="/about"
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-16 md:py-24 max-w-4xl">
          <div className="text-xs font-display tracking-[0.3em] text-accent mb-4">MY STORY</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-8">{content?.title || "MY STORY"}</h1>
          {content?.image_url && (
            <img src={content.image_url} alt="About Boundary Sign" className="w-full h-[400px] object-cover mb-8 rounded-sm" />
          )}
          <div className="prose prose-lg max-w-none space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed text-foreground/85 m-0">{p}</p>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
