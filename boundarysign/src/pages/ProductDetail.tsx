import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";

const ProductDetail = () => {
  const { handle } = useParams();
  const { data: product, isLoading } = useShopifyProduct(handle);
  const addItem = useCartStore(s => s.addItem);
  const isAdding = useCartStore(s => s.isLoading);
  const [selected, setSelected] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      const initial: Record<string, string> = {};
      product.options?.forEach((o: any) => { initial[o.name] = o.values[0]; });
      setSelected(initial);
    }
  }, [product]);

  const variant = useMemo(() => {
    if (!product) return null;
    return product.variants.edges.find((v: any) =>
      v.node.selectedOptions.every((opt: any) => selected[opt.name] === opt.value)
    )?.node ?? product.variants.edges[0]?.node;
  }, [product, selected]);

  const handleAdd = async () => {
    if (!product || !variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {product && (
        <Seo
          title={`${product.title} — Boundary Sign`}
          description={(product.description || "Premium aluminum no trespassing sign by Boundary Sign.").slice(0, 155)}
          path={`/product/${handle}`}
          type="product"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images?.edges?.[0]?.node?.url,
            brand: { "@type": "Brand", name: "Boundary Sign" },
            offers: variant ? {
              "@type": "Offer",
              price: variant.price.amount,
              priceCurrency: variant.price.currencyCode || "USD",
              availability: variant.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              url: `https://www.boundarysign.com/product/${handle}`,
            } : undefined,
          }}
        />
      )}
      <SiteHeader />
      <main className="flex-1 container py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>

        {isLoading && (
          <div className="flex justify-center py-14 md:py-24"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
        )}

        {!isLoading && !product && (
          <div className="text-center py-14 md:py-24">
            <p className="font-display text-2xl">Product not found</p>
          </div>
        )}

        {product && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-secondary/30 rounded-sm overflow-hidden border border-border">
              {product.images.edges[0]?.node && (
                <img
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  className="w-full h-full object-cover aspect-square"
                />
              )}
            </div>
            <div className="flex flex-col">
              <div className="text-xs font-display tracking-[0.3em] text-accent mb-3">{product.productType || 'BOUNDARY SIGN'}</div>
              <h1 className="font-display text-3xl md:text-5xl leading-tight mb-4">{product.title}</h1>
              <div className="text-3xl font-bold mb-6">
                ${variant ? parseFloat(variant.price.amount).toFixed(2) : parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
              </div>

              <div
                className="prose prose-sm max-w-none text-muted-foreground mb-8"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml || `<p>${product.description}</p>` }}
              />

              {product.options?.filter((o: any) => o.name !== 'Title').map((opt: any) => (
                <div key={opt.name} className="mb-5">
                  <div className="text-xs font-display tracking-widest mb-2">
                    {opt.name.toUpperCase()}:
                    <span className="text-muted-foreground ml-1">{selected[opt.name]}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((val: string) => {
                      const active = selected[opt.name] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => setSelected(s => ({ ...s, [opt.name]: val }))}
                          className={`px-4 py-2 text-sm border rounded-sm transition-colors ${active ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:border-primary/60'}`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <Button
                onClick={handleAdd}
                disabled={!variant || isAdding || !variant?.availableForSale}
                size="lg"
                className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-widest"
              >
                {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : !variant?.availableForSale ? "Sold Out" : <><ShoppingCart className="w-5 h-5 mr-2" />Add to Cart</>}
              </Button>

              <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
                Ships from the U.S. • 30-day returns • Bulk pricing available — Contact me
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default ProductDetail;