import { IProduct } from './types/generated';
import currencyFormatter from 'currency-formatter';

export const calculateEasySearchProductCustomDiscount = (
  product: IProduct,
): number => {
  if (!(product && product.price && product.regular_price)) return 0;

  return product.regular_price - product.price;
};

export const formatPrice = (
  price: number,
  currencyCode: string = 'USD',
): string => {
  return currencyFormatter.format(price, { code: currencyCode });
};
