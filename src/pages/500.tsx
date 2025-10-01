import dynamic from 'next/dynamic';
import React from 'react';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const Layout = dynamic(() => import('@/components/layouts/RootLayout'));
const ErrorFivePage = dynamic(() => import('@/components/error/ErrorFive'));

const Errorfive: React.FC = () => {
  const router = useRouter();
  return (
    <Layout>
      <StaticMeta
        title={'Error 500'}
        description={'Error 500'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <ErrorFivePage />
    </Layout>
  );
};

export default Errorfive;
