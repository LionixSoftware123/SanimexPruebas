/* eslint-disable no-undef */

import Shops from '@/utils/sucursales.json';
import {
  DirectionServiceOrigin,
  DirectionType,
  LngLatType,
} from '@/modules/geolocation/geolocation-types';
import { sortDistances } from '@/modules/geolocation/geolocation-utils';
import {
  createAction,
  createStoreAction,
} from '@cobuildlab/react-simple-state';
import {
  checkStoreErrorEvent,
  checkStoreEvent,
  findStoreEvent,
  findStoreErrorEvent,
  confirmGeolocationStore,
} from '@/modules/geolocation/geolocation-events';
import { ShopType } from '@/modules/shop/shop-types';
import geopoint from 'geopoint';
export const checkStoreAction = createAction(
  checkStoreEvent,
  checkStoreErrorEvent,
  async (origin: LngLatType) => {
    const directions: DirectionType[] = [];
    const directionsService = new google.maps.DirectionsService();
    const linealDistaces = [];
    for (const shopl of Shops) {
      const point1 = new geopoint(origin?.lat as number, origin?.lng as number);
      const point2 = new geopoint(shopl.LOCATION.lat, shopl.LOCATION.lng);
      const distance = point1.distanceTo(point2, true);
      linealDistaces.push({
        shop: shopl,
        distance: distance,
      });
    }
    linealDistaces.sort(function (a, b) {
      return a.distance - b.distance;
    });

    for (const shop of [linealDistaces[0].shop]) {
      const direction = await directionsService.route({
        origin: origin as DirectionServiceOrigin,
        destination: shop.LOCATION,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      directions.push({ ...direction, shop });
    }
    const newDistances = sortDistances(directions);

    const { shop, ...rest } = newDistances[0];

    return {
      directions: rest,
      shop,
    };
  },
);

export const findStoreAction = createAction(
  findStoreEvent,
  findStoreErrorEvent,
  async (origin: LngLatType, destination: LngLatType) => {
    const directionsService = new google.maps.DirectionsService();

    const directions = await directionsService.route({
      origin: origin as DirectionServiceOrigin,
      destination: destination as DirectionServiceOrigin,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    return {
      directions,
    };
  },
);

export const confirmGeolocationStoreAction = createStoreAction(
  confirmGeolocationStore,
  (
    prev,
    distance: google.maps.Distance | undefined,
    shop: ShopType | undefined,
  ) => ({
    ...prev,
    distance,
    shop,
  }),
);
