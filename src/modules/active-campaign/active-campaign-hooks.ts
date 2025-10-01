import { useContext } from 'react';
import {
  ActiveCampaignContextType,
  Context,
} from '@/components/active-campaign/ActiveCampaignContext';

export const useActiveCampaignHook = (): ActiveCampaignContextType => {
  const { customer, connectionId, order } = useContext(Context);
  return {
    connectionId,
    customer,
    order,
  };
};
