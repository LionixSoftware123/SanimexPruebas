import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import { useEvent } from '@cobuildlab/react-simple-state';

type LayoutProps = {
  children: ReactNode;
};

const RootFooter = dynamic(() => import('@/components/layouts/RootFooter'));
const RootHeader = dynamic(() => import('@/components/layouts/RootHeader'));
const WhatsappModal = dynamic(() => import('@/components/utils/WhatsappModal'));

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  const { topBanner } = useEvent(renderTopBannerEvent);
  const isActive = topBanner && topBanner?.active === 'true';

  return (
    <div>
      <RootHeader />
      <div
        className="min-h-screen overflow-hidden"
        style={{ marginTop: isActive ? 130 : 10 }}
      >
        {children}
      </div>
      <WhatsappModal dialog={true} />
      <RootFooter />
    </div>
  );
};

export default RootLayout;
