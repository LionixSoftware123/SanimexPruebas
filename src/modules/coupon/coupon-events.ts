import { createEvent } from '@cobuildlab/react-simple-state';
import {
  ApplyCouponPayload,
  RemoveCouponsPayload,
} from '@/utils/types/generated';

export const applyCouponEvent = createEvent<ApplyCouponPayload>();

export const applyCouponErrorEvent = createEvent<Error>();

export const removeCouponEvent = createEvent<RemoveCouponsPayload>();

export const removeCouponErrorEvent = createEvent<Error>();
