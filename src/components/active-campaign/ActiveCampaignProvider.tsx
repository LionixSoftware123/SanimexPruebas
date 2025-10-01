import React, { ReactNode, useEffect, useState } from 'react';
import {
  Provider,
  ActiveCampaignContextType,
} from '@/components/active-campaign/ActiveCampaignContext';
import { useUserHook } from '@/modules/auth/user-hooks';
import { useCallAction, useSubscription } from '@cobuildlab/react-simple-state';
import {
  createActiveCampaignUserOrder,
  fetchActiveCampaignCustomers,
  fetchActiveCampaignOrders,
  updateActiveCampaignUserOrder,
} from '@/modules/active-campaign/active-campaign-actions';
import {
  ActiveCampaignCustomer,
  ActiveCampaignOrder,
} from '@/modules/active-campaign/active-campaign-types';
import { Cart, User } from '@/utils/types/generated';
import { useCookies } from 'react-cookie';
import { addCartEvent, removeCartEvent } from '@/modules/cart/cart-events';
import { fetchActiveCampaignUserOrderEvent } from '@/modules/active-campaign/active-campaign-events';
import randomString from 'randomstring';
import { DOMAIN_SITE } from '@/utils/constants';
import moment from 'moment';

type ActiveCampaignProviderProps = {
  children?: ReactNode;
};

const ActiveCampaignProvider: React.FC<ActiveCampaignProviderProps> = ({
  children,
}) => {
  const {
    state: { user },
  } = useUserHook();
  const [cookies, setCookie] = useCookies(['wooSessionToken', 'checkoutToken']);
  const [customer, setCustomer] = useState<ActiveCampaignCustomer | undefined>(
    undefined,
  );
  const [order, setOrder] = useState<ActiveCampaignOrder | undefined>(
    undefined,
  );

  const [createOrder] = useCallAction(createActiveCampaignUserOrder, {
    onCompleted: (data) => {
      if (data) {
        setOrder(data);

        fetchActiveCampaignUserOrderEvent.dispatch({
          order: data,
        });
      }
    },
    onError: () => {},
  });

  const [updateOrder] = useCallAction(updateActiveCampaignUserOrder, {
    onCompleted: (data) => {
      if (data) {
        setOrder(data);
        fetchActiveCampaignUserOrderEvent.dispatch({
          order: data,
        });
      }
    },
    onError: () => {},
  });

  const [fetchCustomers] = useCallAction(fetchActiveCampaignCustomers, {
    onCompleted: (data) => {
      if (data?.length) {
        setCustomer(data[0]);
      }
    },
    onError: () => {},
  });

  const [fetchOrders] = useCallAction(fetchActiveCampaignOrders, {
    onCompleted: (data) => {
      if (data?.length) {
        setOrder(data[0]);
        fetchActiveCampaignUserOrderEvent.dispatch({
          order: data[0],
        });
      }
    },
    onError: () => {},
  });

  const addOrder = async (cart?: Cart) => {
    createOrder({
      cart: cart as Cart,
      user: user as User,
      externalCheckoutId: cookies.checkoutToken,
      abandonedDate: moment().format().toString(),
    });
  };

  const editOrder = (cart?: Cart, orderId = '') => {
    updateOrder({
      cart: cart as Cart,
      user: user as User,
      externalCheckoutId: cookies.checkoutToken,
      orderId,
      shippingTotal: 0,
      externalOrderId: null,
      abandonedDate: moment().format().toString(),
    });
  };

  useEffect(() => {
    if (user && user?.id) {
      fetchCustomers(user);
    }
  }, [fetchCustomers, user]);

  useEffect(() => {
    if (!cookies.checkoutToken) {
      setCookie('checkoutToken', randomString.generate(10), {
        expires: moment().add(30, 'days').toDate(),
        path: '/',
        domain: DOMAIN_SITE,
      });
    }
  }, [cookies.checkoutToken, setCookie]);

  useEffect(() => {
    if (cookies.checkoutToken) {
      fetchOrders(cookies.checkoutToken);
    }
  }, [cookies.checkoutToken, fetchOrders]);

  useSubscription(addCartEvent, (data) => {
    if (!user) return;
    if (order) {
      editOrder(data?.cart as Cart, order.id as string);
    } else {
      addOrder(data?.cart as Cart);
    }
  });

  useSubscription(removeCartEvent, (data) => {
    if (order) {
      editOrder(data?.cart as Cart, order.id as string);
    }
  });

  const values: ActiveCampaignContextType = {
    connectionId: '1',
    customer,
    order,
  };

  return <Provider value={values}>{children}</Provider>;
};

export default ActiveCampaignProvider;
