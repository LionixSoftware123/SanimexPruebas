import React from 'react';
import Image from 'next/image';
import Banner from '@/images/banner.png';

const BannerOne: React.FC = () => {
  return (
    <div className="relative w-full h-[636px] my-10">
      <Image
        src={Banner}
        alt={'logo sanimex'}
        fill
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default BannerOne;
