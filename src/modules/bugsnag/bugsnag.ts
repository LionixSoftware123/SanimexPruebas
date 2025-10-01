import Bugsnag from '@bugsnag/js';
import { BUGSNAG_API_KEY } from '@/utils/constants';

export const bugsnagStart = () => {
  Bugsnag.start({
    apiKey: BUGSNAG_API_KEY,
    plugins: [],
    autoTrackSessions: false,
    releaseStage: 'production',
  });
};
