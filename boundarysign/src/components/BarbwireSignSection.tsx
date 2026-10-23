import { Check, Ruler, MapPin, Hammer } from "lucide-react";

const specs = [
  { icon: Ruler, label: "Format", value: "Rectangular, tabs for wire mounting" },
  { icon: Hammer, label: "Install", value: "Hangs directly on wire fencing, or screw mounted to wood, or ziptied to metal posts. " },
  { icon: MapPin, label: "Compliance", value: "49 states" },
];

const features = [
  '.040" powder-coated aluminum',
  "Blaze-orange UV-rated finish",
  "Cut-out letters — punched through the metal",
  "Won't fade, peel, or wear off. Ever.",
];

export const BarbwireSignSection = () => {
  return (
    <section id="barbwire-sign" className="bg-secondary/40 border-y border-border">
      <div className="container py-12 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">NEW — COMING SOON</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 uppercase">THE WIRE HANGER</h2>
          <p className="text-muted-foreground">
            A rectangular marker built specifically for wire fencing — and the broader set of state regulations that come with it.
          </p>
        </div>

        <article className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="lg:order-2">
            <div className="aspect-square bg-secondary/60 border border-border rounded-sm flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-xs font-display tracking-[0.3em] text-muted-foreground mb-2">PHOTO COMING SOON</div>
                <div className="font-display text-2xl text-muted-foreground/70">WIRE HANGER</div>
              </div>
            </div>
          </div>

          <div className="lg:order-1">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">NEW — COMING SOON</div>
            <h3 className="font-display text-3xl md:text-4xl uppercase leading-tight mb-2">WIRE HANGER</h3>
            <p className="font-display text-lg text-muted-foreground mb-5">Rectangular format. Built to install anywhere.</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              A rectangular marker built for wire fencing and sized to meet specifc state requirements for posting dimensions. Like the T-post sign, letters are cut directly through the aluminum so they never fade, peel, or fall off — no stickers, no paint, nothing to wear away. Tabs on the top and bottom let the sign hang from wires, with slots for zip ties and screw holes for so many other installation locations.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="border border-border bg-background rounded-sm p-3">
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

            <div className="border-l-2 border-accent pl-4">
              <div className="font-display text-sm tracking-wide">Compliant in 49 states*</div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                *Some states require additional steps such as custom stickers or owner information to meet posting requirements. Check your state before installing.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};