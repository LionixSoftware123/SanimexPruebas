import { createEvent, createStore } from '@cobuildlab/react-simple-state';
import { User } from '@/utils/types/generated';
import { getStep } from './auth-utils';
import { AuthStep } from './auth-types';

export interface InitialStateType {
  token: null | string;
}

const INITIAL_STATE = {
  token: null,
};

export const OnTokenEvent = createEvent<InitialStateType>({
  initialValue: INITIAL_STATE,
});
export const OnTokenErrorEvent = createEvent<Error>();

export const OnWooSessionTokenEvent = createEvent<InitialStateType>({
  initialValue: INITIAL_STATE,
});

export const OnWooSessionTokenErrorEvent = createEvent<InitialStateType>({
  initialValue: INITIAL_STATE,
});

export const fetchGoogleUserEvent = createEvent();
export const fetchGoogleUserErrorEvent = createEvent();

export const fetchUserEvent = createEvent<{ user: User | undefined }>({
  initialValue: {
    user: undefined,
  },
});
export const authStepStore = createStore<{ step: AuthStep }>({
  initialValue: {
    step: getStep(),
  },
});
