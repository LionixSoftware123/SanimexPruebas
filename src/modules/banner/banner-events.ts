import { createEvent } from '@cobuildlab/react-simple-state';
import { TopBannerResponse } from '@/utils/types/generated';
import { FRONTEND_ENDPOINT } from '@/utils/constants';
import defaultBanner from '../../../public/internalbanner.json';

const fetchBannerData = async (): Promise<TopBannerResponse | undefined> => {
  try {
    const response = await fetch(`${FRONTEND_ENDPOINT}/api/get-banner`);
    const data = await response.json();
    return data;
  } catch (error) {
    return undefined;
  }
};

export const renderTopBannerEvent = createEvent<{
  topBanner: TopBannerResponse | undefined;
}>({
  initialValue: { topBanner: defaultBanner },
});

fetchBannerData().then((data) => {
  if (data) {
    renderTopBannerEvent.dispatch({ topBanner: data });
  }
});
