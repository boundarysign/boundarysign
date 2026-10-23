import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(s => s.addItem);
  const isLoading = useCartStore(s => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const hasOptions = product.node.options.some(o => o.name !== 'Title');
  const soldOut = !product.node.variants.edges.some(v => v.node.availableForSale);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant || soldOut) return;
    if (hasOptions) {
      // Send to PDP to choose variant
      window.location.href = `/product/${product.node.handle}`;
      return;
    }
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.node.title, position: "top-center" });
  };

  return (
    <Link
      to={`/product/${product.node.handle}`}
      className="group block bg-card border border-border rounded-sm overflow-hidden hover:border-primary/40 hover:shadow-rugged transition-all"
    >
      <div className="aspect-square bg-secondary/30 overflow-hidden">
        {image && (
          <img
            src={image.url}
            alt={image.altText || product.node.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-lg leading-tight tracking-wide flex-1">{product.node.title}</h3>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">From</div>
            <div className="text-2xl font-bold">${parseFloat(price.amount).toFixed(2)}</div>
          </div>
          <Button
            onClick={handleQuickAdd}
            disabled={isLoading || !variant || soldOut}
            size="sm"
            className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground font-display tracking-widest"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : soldOut ? "Sold Out" : <>{hasOptions ? "Select" : <><Plus className="w-4 h-4 mr-1" />Add</>}</>}
          </Button>
        </div>
      </div>
    </Link>
  );
};