import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/components/Seo";

export default function About() {
  const [content, setContent] = useState<{ title: string | null; body: string | null; image_url: string | null } | null>(null);

  useEffect(() => {
    supabase.from("site_content").select("title, body, image_url").eq("key", "about_hero").maybeSingle()
      .then(({ data }) => setContent(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="My Story — Boundary Sign"
        description="The story behind Boundary Sign — built by a rancher to make durable, state-compliant aluminum no trespassing signs for landowners."
        path="/about"
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-16 md:py-24 max-w-4xl">
          <div className="text-xs font-display tracking-[0.3em] text-accent mb-4">— MY STORY</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-8">{content?.title || "MY STORY"}</h1>
          {content?.image_url && (
            <img src={content.image_url} alt="About Boundary Sign" className="w-full h-[400px] object-cover mb-8 rounded-sm" />
          )}
          <div className="prose prose-lg max-w-none space-y-6">
            {(content?.body || "").split("\n").filter(Boolean).map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed text-foreground/85 m-0">{p}</p>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
