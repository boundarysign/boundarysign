import heroImg from "@/assets/hero-ranch.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[480px] h-[70vh] md:h-[78vh] md:min-h-[560px] overflow-hidden">
      <img
        src={heroImg}
        alt="Ranch land at golden hour with a barbed wire fence and mountains in the distance"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-brand-forestDeep/30" />
      <div className="container relative z-10 h-full flex flex-col justify-end pb-10 sm:pb-16 md:pb-24">
        <div className="max-w-2xl text-primary-foreground">
          <div className="inline-flex items-center gap-2 mb-4 md:mb-5 text-[10px] sm:text-xs font-display tracking-[0.3em] text-accent">
            <span className="h-px w-8 bg-accent" />
            BUILT TO LAST
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] mb-4 md:mb-5 uppercase">
            BOUNDARY SIGN
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/85 max-w-xl mb-6 md:mb-8">
            Heavy-gauge, state-compliant property markers built by a young entrepreneur out of the Pacific Northwest. A growing lineup of signs engineered to survive every season and every fence line.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-widest w-full sm:w-auto">
              <a href="#signs">SEE THE SIGNS <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground font-display tracking-widest w-full sm:w-auto">
              <a href="#story">My Story</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};