import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_QUERY, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts() {
  return useQuery({
    queryKey: ['shopify-products'],
    queryFn: async (): Promise<ShopifyProduct[]> => {
      const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20, query: null });
      return data?.data?.products?.edges ?? [];
    },
  });
}

export function useShopifyProduct(handle: string | undefined) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    enabled: !!handle,
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.product ?? null;
    },
  });
}