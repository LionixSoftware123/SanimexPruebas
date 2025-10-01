import React from 'react';
import dynamic from 'next/dynamic';
import Slider from '@/components/slider/Slider';
import { ProductCustom } from '@/modules/product/product-types';

const ProductRelated = dynamic(
  () => import('@/components/product/ProductCustomThree'),
);

type ProductSectionOneProps = {
  title?: string;
  products?: ProductCustom[];
};
const ProductSectionOne: React.FC<ProductSectionOneProps> = ({
  title = '',
  products,
}) => {
  const items: React.ReactNode[] =
    products && products.length
      ? products.map((product, i) => (
          <ProductRelated key={i} product={product} />
        ))
      : [];

  return items.length ? (
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

export default ProductSectionOne;
