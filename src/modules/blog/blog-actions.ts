import { createApolloClient } from '@/apollo/client';
import { FRONTEND_ENDPOINT } from '@/utils/constants';
import {
  FetchPostsDocument,
  FetchPostsQueryVariables,
  Post,
  FetchPostsQuery,
  FetchPostQueryVariables,
  FetchPostQuery,
} from '@/utils/types/generated';
import axios, { AxiosResponse } from 'axios';

export const fetchPosts = async (
  variables: FetchPostsQueryVariables,
): Promise<{ posts: Post[]; total: number }> => {
  const client = createApolloClient();
  const response = await client.query<FetchPostsQuery>({
    variables,
    query: FetchPostsDocument,
  });

  return {
    posts: response.data.posts?.nodes.map((node) => node) as Post[],
    total: response.data.posts?.pageInfo.offsetPagination?.total as number,
  };
};

export const fetchAxiosBlog = async (variables: FetchPostQueryVariables) => {
  const response: AxiosResponse<FetchPostQuery> = await axios.post(
    `${FRONTEND_ENDPOINT}/api/blogpreview`,
    { variables },
  );

  return response.data.post;
};
