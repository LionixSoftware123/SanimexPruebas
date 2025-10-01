import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import ProductHeader from '@/components/layouts/ProductHeader';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import { useEvent } from '@cobuildlab/react-simple-state';

type LayoutProps = {
  children: ReactNode;
};

const RootFooter = dynamic(() => import('@/components/layouts/RootFooter'));
const WhatsappModal = dynamic(() => import('@/components/utils/WhatsappModal'));

const ProductLayout: React.FC<LayoutProps> = ({ children }) => {
  const { topBanner } = useEvent(renderTopBannerEvent);
  const isActive = topBanner && topBanner?.active === 'true';

  return (
    <div>
      <ProductHeader />
      <div
        className="min-h-screen overflow-hidden"
        style={{ marginTop: isActive ? 170 : 130 }}
      >
        {children}
      </div>
      <WhatsappModal dialog={true} />
      <RootFooter />
    </div>
  );
};

export default ProductLayout;
