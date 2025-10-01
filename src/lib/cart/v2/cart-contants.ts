import { CartContext } from '@/lib/cart/v2/cart-types';
import moment from 'moment';

export const CART_VALUES = {
  items: [],
  coupons: [],
  fees: [],
  totals: {
    total_items: '0',
    total_items_tax: '0',
    total_fees: '0',
    total_fees_tax: '0',
    total_discount: '0',
    total_discount_tax: '0',
    total_shipping: null,
    total_shipping_tax: null,
    total_price: '0',
    total_tax: '0',
    tax_lines: [],
    currency_code: 'MXN',
    currency_symbol: '$',
    currency_minor_unit: 2,
    currency_decimal_separator: '.',
    currency_thousand_separator: ',',
    currency_prefix: '$',
    currency_suffix: '',
  },
  shipping_address: {
    first_name: '',
    last_name: '',
    company: '',
    address_1: '',
    address_2: '',
    city: '',
    state: 'DF',
    postcode: '',
    country: 'MX',
    phone: '',
  },
  billing_address: {
    first_name: '',
    last_name: '',
    company: '',
    address_1: '',
    address_2: '',
    city: '',
    state: 'DF',
    postcode: '',
    country: 'MX',
    email: '',
    phone: '',
  },
  needs_payment: false,
  needs_shipping: false,
  payment_requirements: ['products'],
  has_calculated_shipping: false,
  shipping_rates: [],
  items_count: 0,
  items_weight: 0,
  cross_sells: [],
  errors: [],
};

export const CART_CONTEXT_VALUES: CartContext = {
  cart: CART_VALUES,
  loading: false,
};

export const CART_DOMAIN_SITE = `.${process.env.NEXT_PUBLIC_DOMAIN || ''}`;

export const CART_COOKIES_OPTIONS = {
  expires: moment().add(1, 'month').toDate(),
  path: '/',
  domain: CART_DOMAIN_SITE,
};
