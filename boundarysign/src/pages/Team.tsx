import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/components/Seo";

interface Member { id: string; name: string; role: string | null; bio: string | null; photo_url: string | null; }

export default function Team() {
  const [intro, setIntro] = useState<{ title: string | null; body: string | null } | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    supabase.from("site_content").select("title, body").eq("key", "team_intro").maybeSingle().then(({ data }) => setIntro(data));
    supabase.from("team_members").select("*").order("display_order").then(({ data }) => setMembers(data || []));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Meet the Team — Boundary Sign"
        description="The people behind Boundary Sign — designing, manufacturing, and shipping aluminum no trespassing signs built to last."
        path="/team"
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-16 md:py-24">
          <div className="max-w-4xl mb-12">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-4">— THE PEOPLE</div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6">{intro?.title || "MEET THE TEAM"}</h1>
            <p className="text-lg text-muted-foreground">{intro?.body}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map(m => (
              <div key={m.id} className="bg-card border border-border p-6">
                {m.photo_url ? (
                  <img src={m.photo_url} alt={m.name} className="w-full h-64 object-cover mb-4" />
                ) : (
                  <div className="w-full h-64 bg-muted mb-4 flex items-center justify-center text-muted-foreground font-display">PHOTO</div>
                )}
                <h3 className="font-display text-2xl">{m.name}</h3>
                {m.role && <div className="text-xs font-display tracking-widest text-accent mt-1">{m.role}</div>}
                {m.bio && <p className="text-sm text-foreground/80 mt-3">{m.bio}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
