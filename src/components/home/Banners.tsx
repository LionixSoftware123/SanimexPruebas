import React from 'react';
import Image from 'next/image';
import Wall from '@/images/wall.png';
import Bathroom from '@/images/bathroom.svg';
import Kitchen from '@/images/icon-cocina.svg';
import Material from '@/images/material.svg';
import dynamic from 'next/dynamic';
import { Banner } from '@/utils/types/generated';

import Link from 'next/link';
const SliderLazy = dynamic(() => import('@/components/slider/Slider1'));
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
type BannersProps = {
  banners?: Banner[];
};

const Banners: React.FC<BannersProps> = ({ banners = [] }) => {
  const items: React.ReactNode[] = banners
    ?.filter((item) => item.type === 'SliderDesktop')
    .map((banner) => (
      <div key={banner.id}>
        <Link href={banner.redirect as string}>
          <div className="relative w-full mx-auto h-[600px] sm:h-[640px]">
            <ImageWithFallback
              src={banner.url as string}
              alt={'image'}
              fill
              style={{
                objectFit: 'cover',
              }}
              priority
              loading={'eager'}
              decoding="async"
            />
          </div>
        </Link>
      </div>
    ));
  const itemsMobile: React.ReactNode[] = banners
    ?.filter((item) => item.type === 'SliderMobile')
    .map((banner) => (
      <div key={banner.id}>
        <Link href={banner.redirect as string}>
          <div className="relative w-full mx-auto h-[600px] sm:h-[640px]">
            <ImageWithFallback
              src={banner.url as string}
              alt={'image'}
              fill
              style={{
                objectFit: 'cover',
              }}
              priority
              loading={'eager'}
              decoding="async"
            />
          </div>
        </Link>
      </div>
    ));

  return (
    <div className="relative w-full bg-gray h-[600px] sm:h-[640px]">
      <div className="hidden sm:block ">
        <SliderLazy key={1} items={items} controls infinite />
      </div>
      <div className="sm:hidden">
        <SliderLazy key={2} items={itemsMobile} controls infinite />
      </div>
      <div className="hidden lg:block w-full">
        <div className="absolute flex flex-wrap bottom-0 mb-6 w-full justify-center">
          <div className="option-item mr-3 mb-4 lg:mb-2">
            <div className="content flex items-center justify-center h-full">
              <Link
                href={'/productos/pisos-y-muros'}
                className="flex items-center justify-center h-full"
              >
                <Image
                  src={Wall}
                  alt={'wall'}
                  width={40}
                  height={40}
                  loading="lazy"
                />
                <span className="text-[20px] ml-[10px] font-Century-Gothic-Bold">
                  Pisos y Muros
                </span>
              </Link>
            </div>
          </div>
          <div className="option-item mr-3 mb-4 lg:mb-2">
            <div className="content flex items-center justify-center h-full">
              <Link
                href={'/productos/banos'}
                className="flex items-center justify-center h-full"
              >
                <div className="w-[36px] h-[48px]">
                  <Bathroom />
                </div>
                <span className="text-[20px] ml-[10px] font-Century-Gothic-Bold">
                  Baños
                </span>
              </Link>
            </div>
          </div>
          <div className="option-item mr-3 mb-4 lg:mb-2">
            <div className="content flex items-center justify-center h-full">
              <Link
                href={'/productos/cocina'}
                className="flex items-center justify-center h-full"
              >
                <div className="w-[47px] h-[48px]">
                  <Kitchen />
                </div>
                <span className="text-[20px] ml-[10px] font-Century-Gothic-Bold">
                  Cocina
                </span>
              </Link>
            </div>
          </div>
          <div className="option-item mr-3 mb-4 lg:mb-2">
            <div className="content flex items-center justify-center h-full pl-[40px]">
              <Link
                href={'/productos/material-de-instalacion'}
                className="flex items-center justify-center h-full"
              >
                <div className="w-[60px] h-[38px] flex self-center">
                  <Material />
                </div>
                <span className="text-[20px] ml-[10px] font-Century-Gothic-Bold">
                  Material de Instalación
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden w-full">
        <div className="absolute flex flex-wrap bottom-0 mb-6 w-full justify-center">
          <div className="option-item1 mr-2 mb-2">
            <div className="content flex items-center justify-center h-full">
              <Link
                href={'/productos/pisos-y-muros'}
                className="flex items-center justify-center h-full"
              >
                <Image
                  src={Wall}
                  alt={'wall'}
                  width={24}
                  height={24}
                  loading="lazy"
                />
                <span className="text-[11px] ml-[10px] font-Century-Gothic-Bold">
                  Pisos y Muros
                </span>
              </Link>
            </div>
          </div>
          <div className="option-item1 mr-2 mb-2">
            <div className="content flex items-center mr-4 justify-center h-full">
              <Link
                href={'/productos/banos'}
                className="flex items-center justify-center h-full"
              >
                <div className="w-[20px] h-[28px]">
                  <Bathroom />
                </div>
                <span className="text-[11px] ml-[10px] font-Century-Gothic-Bold">
                  Baños
                </span>
              </Link>
            </div>
          </div>
          <div className="option-item1 mr-2 mb-2">
            <div className="content flex items-center justify-center h-full">
              <Link
                href={'/productos/cocina'}
                className="flex items-center justify-center h-full"
              >
                <div className="w-[27px] h-[28px]">
                  <Kitchen />
                </div>
                <span className="text-[11px] ml-[10px] font-Century-Gothic-Bold">
                  Cocina
                </span>
              </Link>
            </div>
          </div>
          <div className="option-item1 mr-2 mb-2">
            <div className="content flex items-center h-full pl-[20px]">
              <Link
                href={'/productos/material-de-instalacion'}
                className="flex items-center justify-center h-full"
              >
                <div className="w-[36px] h-[24px] flex self-center">
                  <Material />
                </div>
                <span className="text-[11px] ml-[10px] font-Century-Gothic-Bold">
                  Material de Instalación
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
