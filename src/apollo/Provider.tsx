import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { FC, PropsWithChildren } from 'react';
import { createApolloClient } from '@/apollo/client';
// import { OnTokenEvent } from '@/modules/auth/auth-events';

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseApolloProvider client={createApolloClient()}>
      {children}
    </BaseApolloProvider>
  );
};
