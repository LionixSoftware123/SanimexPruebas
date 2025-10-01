import React from 'react';
import LoadingLine from '@/components/utils/LoadingLine';
import DropdownFilter from '@/components/product/components/DropdownFilter';
import Filter from '@/images/filter.svg';
import ProductsLoading from '@/components/product/components/ProductsLoading';
import {
  ProductCustom,
  ProductFilterCustom,
  ProductOrderEnum,
} from '@/modules/product/product-types';

type ProductGridProps = {
  isLoadingTotal: boolean;
  total: number;
  newTotal: number;
  filteredProducts: ProductCustom[];
  products: ProductCustom[];
  filter: ProductFilterCustom;
  setFilter: (filter: ProductFilterCustom) => void;
  setMobileFilter: (value: boolean) => void;
  FetchWpProducts: (params: ProductFilterCustom) => void;
  renderProducts: (products: ProductCustom[]) => React.ReactNode;
  loading: boolean;
};

const ProductGrid: React.FC<ProductGridProps> = ({
  isLoadingTotal,
  total,
  newTotal,
  filteredProducts,
  products,
  filter,
  setFilter,
  setMobileFilter,
  FetchWpProducts,
  renderProducts,
  loading,
}) => {
  const getProductCount = (
    filteredProducts: ProductCustom[],
    total: number,
  ) => {
    return filteredProducts.length !== 15 && filteredProducts.length > 0
      ? filteredProducts.length
      : total;
  };

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-[20px]">
      <div className="col-span-full lg:col-span-3">
        <div className="lg:flex justify-start lg:flex-row lg:justify-between relative mb-6 items-center ">
          <div className="mb-4 lg:mb-0 text-[25px] text-[#333E48] font-Century-Gothic-Bold">
            {isLoadingTotal ? (
              <LoadingLine wClass="ml-4 w-[200px] animate-pulse h-[27px]" />
            ) : (
              <span>
                {total !== 0
                  ? `${getProductCount(
                      filteredProducts,
                      total,
                    )} Productos encontrados`
                  : `${newTotal} Productos encontrados`}
              </span>
            )}
          </div>

          <div className="flex w-full lg:w-1/2 justify-between items-center">
            <div className="  flex flex-col lg:flex-row lg:absolute lg:right-0 z-10">
              <span className="flex lg:self-center text-[12px] text-[#555555] pr-3">
                Ordenar por:
              </span>
              <DropdownFilter
                onChange={(option) => {
                  const params = {
                    ...filter,
                    order_field: option.field,
                    order: option.value as ProductOrderEnum,
                  };
                  FetchWpProducts(params);
                  return setFilter(params);
                }}
              />
            </div>
            <button
              onClick={() => {
                setMobileFilter(true);
              }}
              className="lg:hidden font-Century-Gothic flex text-[12px] text-[#0071CE]"
            >
              <div>Buscar por filtro</div>
              <div className="w-[20px] h-[20px] ml-2">
                <Filter />
              </div>
            </button>
          </div>
        </div>
      </div>

      {!loading ? (
        <>
          {filteredProducts && filteredProducts.length > 0
            ? renderProducts(filteredProducts)
            : renderProducts(products)}
        </>
      ) : (
        <div className="col-span-full">
          <ProductsLoading />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
