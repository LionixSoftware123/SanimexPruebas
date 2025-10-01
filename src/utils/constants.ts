export const BACKEND_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT ?? '';

export const BACKEND_SITE_URL = process.env.NEXT_PUBLIC_BACKEND_SITE_URL ?? '';

export const FRONTEND_ENDPOINT =
  process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT ?? '';

export const FRONTEND_ENDPOINT_SITEMAPS =
  process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT_SITEMAPS ?? '';

export const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '';

export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

export const GOOGLE_MAP_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? '';

export const OPEN_PAY_MERCHANT_ID =
  process.env.NEXT_PUBLIC_OPENPAY_MERCHANT_ID ?? '';
export const OPEN_PAY_SECRET_ID =
  process.env.NEXT_PUBLIC_OPENPAY_SECRET_ID ?? '';

export const OPEN_PAY_BASE_URI = process.env.NEXT_PUBLIC_OPENPAY_URI ?? '';
export const OPEN_PAY_PRODUCTION_MODE =
  process.env.NEXT_PUBLIC_OPENPAY_PRODUCTION_MODE ?? false;

export const OPEN_PAY_PUBLIC_ID =
  process.env.NEXT_PUBLIC_OPENPAY_PUBLIC_ID ?? '';
export const ATTRIBUTES_ALLOWED = ['pa_caja'];
export const ATTRIBUTES_BAG_ALLOWED = ['pa_peso-neto'];

export const WP_ENDPOINT = process.env.NEXT_PUBLIC_WP_ENDPOINT ?? '';

export const OPEN_PAY_MERCHANT =
  process.env.NEXT_PUBLIC_OPEN_PAY_MERCHANT ?? '';
export const OPEN_PAY_SECRET = process.env.NEXT_PUBLIC_OPEN_PAY_SECRET ?? '';
export const OPEN_PAY_PUBLIC = process.env.NEXT_PUBLIC_OPEN_PAY_PUBLIC ?? '';

export const DOMAIN_SITE = `.${process.env.NEXT_PUBLIC_DOMAIN || ''}`;

export const isProductionReady = true;

export const BANORTE_MERCHANT_ID =
  process.env.NEXT_PUBLIC_BANORTE_MERCHANT_ID ?? '';
export const BANORTE_USER = process.env.NEXT_PUBLIC_BANORTE_USER ?? '';
export const BANORTE_PASSWORD = process.env.NEXT_PUBLIC_BANORTE_PASSWORD ?? '';
export const BANORTE_TERMINAL_ID =
  process.env.NEXT_PUBLIC_BANORTE_TERMINAL_ID ?? '';
export const ACTIVE_CAMPAIGN_DOMAIN =
  process.env.NEXT_PUBLIC_ACTIVE_CAMPAIGN_DOMAIN ?? '';
export const ACTIVE_CAMPAIGN_TOKEN =
  process.env.NEXT_PUBLIC_ACTIVE_CAMPAIGN_TOKEN ?? '';

export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? '';
export const BUGSNAG_API_KEY = process.env.NEXT_PUBLIC_BUGSNAG_API_KEY ?? '';

export const BANORTE_PAYMENT_ENDPOINT =
  process.env.NEXT_PUBLIC_BANORTE_PAYMENT_ENDPOINT ?? '';

export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '';
export const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? '';

export const COOKIE_CART_TOKEN = 'cartToken';
export const SITEMAPS_ENV =
  process.env.NEXT_PUBLIC_SITEMAPS_ENV ?? 'development';
