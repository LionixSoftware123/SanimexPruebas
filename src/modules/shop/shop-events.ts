import { createStore } from '@cobuildlab/react-simple-state';
import { ShopType } from '@/modules/shop/shop-types';

export const selectedShopStore = createStore<{ shop: ShopType | undefined }>({
  initialValue: {
    shop: undefined,
  },
});
