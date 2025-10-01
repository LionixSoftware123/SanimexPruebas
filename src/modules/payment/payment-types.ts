export enum PaymentMethodEnum {
  OpenPay = 'openpay_cards',
  Transfer = 'bacs',
}

export type ShippingZone = {
  id: number;
  name: string;
  postalCode: string[];
  address?: string;
};

export type CreditCardDataType = {
  cardHolderName?: string;
  creditCardNumber?: string;
  expiredDate?: string;
  cvc?: string;
};

export type PaymentDataType = {
  firstname?: string;
  lastname?: string;
  email?: string;
  country?: string;
  state?: string;
  address1?: string;
  address2?: string;
  postalCode?: string;
  phone?: string;
  note?: string;
};

export type ShippingAddressType = {
  firstname?: string;
  lastname?: string;
  country?: string;
  state?: string;
  address1?: string;
  postalCode?: string;
  phone?: string;
};

export type PaymentValues = {
  billingAddress: PaymentDataType;
  card: CreditCardDataType;
  shipping: ShippingAddressType;
  shop: string;
};
