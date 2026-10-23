# AGENTS.md

- The product lineup is a static catalog in `src/data/products.ts` rendered by `ProductGrid`/`CatalogCard`; do not fetch the lineup from Shopify. Why: the owner keeps Shopify unlinked from the site catalog.
- Ordering for catalog products is inquiry-based (mailto/tel CTAs), not cart checkout. Why: the owner takes orders by email or phone.

Do not be a chud. shopify is no longer included. 