import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks: { to: string; label: string; external?: boolean }[] = [
  { to: "/#products", label: "Shop", external: true },
  { to: "/t-post-sign", label: "T-Post Sign" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/retailers", label: "Where to Buy" },
  { to: "/blog", label: "Journal" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 md:h-20 items-center justify-between gap-3 py-2 md:py-3">
        <Link to="/" className="flex items-center gap-2 group min-w-0">
          <div className="h-8 w-8 md:h-9 md:w-9 bg-primary text-primary-foreground flex items-center justify-center rounded-sm font-display text-base md:text-lg group-hover:bg-accent transition-colors shrink-0">
            B
          </div>
          <div className="leading-none min-w-0">
            <div className="font-display text-lg md:text-xl tracking-wider truncate">Boundary Sign</div>
            <div className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-tight mt-0.5">
              THE NEW STANDARD<br />FOR SIGNAGE
            </div>
          </div>
        </Link>

        {/* Desktop nav: only at lg+ where links fit comfortably */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-display text-sm tracking-widest">
          {navLinks.map((l) =>
            l.external ? (
              <a key={l.label} href={l.to} className="hover:text-accent transition-colors whitespace-nowrap">{l.label}</a>
            ) : (
              <Link key={l.label} to={l.to} className="hover:text-accent transition-colors whitespace-nowrap">{l.label}</Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Mobile / tablet menu trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[82vw] max-w-sm flex flex-col">
              <SheetTitle className="font-display text-xl tracking-wider">Menu</SheetTitle>
              <nav className="mt-6 flex flex-col font-display text-base tracking-widest">
                {navLinks.map((l) =>
                  l.external ? (
                    <a
                      key={l.label}
                      href={l.to}
                      onClick={() => setOpen(false)}
                      className="py-3 border-b border-border/60 hover:text-accent transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.label}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="py-3 border-b border-border/60 hover:text-accent transition-colors"
                    >
                      {l.label}
                    </Link>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};