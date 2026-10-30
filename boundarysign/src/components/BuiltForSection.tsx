import { Mountain, Shield, Hammer, Flag } from "lucide-react";

const items = [
  { icon: Mountain, title: "Built for the Land", body: "Made for ranchers, landowners, and anyone who needs durable, state-compliant markers on their fence line." },
  { icon: Shield, title: "Weatherproof", body: ".040\" aluminum signs finished in blaze-orange powder coat. UV-resistant, won't rust, won't fade." },
  { icon: Hammer, title: "Install & Forget", body: "Mounts in seconds and stays put for years." },
  { icon: Flag, title: "Made in the USA", body: "All signs are manufactured in Spokane, Washington with American-sourced materials." },
];

export const BuiltForSection = () => {
  return (
    <section id="built" className="bg-secondary/50 border-y border-border">
      <div className="container py-12 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">WHY BOUNDARY</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">Made for working land.</h2>
          <p className="text-muted-foreground">No-nonsense property markers. Durable, affordable, and ready to install in seconds.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-background border border-border p-8 rounded-sm">
              <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center rounded-sm mb-5">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl mb-2 tracking-wide">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};