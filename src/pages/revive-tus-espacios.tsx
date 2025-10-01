import dynamic from 'next/dynamic';
import React from 'react';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));

const ReviveYourSpaces: React.FC = () => {
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Revive tus espacios'}
        description={'Revive tus espacios'}
        asPath={router.asPath}
        image="/src/images/logo-gam.svg"
      />

      <Container classes="my-8 flex items-center justify-center h-[1000px] ">
        <div className="text-center">
          <h2 className="text-xl font-bold">Revive tus espacios</h2>
        </div>
      </Container>
    </RootLayout>
  );
};

export default ReviveYourSpaces;
