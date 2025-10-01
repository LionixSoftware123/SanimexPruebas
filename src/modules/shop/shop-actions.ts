import { createStoreAction } from '@cobuildlab/react-simple-state';
import { selectedShopStore } from '@/modules/shop/shop-events';
import { ShopType } from '@/modules/shop/shop-types';

export const selectedShopStoreAction = createStoreAction(
  selectedShopStore,
  (prev, shop: ShopType) => ({
    ...prev,
    shop,
  }),
);
