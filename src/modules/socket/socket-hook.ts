/**import { useEffect } from 'react';
import { socket } from '@/modules/socket/socket';
import { PaymentDataType } from '@/modules/payment/payment-types';

export const useActiveCampaignSocketHook = () => {
  const emitActiveCampaignCustomer = (billingInfo: PaymentDataType) => {
    if (socket.connected) socket.emit('active_campaign_customer', billingInfo);
  };

  const emitActiveCampaignAnniversary = (billingInfo: PaymentDataType) => {
    if (socket.connected)
      socket.emit('active_campaign_anniversary', billingInfo);
  };

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();
    socket.on('session', () => {});

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    emitActiveCampaignCustomer,
    emitActiveCampaignAnniversary,
  };
};
 */
