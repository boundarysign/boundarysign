import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Check, Ruler, Hammer, MapPin, Shield, Sun, Eye, Zap, CheckCircle2 } from "lucide-react";
import tpostImg from "@/assets/tpost-sign-real.jpg";
import installVideo from "@/assets/tpost-install.mp4.asset.json";
import installPoster from "@/assets/tpost-install-poster.jpg.asset.json";
import { tPostCompliantStates } from "@/data/tPostCompliantStates";

const whyDifferent = [
  { icon: Eye, title: "Cut-Out Letters", body: "Letters are punched straight through the aluminum. No paint, no stickers, no inks — nothing that can fade, peel, or wash off." },
  { icon: Shield, title: "Heavy-Gauge Aluminum", body: "Heavy-gauge aluminum body that effectively resists bending, warping, or crumpling like normal hardware store signs. " },
  { icon: Hammer, title: "Universal Mount", body: "A single display tab slides over T-posts, C-posts, U-posts, and locks on with zipties. " },
  { icon: Sun, title: "Blaze-Orange Powdercoat", body: "UV-rated powdercoat finish that holds its color through years of sun, rain, snow, and wind." },
];

const steps = [
  { n: "01", title: "Slide it on", body: "Drop the display tab over any standard fence post. No drilling, no brackets." },
  { n: "02", title: "Zip-tie it down", body: "Two-three zip ties through the pre-punched holes lock the sign in place and keep it secured down." },
  { n: "03", title: "Forget about it", body: "Walk away. The sign will still be there — readable, intact, compliant — years from now." },
];

const builtToLast = [
  { icon: Zap, title: "Weather", body: "Powder-coat finish over aluminum shrugs off rain, snow, UV, and freeze-thaw cycles." },
  { icon: Shield, title: "Livestock & Wildlife", body: "Heavy gauge stands up to cattle bumps and curious wildlife without bending or denting." },
  { icon: CheckCircle2, title: "Vandalism", body: "Cut-out letters can't be scratched off or covered up. And a sign full of holes is a poor target." },
];

const TPostSign = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="The T-Post Sign — Boundary Sign"
        description={'A vertical aluminum no-trespassing sign engineered for T-posts, C-posts, U-posts, round posts, and wood. Cut-out letters, .040" aluminum, compliant in 36 states.'}
        path="/t-post-sign"
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="container py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-display tracking-[0.3em] text-accent mb-3">THE FLAGSHIP</div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.05] mb-5">The T-Post Sign</h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A vertical, heavy-gauge aluminum marker with cut-out letters that physically cannot fade, peel, or wear off. Built to slide onto any standard fence post and stay there for years.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-md">
                <div className="border border-border rounded-sm p-3">
                  <Ruler className="h-4 w-4 text-accent mb-2" />
                  <div className="text-[10px] font-display tracking-widest text-muted-foreground">Format</div>
                  <div className="text-xs font-medium mt-1">Vertical</div>
                </div>
                <div className="border border-border rounded-sm p-3">
                  <Hammer className="h-4 w-4 text-accent mb-2" />
                  <div className="text-[10px] font-display tracking-widest text-muted-foreground">Install</div>
                  <div className="text-xs font-medium mt-1">Slides on</div>
                </div>
                <div className="border border-border rounded-sm p-3">
                  <MapPin className="h-4 w-4 text-accent mb-2" />
                  <div className="text-[10px] font-display tracking-widest text-muted-foreground">Compliance</div>
                  <div className="text-xs font-medium mt-1">36 states</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground font-display tracking-widest">
                  <Link to="/#products">Shop the T-Post Sign</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-display tracking-widest">
                  <a href="#compliance">See State Compliance</a>
                </Button>
              </div>
            </div>
            <div className="aspect-square bg-secondary/50 border border-border rounded-sm overflow-hidden">
              <img src={tpostImg} alt="Vertical Boundary Sign T-post marker installed on a fence line" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </section>

        {/* Why It's Different */}
        <section className="bg-secondary/40 border-y border-border">
          <div className="container py-12 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">WHY IT'S DIFFERENT</div>
              <h2 className="font-display text-3xl md:text-4xl mb-4 uppercase">A property marker that refuses to quit.</h2>
              <p className="text-muted-foreground">Most signs are paper-thin metal with a printed graphic that lasts a season. This one is engineered to last as long as the fence.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {whyDifferent.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-background border border-border p-6 rounded-sm">
                  <div className="h-10 w-10 bg-accent text-accent-foreground flex items-center justify-center rounded-sm mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg tracking-wide mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Installs */}
        <section className="container py-12 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">HOW IT INSTALLS</div>
            <h2 className="font-display text-3xl md:text-4xl mb-4 uppercase">Three steps. Under a minute.</h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-center">
            <div className="lg:col-span-2 relative rounded-sm overflow-hidden border border-border bg-secondary/50 aspect-[9/16] max-h-[560px] mx-auto w-full">
              <video
                className="w-full h-full object-cover"
                src={installVideo.url}
                poster={installPoster.url}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Installing a Boundary Sign T-post marker on a fence post"
              />
              <div className="absolute top-3 left-3 text-[10px] font-display tracking-[0.3em] text-primary-foreground bg-accent px-2 py-1 rounded-sm">
                LIVE INSTALL
              </div>
            </div>
            <div className="lg:col-span-3 grid sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {steps.map(({ n, title, body }) => (
                <div key={n} className="border border-border p-6 rounded-sm lg:flex lg:gap-5 lg:items-start">
                  <div className="font-display text-3xl text-accent mb-3 lg:mb-0 lg:text-4xl lg:shrink-0">{n}</div>
                  <div>
                    <h3 className="font-display text-lg tracking-wide mb-2 uppercase">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Built To Last */}
        <section className="bg-secondary/40 border-y border-border">
          <div className="container py-12 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">BUILT TO LAST</div>
              <h2 className="font-display text-3xl md:text-4xl mb-4 uppercase">SURVIVES WHAT THE WEST AND BEYOND THROWS AT IT.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {builtToLast.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-background border border-border p-6 rounded-sm">
                  <div className="h-10 w-10 bg-accent text-accent-foreground flex items-center justify-center rounded-sm mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg tracking-wide mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section id="compliance" className="container py-12 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">STATE COMPLIANCE</div>
            <h2 className="font-display text-3xl md:text-4xl mb-4 uppercase">Compliant in 36 states.</h2>
            <p className="text-muted-foreground">
              The T-Post Sign is built to satisfy posting statutes in the states listed below. Compliance applies specifically to this sign — the upcoming Barbwire Square Sign covers a different set.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
            {tPostCompliantStates.map(({ name, slug }) => (
              <div key={name} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-accent shrink-0" />
                {slug ? (
                  <Link to={`/blog/${slug}`} className="hover:text-accent underline-offset-4 hover:underline">{name}</Link>
                ) : (
                  <span>{name}</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-10 max-w-xl mx-auto">
            Compliance list current as of December 2025. Always confirm your state's most recent posting statutes before installation.
          </p>
        </section>

        {/* CTA */}
        <section className="container pb-20">
          <div className="bg-primary text-primary-foreground p-10 md:p-14 rounded-sm text-center">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">READY TO POST</div>
            <h2 className="font-display text-3xl md:text-4xl mb-4 uppercase">Mark your line. Once.</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">Heavy-gauge aluminum, cut-out lettering, and a mount that fits whatever post you already have in the ground.</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-widest">
              <Link to="/#products">Shop the T-Post Sign</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default TPostSign;