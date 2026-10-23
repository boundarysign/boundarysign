import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { BuiltForSection } from "@/components/BuiltForSection";
import { BlogPreview } from "@/components/BlogPreview";
import { ContactSection } from "@/components/ContactSection";
import { Seo } from "@/components/Seo";
import { FounderStory } from "@/components/FounderStory";
import { TPostSignSection } from "@/components/TPostSignSection";
import { BarbwireSignSection } from "@/components/BarbwireSignSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Boundary Sign | No Trespassing & Private Property Signs"
        description="Shop heavy-gauge aluminum no trespassing signs and private property markers from Boundary Sign. Powder-coated, state-compliant, built for T-posts and fence lines."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Brand",
            name: "Boundary Sign",
            url: "https://www.boundarysign.com/",
            slogan: "No trespassing signs built to outlast the fence.",
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Boundary Sign Aluminum No Trespassing Signs",
            brand: { "@type": "Brand", name: "Boundary Sign" },
            description:
              "Powder-coated aluminum no trespassing and private property signs engineered for T-posts and fence lines. State-compliant property markers built to survive every season.",
            category: "No Trespassing Signs",
            url: "https://www.boundarysign.com/",
          },
        ]}
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TPostSignSection />
        <BarbwireSignSection />
        <ProductGrid />
        <BuiltForSection />
        <FounderStory />
        <BlogPreview />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
