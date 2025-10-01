import React from 'react';
import NavSecondBanner from './components/NavSecondBanner';
import PrincipalHeader from '@/components/layouts/PrincipalHeader';

const RootHeader = () => {
  return (
    <div className="fixed w-full top-0 z-50 font-Century-Gothic bg-white">
      <NavSecondBanner />
      <PrincipalHeader />
    </div>
  );
};

export default RootHeader;
