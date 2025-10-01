import { createAction } from '@cobuildlab/react-simple-state';
import {
  registerAnniversaryUserErrorEvent,
  registerAnniversaryUserEvent,
} from '@/modules/anniversary/anniversary-events';
import { clientUpload } from '@/apollo/client';
import {
  RegisterAnniversaryUserMutation,
  RegisterAnniversaryUserMutationVariables,
  RegisterAnniversaryUserDocument,
} from '@/utils/types/generated';

export const registerAnniversaryUser = createAction(
  registerAnniversaryUserEvent,
  registerAnniversaryUserErrorEvent,
  async (variables: RegisterAnniversaryUserMutationVariables) => {
    const response = await clientUpload.mutate<
      RegisterAnniversaryUserMutation,
      RegisterAnniversaryUserMutationVariables
    >({
      variables,
      mutation: RegisterAnniversaryUserDocument,
    });

    return response.data;
  },
);
