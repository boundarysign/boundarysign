import { useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';

export function useCartSync() {
  const syncCart = useCartStore(state => state.syncCart);
  useEffect(() => {
    syncCart();
    const onVis = () => { if (document.visibilityState === 'visible') syncCart(); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [syncCart]);
}