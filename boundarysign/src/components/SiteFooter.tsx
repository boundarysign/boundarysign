export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground mt-16 md:mt-24">
      <div className="container py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl tracking-wider mb-2">Boundary Sign</div>
          <p className="text-sm text-primary-foreground/70 max-w-xs">
            Rugged signage that helps landowners clearly mark their property — and keeps things honest between them and the people on the land.
          </p>
        </div>
        <div>
          <div className="font-display text-sm tracking-widest mb-3">Shop</div>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="#products" className="hover:text-accent">All Products</a></li>
            <li><a href="#products" className="hover:text-accent">No Trespassing Signs</a></li>
            <li><a href="#products" className="hover:text-accent">Mounting Hardware</a></li>
          </ul>
        </div>
        <div>
          <div className="font-display text-sm tracking-widest mb-3">Support</div>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="mailto:boundarysigninfo@gmail.com" className="hover:text-accent">boundarysigninfo@gmail.com</a></li>
            <li><a href="tel:+19077384658" className="hover:text-accent">(907) 738-4658</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} Boundary Sign — a Beyond Boundaries LLC brand. All rights reserved.</div>
          <div className="font-mono tracking-wider">EST. 2025</div>
        </div>
      </div>
    </footer>
  );
};