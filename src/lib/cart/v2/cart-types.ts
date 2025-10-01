interface QuantityLimits {
  minimum: number;
  maximum: number;
  multiple_of: number;
  editable: boolean;
}

interface Image {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

interface RawPrices {
  precision: number;
  price: string;
  regular_price: string;
  sale_price: string;
}

interface Prices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: string | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
  raw_prices: RawPrices;
}

interface Totals {
  line_subtotal: string;
  line_subtotal_tax: string;
  line_total: string;
  line_total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
  total_price: string;
}

export type CartItemVariation = {
  attribute: string;
  value: string;
};

export interface CartItem {
  key: string;
  id: number;
  type: string;
  quantity: number;
  quantity_limits: QuantityLimits;
  name: string;
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: number | null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: Image[];
  variation: CartItemVariation[];
  item_data: any[];
  prices: Prices;
  totals: Totals;
  catalog_visibility: string;
  extensions: Record<string, unknown>;
}

type TaxLine = {
  name: string;
  price: string;
  rate: string;
};

interface TotalsCart {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string | null;
  total_shipping_tax: string | null;
  total_price: string;
  total_tax: string;
  tax_lines: TaxLine[];
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

interface Address {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface UpsaleItem {
  id: number;
  name: string;
  prices: PricesUpsale;
  regular_price: string;
  sale_price: string;
  images: ImagesUpsale[];
  url: string;
  permalink: string;
  brand: string;
  type: string;
  quantity_limits: QuantityLimits;
  discount_percentage: number;
  attributes: UpsaleAttribute[];
  categories: UpsaleCategory[];
}

export interface Cart {
  items: CartItem[];
  coupons: any[];
  fees: any[];
  totals: TotalsCart;
  shipping_address: Address;
  billing_address: Address;
  needs_payment: boolean;
  needs_shipping: boolean;
  payment_requirements: string[];
  has_calculated_shipping: boolean;
  shipping_rates: any[];
  items_count: number;
  items_weight: number;
  cross_sells: any[];
  errors: any[];
  up_sells?: UpsaleItem[];
}

export interface ApiError extends Error {
  message: string;
}

export type CartContext = {
  cart?: Cart | null;
  loading?: boolean;
  updateCart?: (cart?: Cart | null) => void;
  refetchCart?: () => void;
};

export type CartResponse = {
  cart?: Cart | null;
  token?: string | null;
};

export type CouponResponse = {
  cart?: Cart | null;
  token?: string | null;
};

export type CartAddItemData = {
  id: number | undefined;
  quantity: number;
};

export type CartRemoveItemData = {
  keys: string[];
};

export type ApplyCouponData = {
  code: string;
  email: string;
};

interface PricesUpsale {
  price: string;
  regular_price: string;
  sale_price: string;
}

interface ImagesUpsale {
  alt: string;
  id: number;
  name: string;
  sizes: string;
  src: string;
  srcset: string;
  thumbnail: string;
}

export interface UpsaleAttribute {
  name: string;
  value?: string[];
}

export interface UpsaleCategory {
  name: string;
  slug: string;
}
