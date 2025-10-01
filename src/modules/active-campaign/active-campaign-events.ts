import { createEvent } from '@cobuildlab/react-simple-state';
import {
  ActiveCampaignCustomer,
  ActiveCampaignOrder,
} from '@/modules/active-campaign/active-campaign-types';

export const fetchActiveCampaignCustomerEvent = createEvent<
  ActiveCampaignCustomer[] | undefined
>({
  initialValue: [],
});

export const fetchActiveCampaignCustomerErrorEvent = createEvent<Error>();

export const fetchActiveCampaignOrderEvent = createEvent<
  ActiveCampaignOrder[] | undefined
>({
  initialValue: [],
});

export const fetchActiveCampaignOrderErrorEvent = createEvent<Error>();

export const createActiveCampaignUserOrderEvent = createEvent<
  ActiveCampaignOrder | undefined
>({
  initialValue: undefined,
});

export const createActiveCampaignUserOrderErrorEvent = createEvent<Error>();

export const updateActiveCampaignUserOrderEvent = createEvent<
  ActiveCampaignOrder | undefined
>({
  initialValue: undefined,
});

export const updateActiveCampaignUserOrderErrorEvent = createEvent<Error>();

export const fetchActiveCampaignUserOrderEvent = createEvent<{
  order: ActiveCampaignOrder | undefined;
}>({
  initialValue: {
    order: undefined,
  },
});

export const updateActiveCampaignContactEvent = createEvent<
  ActiveCampaignCustomer | undefined
>({
  initialValue: undefined,
});

export const updateActiveCampaignContactErrorEvent = createEvent<Error>();

export const updateActiveCampaignContactCompleteEvent = createEvent<
  ActiveCampaignCustomer | undefined
>({
  initialValue: undefined,
});

export const updateActiveCampaignContactCompleteErrorEvent =
  createEvent<Error>();
