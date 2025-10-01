// src/store/useStoreLocation.ts
import { LocationType } from '@/utils/utils';
import { createStore, createStoreAction } from '@cobuildlab/react-simple-state';

export const locationStore = createStore<{
  city?: LocationType;
  postalCode?: string;
}>({
  initialValue: {
    city: undefined,
    postalCode: undefined,
  },
});

export const setCity = createStoreAction(
  locationStore,
  (prev, city: LocationType) => ({
    ...prev,
    city,
  }),
);

export const setPostalCode = createStoreAction(
  locationStore,
  (prev, postalCode: string) => ({
    ...prev,
    postalCode,
  }),
);
