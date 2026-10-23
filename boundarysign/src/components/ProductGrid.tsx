import { catalogProducts } from "@/data/products";
import { CatalogCard } from "./CatalogCard";

export const ProductGrid = () => {
  return (
    <section id="products" className="container py-12 md:py-20">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">THE LINEUP</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Shop Boundary Sign</h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          A small, focused catalog. Every item is field-tested and built to outlast its replacements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogProducts.map((p) => (
          <CatalogCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};
