import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import NavSecondBanner from './components/NavSecondBanner';
import { generateBreadcrumbItems } from '@/utils/utils';
import PrincipalHeader from '@/components/layouts/PrincipalHeader';

const Breadcrumb = dynamic(() => import('@/components/utils/Breadcrumb'));

const ProductHeader = () => {
  const router = useRouter();
  const breadcrumbItems = generateBreadcrumbItems(
    router.pathname,
    router.query,
  );

  return (
    <div className="fixed w-full top-0 z-50 font-Century-Gothic bg-white">
      <NavSecondBanner />
      <PrincipalHeader />
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default ProductHeader;
