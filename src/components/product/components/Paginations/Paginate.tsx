import React from 'react';
import Paginate from '@/components/utils/Paginate';
import { ProductFilterCustom } from '@/modules/product/product-types';

type PaginationProps = {
  initialPage: number;
  page: number;
  pageCount: number;
  filter: ProductFilterCustom;
  setPage: (page: number) => void;
  setFilter: (filter: ProductFilterCustom) => void;
  FetchWpProducts: (params: ProductFilterCustom) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  initialPage,
  page,
  pageCount,
  filter,
  setPage,
  setFilter,
  FetchWpProducts,
}) => {
  const handlePageChange = (data: { selected: number }) => {
    const params = {
      ...filter,
      page: data.selected + 1,
    };
    setPage(data.selected);
    setFilter(params);
    FetchWpProducts(params);
  };

  return (
    <div className="flex justify-center">
      <Paginate
        initialPage={initialPage}
        page={page}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Pagination;
