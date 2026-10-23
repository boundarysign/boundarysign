import { Mail, Phone, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { CatalogProduct, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/data/products";

export const CatalogCard = ({ product }: { product: CatalogProduct }) => {
  return (
    <div className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden hover:border-primary/40 hover:shadow-rugged transition-all">
      <Link
        to={product.learnMoreTo ?? "/t-post-sign"}
        className="relative block aspect-square bg-secondary/30 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {product.soldOut && (
          <span className="absolute top-3 right-3 text-[10px] font-display tracking-[0.2em] bg-primary text-primary-foreground px-2 py-1 rounded-sm">
            SOLD OUT
          </span>
        )}
        {product.shippingNote && !product.soldOut && (
          <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-display tracking-[0.15em] bg-accent text-accent-foreground px-2 py-1 rounded-sm">
            <Truck className="h-3 w-3" />
            FREE SHIPPING 20+
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] font-display tracking-[0.3em] text-accent mb-1 uppercase">
          {product.tagline}
        </div>
        <h3 className="font-display text-lg leading-tight tracking-wide mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>

        <div className="mt-auto">
          {typeof product.price === "number" && (
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
              {product.priceNote && (
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {product.priceNote}
                </span>
              )}
            </div>
          )}
          {product.inquiryOnly && !product.soldOut && (
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Email or phone to order
            </p>
          )}
          {product.shippingNote && !product.soldOut && (
            <p className="text-xs text-muted-foreground mb-3">{product.shippingNote}</p>
          )}

          {!product.soldOut && (
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${product.name} order inquiry`)}`}
                className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground font-display text-xs tracking-widest px-4 py-2.5 rounded-sm transition-colors"
              >
                <Mail className="h-4 w-4" />
                EMAIL TO ORDER
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 border border-border hover:border-accent font-display text-xs tracking-widest px-4 py-2.5 rounded-sm transition-colors"
              >
                <Phone className="h-4 w-4" />
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
