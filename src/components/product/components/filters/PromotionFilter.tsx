import React from 'react';
import ProductPromotionCollapseList from '@/components/product/components/ProductPromotionCollapseList';
import { ProductFilterCustom } from '@/modules/product/product-types';

type PromotionFilterProps = {
  filter: ProductFilterCustom;
  setFilter: (filter: ProductFilterCustom) => void;
  setPage: (page: number) => void;
  FetchWpProducts: (params: ProductFilterCustom) => void;
};

const PromotionFilter: React.FC<PromotionFilterProps> = ({
  filter,
  setFilter,
  setPage,
  FetchWpProducts,
}) => {
  const handleFilter = (value: any) => {
    const params = {
      ...filter,
      on_sale: value?.value,
      page: 1,
    };
    setFilter(params);
    setPage(0); // Reinicia la página a la primera página
    FetchWpProducts(params);
  };

  return (
    <div className="mb-6">
      <ProductPromotionCollapseList onFilter={handleFilter} />
    </div>
  );
};

export default PromotionFilter;
