import tpostImg from "@/assets/tpost-sign-real.jpg";
import { Check, Ruler, MapPin, Hammer, Zap, Sun, Shield, Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { tPostCompliantStates } from "@/data/tPostCompliantStates";

const specs = [
  { icon: Ruler, label: "Format", value: "Vertical, T-post mount" },
  { icon: Hammer, label: "Install", value: "Slides on, zip-tied" },
  { icon: MapPin, label: "Compliance", value: "36 states" },
];

const features = [
  '.040" powder-coated aluminum',
  "Blaze-orange UV-rated finish",
  "Cut-out letters punched through the metal",
  "Won't fade, peel, or wear off. Ever.",
];

const designTiles = [
  { icon: Zap, title: "Seconds to Install", body: "Slips vertically onto T-posts, C-posts, and U-posts, and secures with zip ties." },
  { icon: Shield, title: '.040" Aluminum', body: "Heavy-gauge aluminum body that effectively resists bending, warping, or crumpling like normal hardware store signs. " },
  { icon: Sun, title: "Blaze Orange Powdercoat", body: "UV-rated powdercoat finish that holds its color through years of sun, rain, snow, and wind." },
  { icon: Eye, title: "Cut-Out Letters", body: "Letters are punched straight through the metal, so they physically can't fade, peel, or wash off." },
  { icon: CheckCircle2, title: "Built to Last", body: "Stands up to weather, livestock, and people. Uses the post's own rigidity for support with no flex and no fail." },
];

export const TPostSignSection = () => {
  return (
    <section id="tpost-sign" className="container py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">THE FLAGSHIP</div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 uppercase">The T-Post Sign</h2>
        <p className="text-muted-foreground">
          A vertical aluminum marker engineered to slide onto fence posts and stay there for years.
        </p>
      </div>

      <article className="grid lg:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <div className="aspect-square bg-secondary/50 border border-border rounded-sm overflow-hidden">
            <img src={tpostImg} alt="Vertical Boundary Sign T-post marker installed on a fence line" loading="lazy" className="w-full h-full object-cover object-top" />
          </div>
        </div>
        <div>
          <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">THE ORIGINAL</div>
          <h3 className="font-display text-3xl md:text-4xl uppercase leading-tight mb-2">T-Post Sign</h3>
          <p className="font-display text-lg text-muted-foreground mb-5">Vertical. Cut-out lettering. Made for fence lines.</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            The flagship marker. A heavy-gauge vertical aluminum sign engineered to slide onto T-posts, C-posts, U-posts or fasten on to round posts and wood posts, staying put for years. Cut-out letters are punched directly through the metal so they can't fade, peel, fall off, or wear off. Besides, who shoots at a sign that already has holes in it?
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="border border-border rounded-sm p-3">
                <Icon className="h-4 w-4 text-accent mb-2" />
                <div className="text-[10px] font-display tracking-widest text-muted-foreground">{label}</div>
                <div className="text-xs font-medium leading-tight mt-1">{value}</div>
              </div>
            ))}
          </div>

          <ul className="space-y-2 mb-6">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground font-display tracking-widest">
              <a href="#products">Shop the T-Post Sign</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-display tracking-widest">
              <Link to="/t-post-sign">Learn More</Link>
            </Button>
          </div>
        </div>
      </article>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {designTiles.map(({ icon: Icon, title, body }) => (
          <div key={title} className="border border-border bg-background p-6 rounded-sm">
            <div className="h-10 w-10 bg-accent text-accent-foreground flex items-center justify-center rounded-sm mb-4">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg tracking-wide mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary/50 border border-border rounded-sm p-8 md:p-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">T-POST SIGN COMPLIANCE</div>
          <h3 className="font-display text-3xl md:text-4xl mb-4">Compliant in 36 states.</h3>
          <p className="text-muted-foreground">
            The T-Post Sign is designed to meet posting statutes for private property markers across the states below. Don't see yours? A new design is in the works to cover the rest.
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
      </div>
    </section>
  );
};