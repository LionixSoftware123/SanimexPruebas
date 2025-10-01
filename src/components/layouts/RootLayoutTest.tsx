import React, { ReactNode } from 'react';
// import dynamic from 'next/dynamic';
// import { useEvent } from '@cobuildlab/react-simple-state';
// import { renderTopBannerEvent } from '@/modules/banner/banner-events';

type LayoutProps = {
  children: ReactNode;
};

// const RootFooter = dynamic(() => import('@/components/layouts/RootFooter'));
// const RootHeader = dynamic(() => import('@/components/layouts/RootHeader'));
// const WhatsappModal = dynamic(() => import('@/components/utils/WhatsappModal'));
// const BannerRegisterNow = dynamic(
//   () => import('@/components/utils/BannerRegisterNow'),
// );
const RootLayoutTest: React.FC<LayoutProps> = ({ children }) => {
  // const { isRendered } = useEvent(renderTopBannerEvent);

  return (
    <div>
      {/* <RootHeader /> */}
      <div className="min-h-screen overflow-hidden" style={{ marginTop: 0 }}>
        {children}
      </div>
      {/* <BannerRegisterNow /> */}
      {/* <WhatsappModal dialog={true} /> */}
      {/* <RootFooter /> */}
    </div>
  );
};

export default RootLayoutTest;
