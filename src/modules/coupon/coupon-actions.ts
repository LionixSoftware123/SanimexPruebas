import { createAction } from '@cobuildlab/react-simple-state';
import axios, { AxiosError } from 'axios';
import {
  applyCouponErrorEvent,
  applyCouponEvent,
  removeCouponEvent,
} from '@/modules/coupon/coupon-events';
import {
  ApplyCouponMutationVariables,
  ApplyCouponPayload,
  RemoveCouponMutationVariables,
  RemoveCouponsPayload,
} from '@/utils/types/generated';

export const applyCouponAction = createAction(
  applyCouponEvent,
  applyCouponErrorEvent,
  async (variables: ApplyCouponMutationVariables) => {
    let response;

    try {
      response = await axios.post<ApplyCouponPayload>('/api/woo-add-coupon', {
        variables,
      });
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    console.log('response', response);

    return response.data;
  },
);

export const removeCouponAction = createAction(
  removeCouponEvent,
  applyCouponErrorEvent,
  async (variables: RemoveCouponMutationVariables) => {
    let response;

    try {
      response = await axios.post<RemoveCouponsPayload>(
        '/api/woo-remove-coupon',
        { variables },
      );
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    console.log('response', response);

    return response.data;
  },
);
