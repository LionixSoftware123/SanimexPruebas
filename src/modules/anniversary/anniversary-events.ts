import { createEvent } from '@cobuildlab/react-simple-state';
import { RegisterAnniversaryUserMutation } from '@/utils/types/generated';

export const registerAnniversaryUserEvent = createEvent<
  RegisterAnniversaryUserMutation | undefined | null
>({
  initialValue: undefined,
});

export const registerAnniversaryUserErrorEvent = createEvent();
