import axios from 'axios';
import { GOOGLE_MAP_API_KEY } from '@/utils/constants';
import { CartItem } from './types/generated';

export type LocationType = {
  coords: {
    longitude: number;
    latitude: number;
  };
};

export type GeolocationInfoResult = {
  results: {
    address_components: {
      long_name: string;
      types: string[];
    }[];
  }[];
};
export const fetchGeolocationInfo = async (
  location: LocationType,
): Promise<GeolocationInfoResult> => {
  const locationInfo = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.coords?.latitude},${location?.coords?.longitude}&sensor=true&key=${GOOGLE_MAP_API_KEY}`,
  );
  return locationInfo.data;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
  active?: boolean;
};

export const generateBreadcrumbItems = (
  path: string,
  query: { [key: string]: string | string[] | undefined },
) => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      name: 'Inicio',
      path: '/',
    },
  ];

  let accumulatedPath = '';
  segments.forEach((segment, index) => {
    if (segment === '[category]' && query.category) {
      accumulatedPath += `/${query.category}`;
      const categoryName = (query.category as string)
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbItems.push({
        name: categoryName,
        path: accumulatedPath,
        active: index === segments.length - 1 && !query.product,
      });
    } else if (segment === '[product]' && query.product) {
      accumulatedPath += `/${query.product}`;
      const productName = (query.product as string)
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbItems.push({
        name: productName,
        path: accumulatedPath,
        active: index === segments.length - 1,
      });
    } else {
      accumulatedPath += `/${segment}`;
      const name = segment
        .replace(/\[|\]/g, '')
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbItems.push({
        name,
        path: accumulatedPath,
        active:
          index === segments.length - 1 && !query.category && !query.product,
      });
    }
  });

  return breadcrumbItems;
};

export const getImageAttributes = (cartItem: CartItem) => {
  const src =
    cartItem.variation && cartItem.variation.node.featuredImage
      ? cartItem.variation.node.featuredImage?.node.sourceUrl
      : cartItem.product?.node.featuredImage?.node.sourceUrl;

  const alt = cartItem.variation
    ? cartItem.variation.node.name
    : cartItem.product?.node.name;

  return { src, alt };
};

export const fetchProducts = async (
  query: Record<string, any>,
  take: number,
) => {
  const page = parseInt(query.page as string) || 1;
  const skip = (page - 1) * take;

  const params = new URLSearchParams({
    search: query.q || '',
    color: query.color || '',
    brand: query.brand || '',
    material: query.material || '',
    sort: query.sort || '',
    skip: skip.toString(),
    take: take.toString(),
  });

  const response = await fetch(`/api/basicsearch/search?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.statusText}`);
  }

  return response.json();
};

export const fetchProductsSearch = async (query: string, take: number) => {
  const params = new URLSearchParams({
    search: query || '',
    take: take.toString(),
  });

  const response = await fetch(`/api/basicsearch/search?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.statusText}`);
  }

  return response.json();
};
