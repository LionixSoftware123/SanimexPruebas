import React from 'react';
import Link from 'next/link';
import FiltersPanel from '@/components/product/components/filters/FiltersPanel';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { ProductFilterCustom } from '@/modules/product/product-types';
import { XMarkIcon } from '@heroicons/react/20/solid';

type SidebarProps = {
  mobileFilter: boolean;
  setMobileFilter: (value: boolean) => void;
  filter: ProductFilterCustom;
  setFilter: (filter: ProductFilterCustom) => void;
  setPage: (page: number) => void;
  FetchWpProducts: (params: ProductFilterCustom) => void;
  CATEGORIES: string[];
  allTipologias: any[];
  allMedidas: any[];
  handleFilterTipologia: (value: string[]) => void;
  handleFilterMedidas: (value: string[]) => void;
  internalBanner?: {
    redirectUrl: string;
    sourceUrl: string;
  };
};

const Sidebar: React.FC<SidebarProps> = ({
  mobileFilter,
  setMobileFilter,
  filter,
  setFilter,
  setPage,
  FetchWpProducts,
  CATEGORIES,
  allTipologias,
  allMedidas,
  handleFilterTipologia,
  handleFilterMedidas,
  internalBanner,
}) => {
  return (
    <div>
      {mobileFilter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setMobileFilter(false)}
        ></div>
      )}
      <div
        className={`${
          mobileFilter
            ? 'w-[310px] pt-[150px] overflow-y-auto z-20 bg-white left-[-4px] top-0 pb-4 pl-4 pr-8 lg:pt-[150px] h-screen fixed'
            : 'hidden'
        } lg:block lg:static`}
      >
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-lg font-bold">Filtrar</h2>
          <button
            className="text-lg font-bold block lg:hidden"
            onClick={() => setMobileFilter(false)}
          >
            <XMarkIcon className="h-6 w-6 text-black " />
          </button>
        </div>
        <FiltersPanel
          filter={filter}
          setFilter={setFilter}
          setPage={setPage}
          FetchWpProducts={FetchWpProducts}
          CATEGORIES={CATEGORIES}
          allTipologias={allTipologias}
          allMedidas={allMedidas}
          handleFilterTipologia={handleFilterTipologia}
          handleFilterMedidas={handleFilterMedidas}
        />
        {internalBanner?.redirectUrl && internalBanner?.sourceUrl ? (
          <div className="mb-6">
            <Link href={internalBanner?.redirectUrl as string}>
              <div className="w-full h-[100px] md:h-[250px] relative hidden">
                <ImageWithFallback
                  src={internalBanner?.sourceUrl as string}
                  alt="horizontal 1 banner"
                  fill
                  style={{ objectFit: 'contain', background: 'white' }}
                />
              </div>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
