import React from 'react';
import Link from 'next/link';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';

const Banner = () => {
  const { topBanner } = useEvent(renderTopBannerEvent);

  if (topBanner?.active !== 'true') {
    return null;
  }

  return (
    <div className="flex flex-col">
      {topBanner && (
        <Link href={topBanner?.url || '#'}>
          <div
            className="py-2 flex justify-center items-center text-[12px]  h-[40px] lg:text-[20px] text-center"
            style={{ backgroundColor: topBanner?.color || 'white' }}
          >
            <p className="font-Montserrat text-white font-Montserrat font-[800]">
              {topBanner?.text}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Banner;
