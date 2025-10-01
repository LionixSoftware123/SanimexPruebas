import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { ProductCustom } from '@/modules/product/product-types';

const ProductCustomOne = dynamic(
  () => import('@/components/product/ProductCustomOne'),
);
const Slider = dynamic(() => import('@/components/slider/Slider'));
const BestSellerMenuItem = dynamic(
  () => import('@/components/home/components/BestSellerMenuItem'),
);

type BestSellersProps = {
  productsInPromoPisos?: ProductCustom[];
  productsInPromoSanitarios?: ProductCustom[];
  productsInPromoGriferia?: ProductCustom[];
  productsInPromoAdhesivos?: ProductCustom[];
  productsInPromoCalentadores?: ProductCustom[];
};
const BestSellers: React.FC<BestSellersProps> = ({
  productsInPromoPisos = [],
  productsInPromoSanitarios = [],
  productsInPromoGriferia = [],
  productsInPromoAdhesivos = [],
  productsInPromoCalentadores = [],
}) => {
  const [selected, setSelected] = useState<string>('');
  const [_products, _setProducts] =
    useState<ProductCustom[]>(productsInPromoPisos);

  const menus_new = [
    {
      label: 'Pisos y Muros',
      products: productsInPromoPisos,
      value: '',
    },
    {
      label: 'Sanitarios',
      products: productsInPromoSanitarios,
      value: 'sanitarios-sanitarios',
    },
    {
      label: 'Grifería',
      products: productsInPromoGriferia,
      value: 'griferia',
    },
    {
      label: 'Adhesivos',
      products: productsInPromoAdhesivos,
      value: 'adhesivos',
    },
    {
      label: 'Calentadores',
      products: productsInPromoCalentadores,
      value: 'calentadores',
    },
  ];

  const items: React.ReactNode[] = _products?.map((product, i) => (
    <ProductCustomOne product={product} key={i} isPromo={true} />
  ));

  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-[1200px]">
        <div className="flex justify-between mb-4 items-center">
          <div className="text-[20px] md:text-[30px] font-Century-Gothic-Bold">
            Promociones especiales
          </div>
          <div className="w-1/2 sm:w-2/3 overflow-x-auto py-8">
            <div className="flex justify-between  w-[800px] lg:w-full">
              {menus_new.map((menu, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelected(menu.value);
                    _setProducts(menu.products);
                  }}
                >
                  <BestSellerMenuItem
                    name={menu.label}
                    active={menu.value === selected}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[380px]">
          {_products.length ? (
            <div>
              <Slider items={items} controls onlyOne={false} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              No hay promociones disponibles para esta categoría
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
