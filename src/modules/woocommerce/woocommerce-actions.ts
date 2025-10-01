import {
  AddToCartMutation,
  AddToCartMutationVariables,
  AddToCartDocument,
} from '@/utils/types/generated';
import { createApolloClient } from '@/apollo/client';

export const addToCart = async (variables: AddToCartMutationVariables) => {
  const client = createApolloClient();
  const response = await client.mutate<AddToCartMutation>({
    mutation: AddToCartDocument,
    variables,
  });
  return response.data;
};
