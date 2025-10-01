export type ActiveCampaignCustomerInput = {
  connectionid?: string;
  externalid?: string;
  email?: string;
  acceptsMarketing?: string;
};
export type ActiveCampaignCustomerAlternateInput = {
  ecomCustomer: {
    connectionid?: string;
    externalid?: string;
    email?: string;
    acceptsMarketing?: string;
  };
};

export type ActiveCampaignConnectionInput = {
  service?: string;
  externalid?: string;
  name?: string;
  logoUrl?: string;
  linkUrl?: string;
};

export type ActiveCampaignOrderProduct = {
  externalid?: string;
  name?: string;
  price?: number;
  quantity?: number;
  category?: number;
  sku?: number;
  description?: number;
  imageUrl?: string;
  productUrl?: string;
};

export type ActiveCampaignOrderInput = {
  externalid?: string | null;
  externalcheckoutid?: string | null;
  source?: string;
  email?: string;
  orderProducts?: ActiveCampaignOrderProduct[];
  orderUrl?: string;
  externalCreatedDate?: string;
  externalUpdatedDate?: string;
  shippingMethod?: string;
  totalPrice?: number;
  shippingAmount?: number;
  taxAmount?: number;
  discountAmount?: number;
  currency?: string;
  orderNumber?: string;
  connectionid?: string;
  customerid?: string;
  abandonedDate?: string;
};

export type ActiveCampaignCustomer = {
  connectionid?: string;
  externalid?: string;
  email?: string;
  totalRevenue?: string;
  totalOrders?: string;
  totalProducts?: string;
  avgRevenuePerOrder?: string;
  avgProductCategory?: string;
  tstamp?: string;
  acceptsMarketing?: string;
  id?: string;
  connection?: string;
  subscriberid?: string;
};

export type ActiveCampaignOrder = {
  externalid?: string;
  externalcheckoutid?: string;
  abandonedDate?: string;

  source?: string;
  email?: string;
  currency?: string;
  connectionid?: string;
  customerid?: string;
  orderUrl?: string;
  shippingMethod?: string;
  totalPrice?: 9111;
  shippingAmount?: 200;
  taxAmount?: 500;
  discountAmount?: 100;
  externalCreatedDate?: string;
  totalProducts?: 2;
  createdDate?: string;
  updatedDate?: string;
  state?: '1';
  connection?: string;
  orderProducts?: string[];
  orderDiscounts?: string[];
  customer?: string;
  orderDate?: string;
  tstamp?: string;
  links?: {
    connection?: string;
    customer?: string;
    orderProducts?: string;
    orderDiscounts?: string;
    orderActivities?: string;
  };
  id?: string;
};

export type ActiveCampaignContact = {
  id?: number;
  cdate?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
};

export type ActiveCampaignContactContactList = {
  contact?: number;
};
