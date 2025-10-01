/* eslint-disable no-undef */
import { ShopType } from '@/modules/shop/shop-types';

export type DirectionType = google.maps.DirectionsResult & { shop: ShopType };

export type LngLatType =
  | google.maps.LatLng
  | google.maps.LatLngLiteral
  | undefined;

export type DirectionServiceOrigin =
  | string
  | google.maps.LatLng
  | google.maps.Place
  | google.maps.LatLngLiteral;

export type ConfirmGeolocationType = {
  distance: google.maps.Distance | undefined;
  shop: ShopType | undefined;
};
