import { createContext } from 'react';
import {
  ActiveCampaignCustomer,
  ActiveCampaignOrder,
} from '@/modules/active-campaign/active-campaign-types';
import { PaymentDataType } from '@/modules/payment/payment-types';


export type ActiveCampaignContextType = {
  connectionId: string;
  customer?: ActiveCampaignCustomer;
  order?: ActiveCampaignOrder;
  registerCustomerData?: (data: PaymentDataType) => void
};

const defaultValues = {
  connectionId: '1',
  customer: undefined,
  order: undefined,
  registerCustomerData: () => {
  },
};

export const Context = createContext<ActiveCampaignContextType>(defaultValues);

export const { Consumer } = Context;
export const { Provider } = Context;
