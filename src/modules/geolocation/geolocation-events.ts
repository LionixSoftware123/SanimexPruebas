/* eslint-disable no-undef */

import { createEvent, createStore } from '@cobuildlab/react-simple-state';
import { ShopType } from '@/modules/shop/shop-types';
import { ConfirmGeolocationType } from '@/modules/geolocation/geolocation-types';

export const checkStoreEvent = createEvent<{
  shop: ShopType | undefined;
  directions: google.maps.DirectionsResult | undefined;
}>({
  initialValue: {
    shop: undefined,
    directions: undefined,
  },
});

export const checkStoreErrorEvent = createEvent();

export const findStoreEvent = createEvent<{
  directions: google.maps.DirectionsResult | undefined;
}>({
  initialValue: {
    directions: undefined,
  },
});

export const findStoreErrorEvent = createEvent();

export const confirmGeolocationStore = createStore<ConfirmGeolocationType>({
  initialValue: {
    distance: undefined,
    shop: undefined,
  },
});
