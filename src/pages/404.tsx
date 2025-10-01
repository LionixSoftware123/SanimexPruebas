import dynamic from 'next/dynamic';
import React from 'react';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const Layout = dynamic(() => import('@/components/layouts/RootLayout'));
const ErrorPage = dynamic(() => import('@/components/error/Error'));

const Error: React.FC = () => {
  const router = useRouter();
  return (
    <Layout>
      <StaticMeta
        title={'Error 404'}
        description={'Error 404'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <ErrorPage />
    </Layout>
  );
};

export default Error;
