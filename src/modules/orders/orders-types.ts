import { createEvent } from '@cobuildlab/react-simple-state';

export const finishPaymentEvent = createEvent<{ orderId: number | undefined }>({
  initialValue: {
    orderId: undefined,
  },
});
