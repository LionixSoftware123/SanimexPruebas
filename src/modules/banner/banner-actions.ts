import { createApolloClient } from '@/apollo/client';
import {
  FetchBannersDocument,
  FetchInternalDocument,
  FetchBannersQuery,
  FetchBannersHomeQuery,
  FetchInternalQuery,
  FetchBannersHomeDocument,
  BannerHomeType,
  BannerHome,
} from '@/utils/types/generated';

export const fetchSliderHome = async () => {
  const client = createApolloClient();
  const response = await client.query<FetchBannersQuery>({
    query: FetchBannersDocument,
  });
  return response.data.banners?.items;
};

export const fetchInternalBanner = async () => {
  const client = createApolloClient();
  const response = await client.query<FetchInternalQuery>({
    query: FetchInternalDocument,
  });
  return response.data.internalBanner;
};

export const fetchBannersHome = async () => {
  const client = createApolloClient();
  const response = await client.query<FetchBannersHomeQuery>({
    query: FetchBannersHomeDocument,
  });
  return response.data.bannersHome?.items;
};

export const getBannerByType = (
  banners: BannerHome[] = [],
  type: BannerHomeType,
) => {
  return banners.find((banner) => banner.type === type);
};
