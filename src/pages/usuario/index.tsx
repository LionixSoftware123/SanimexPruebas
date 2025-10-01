import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { createApolloClient } from '@/apollo/client';
import {
  FetchUserDocument,
  UserNodeIdTypeEnum,
  User,
} from '@/utils/types/generated';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const UserUpdate = dynamic(() => import('@/components/user/UserUpdate'));
const UserChangePassword = dynamic(
  () => import('@/components/user/UserChangePassword'),
);
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const LayoutUser = dynamic(() => import('@/components/layouts/LayoutUser'));

type UserDataProps = {
  user?: User;
};
const UserData: React.FC<UserDataProps> = ({ user }) => {
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={user?.name as string}
        description={user?.name as string}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <LayoutUser>
        <div className="flex flex-col gap-4">
          <UserUpdate user={user} />
          <UserChangePassword user={user} />
        </div>
      </LayoutUser>
    </RootLayout>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  if (req.cookies && !req.cookies.jwtAuthToken) {
    return {
      redirect: {
        destination: `/auth`,
        permanent: false,
      },
      props: {},
    };
  }

  const client = createApolloClient(
    req.cookies.wooSessionToken,
    req.cookies.jwtAuthToken,
  );

  const decodeToken = jwtDecode<{
    data: { user: { id: string } };
    exp?: number;
  }>(req.cookies.jwtAuthToken as string);

  const user = await client.query({
    query: FetchUserDocument,
    variables: {
      id: decodeToken.data.user.id,
      idType: UserNodeIdTypeEnum.DatabaseId,
    },
  });

  return {
    props: {
      user: user.data.user,
    },
  };
};

export default UserData;
