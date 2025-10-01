import React from 'react';
import Banner3 from '@/images/banner-1.png';
import Banner2 from '@/images/banner-2.png';
import Banner1 from '@/images/banner-3.png';
import Image from 'next/image';

const items = [Banner1, Banner2, Banner3];
const BannerList: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item, key) => (
        <div className="relative w-full h-[145px]" key={key}>
          <Image fill style={{ objectFit: 'cover' }} src={item} alt={'blog'} />
        </div>
      ))}
    </div>
  );
};

export default BannerList;
