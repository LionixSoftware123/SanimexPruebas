/* eslint-disable no-undef */
import { DirectionType } from '@/modules/geolocation/geolocation-types';
import { ShopType } from '@/modules/shop/shop-types';
import shops from '@/utils/sucursales.json';
import { COST_BY_KM } from '@/modules/geolocation/geolocation-constants';

export const getDistance = (
  _direction: google.maps.DirectionsResult | undefined,
) => {
  if (_direction && _direction.routes && _direction.routes.length) {
    return _direction.routes[0].legs[0].distance;
  }

  return undefined;
};

export const sortDistances = (directions: DirectionType[]): DirectionType[] => {
  return directions.sort(function (a, b) {
    const directionA = getDistance(a)?.value || 0;
    const directionB = getDistance(b)?.value || 0;
    if (directionA < directionB) {
      return -1;
    }
    if (directionA > directionB) {
      return 1;
    }
    return 0;
  });
};
const SHOP_SELECT_DEFAULT_VALUE = { value: 0, label: 'Buscar el mas cercano' };

export const getShopSelectValue = (
  shop: ShopType | undefined,
): {
  value: number;
  label: string;
} => {
  if (shop) {
    return {
      value: shop.ID,
      label: `${shop.TIENDA} - ${shop.ESTADO}`,
    };
  }

  return SHOP_SELECT_DEFAULT_VALUE;
};

export const getShopSelectOptions = [
  SHOP_SELECT_DEFAULT_VALUE,
  ...shops.map((shop) => ({
    value: shop.ID,
    label: `${shop.TIENDA} - ${shop.ESTADO}`,
  })),
];

// export const calculateCost = (distance: google.maps.Distance | undefined) => {
//   if (distance && distance.value >= 10000)
//     return 250 + ((distance.value - 10000) / 1000) * COST_BY_KM;
//   if (distance) return 250;
//   return 0;
// };

export const calculateCost = (
  distance: google.maps.Distance | undefined,
  freeShipping: boolean = false
) => {
  if (freeShipping) return 0;
  if (distance && distance.value >= 10000)
    return 250 + ((distance.value - 10000) / 1000) * COST_BY_KM;
  if (distance) return 250;
  return 0;
};