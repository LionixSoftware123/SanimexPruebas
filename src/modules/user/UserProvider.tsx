import React, { ReactNode, useEffect, useState } from 'react';
import {
  useFetchUserLazyQuery,
  User,
  UserNodeIdTypeEnum,
} from '@/utils/types/generated';
import { useEvent } from '@cobuildlab/react-simple-state';
import { fetchUserEvent, OnTokenEvent } from '@/modules/auth/auth-events';
import { Provider, UserContextType } from '@/modules/user/UserContext';
import jwtDecode from 'jwt-decode';

type UserProviderProps = {
  children?: ReactNode;
};

const INITIAL_VALUES = {
  isLoading: false,
  user: undefined,
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, setState] = useState<UserContextType>(INITIAL_VALUES);
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);
  const { token } = useEvent(OnTokenEvent);

  const [fetchUser] = useFetchUserLazyQuery({
    onCompleted: (data) => {
      fetchUserEvent.dispatch({ user: data.user as User });
      setState({ user: data.user as User, isLoading: false });
      setFavoriteProducts(
        data.user ? (data.user.favoriteProducts as number[]) : [],
      );
    },
    onError: () => setState({ user: undefined, isLoading: false }),
  });

  useEffect(() => {
    if (token) {
      const decodeToken = jwtDecode<{
        data: { user: { id: string } };
        exp?: number;
      }>(token as string);
      setState({ user: undefined, isLoading: true });
      fetchUser({
        variables: {
          id: decodeToken.data.user.id,
          idType: UserNodeIdTypeEnum.DatabaseId,
        },
      });
    }
  }, [fetchUser, token]);

  const dispatch = (event: UserContextType): void => {
    setState(event);
  };

  const dispatchFavoriteProducts = (favorites: number[]): void => {
    setFavoriteProducts(favorites);
  };

  const values = {
    state,
    dispatch,
    favoriteProducts,
    dispatchFavoriteProducts,
  };

  return <Provider value={values}>{children}</Provider>;
};

export default UserProvider;
