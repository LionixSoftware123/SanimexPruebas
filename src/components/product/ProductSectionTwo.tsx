import React from 'react';
import dynamic from 'next/dynamic';
import Slider from '@/components/slider/Slider';
import { ProductCustom } from '@/modules/product/product-types';

const ProductComplement = dynamic(
  () => import('@/components/product/ProductCustomFive'),
);

type ProductSectionTwoProps = {
  title?: string;
  showColors?: boolean;
  products?: ProductCustom[];
};
const ProductSectionTwo: React.FC<ProductSectionTwoProps> = ({
  title = '',
  showColors = true,
  products,
}) => {
  const items: React.ReactNode[] | undefined = products
    ? products.map((product, i) => (
        <ProductComplement showColors={showColors} key={i} product={product} />
      ))
    : [];

  return items && items?.length ? (
    <>
      <div className="text-[#333E48] text-[30px] font-Century-Gothic-Bold mb-4">
        {title}
      </div>
      <div className="min-h-[380px] col-span-full">
        <Slider items={items} controls onlyOne={false} />
      </div>
    </>
  ) : null;
};

export default ProductSectionTwo;
