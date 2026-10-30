import tpostImg from "@/assets/tpost-sign-real.jpg";

export interface CatalogProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Display price. Omit when the product has no fixed price. */
  price?: number;
  /** e.g. "+ tax" */
  priceNote?: string;
  soldOut?: boolean;
  /** When true, ordering happens by email or phone inquiry (no online checkout). */
  inquiryOnly?: boolean;
  shippingNote?: string;
  learnMoreTo?: string;
}

export const CONTACT_EMAIL = "boundarysigninfo@gmail.com";
export const CONTACT_PHONE = "+19077384658";
export const CONTACT_PHONE_DISPLAY = "(907) 738-4658";

export const catalogProducts: CatalogProduct[] = [
  {
    id: "tpost-sign",
    name: "T-Post Sign",
    tagline: "The Flagship",
    description:
      'Vertical, heavy-gauge .040" aluminum marker with cut-out letters and a display tab that slides over T-posts, C-posts, and U-posts. Blaze-orange powdercoat, compliant in 36 states.',
    image: tpostImg,
    imageAlt: "Boundary Sign T-Post Sign: vertical blaze-orange aluminum no trespassing marker",
    price: 15.99,
    priceNote: "+ tax",
    inquiryOnly: true,
    shippingNote: "Free shipping on orders of 20 units or more",
    learnMoreTo: "/t-post-sign",
  },
];
