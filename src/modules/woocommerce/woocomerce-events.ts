import { createEvent } from '@cobuildlab/react-simple-state';
import { Cart as CartType } from '@/utils/types/generated';

export const wooCommerceCartEvent = createEvent<{
  cart?: CartType;
  loading?: boolean;
}>({
  initialValue: {
    cart: undefined,
    loading: false,
  },
});
export const wooCommerceCartErrorEvent = createEvent();
