import {
  createAction,
  createStoreAction,
} from '@cobuildlab/react-simple-state';
import {
  authStepStore,
  fetchGoogleUserErrorEvent,
  fetchGoogleUserEvent,
} from '@/modules/auth/auth-events';
import axios, { AxiosResponse } from 'axios';
import {
  FetchUserQueryVariables,
  FetchUserQuery,
} from '@/utils/types/generated';
import { AuthStep } from './auth-types';

export const fetchUserGoogle = createAction(
  fetchGoogleUserEvent,
  fetchGoogleUserErrorEvent,
  async (token) => {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token.access_token}`,
          Accept: 'application/json',
        },
      },
    );

    return response.data;
  },
);

export const fetchUser = async (variables: FetchUserQueryVariables) => {
  const response: AxiosResponse<FetchUserQuery> = await axios.post(
    '/api/woo-get-user',
    { variables },
  );
  return response.data;
};

export const authStepAction = createStoreAction(
  authStepStore,
  (prev, step: AuthStep) => ({ ...prev, step }),
);
