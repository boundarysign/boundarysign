import { Mail, Phone } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="border-t border-border bg-background">
      <div className="container py-12 md:py-20 md:py-28">
        <div className="text-xs font-display tracking-[0.3em] text-accent mb-4">— GET IN TOUCH</div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">CONTACT ME</h2>
        <p className="text-base md:text-lg text-foreground/75 max-w-2xl mb-10">
          Questions about a product, a bulk order, or your property? Reach out — I answer every message personally.
        </p>
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
          <a
            href="mailto:boundarysigninfo@gmail.com"
            className="group flex items-start gap-4 border border-border p-6 hover:border-accent transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-sm tracking-widest text-muted-foreground mb-1">EMAIL</div>
              <div className="font-display text-lg group-hover:text-accent transition-colors break-all">
                boundarysigninfo@gmail.com
              </div>
            </div>
          </a>
          <a
            href="tel:+19077384658"
            className="group flex items-start gap-4 border border-border p-6 hover:border-accent transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-sm tracking-widest text-muted-foreground mb-1">PHONE</div>
              <div className="font-display text-lg group-hover:text-accent transition-colors">
                (907) 738-4658
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};