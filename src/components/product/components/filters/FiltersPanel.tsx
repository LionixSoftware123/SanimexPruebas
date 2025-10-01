import React from 'react';
import BrandsFilter from '@/components/product/components/filters/BrandsFilter';
import PromotionFilter from '@/components/product/components/filters/PromotionFilter';
import AttributeSelect from '@/components/product/AttributeSelect';
import ColorFilter from '@/components/product/components/filters/ColorFilter';
import { ProductFilterCustom } from '@/modules/product/product-types';

type FiltersPanelProps = {
  filter: ProductFilterCustom;
  setFilter: (filter: ProductFilterCustom) => void;
  setPage: (page: number) => void;
  FetchWpProducts: (params: ProductFilterCustom) => void;
  CATEGORIES: string[];
  allTipologias: any[];
  allMedidas: any[];
  handleFilterTipologia: (value: string[]) => void;
  handleFilterMedidas: (value: string[]) => void;
};

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filter,
  setFilter,
  setPage,
  FetchWpProducts,
  CATEGORIES,
  allTipologias,
  allMedidas,
  handleFilterTipologia,
  handleFilterMedidas,
}) => {
  return (
    <div>
      <div className="mb-6">
        <BrandsFilter
          filter={filter}
          setFilter={setFilter}
          setPage={setPage}
          FetchWpProducts={FetchWpProducts}
          CATEGORIES={CATEGORIES}
        />
      </div>
      <div className="mb-6">
        <PromotionFilter
          filter={filter}
          setFilter={setFilter}
          setPage={setPage}
          FetchWpProducts={FetchWpProducts}
        />
      </div>
      {allTipologias && allTipologias.length > 0 && (
        <div className="mb-6">
          <AttributeSelect
            onFilter={handleFilterTipologia}
            attributes={allTipologias}
            title="Diseño"
          />
        </div>
      )}
      {allMedidas && allMedidas.length > 0 && (
        <div className="mb-6">
          <AttributeSelect
            onFilter={handleFilterMedidas}
            attributes={allMedidas}
            title="Formato"
          />
        </div>
      )}
      <div className="mb-6">
        <ColorFilter
          filter={filter}
          setFilter={setFilter}
          setPage={setPage}
          FetchWpProducts={FetchWpProducts}
          CATEGORIES={CATEGORIES}
        />
      </div>
    </div>
  );
};

export default FiltersPanel;
