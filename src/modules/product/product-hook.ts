import { useEffect, useState } from 'react';
import {
  ProductCustom,
  ProductFilterCustom,
  TaxonomyFilter,
} from '@/modules/product/product-types';
import axios from 'axios';

type WpProducts = { products: ProductCustom[]; total: number };

type UseWpProducts = [
  (params: ProductFilterCustom) => void,
  {
    loading?: boolean;
    data?: WpProducts;
  },
];
export const useWpProducts = (values: {
  variables?: ProductFilterCustom;
  onCompleted?: (data: WpProducts) => void;
  onError?: (error: Error) => void;
}): UseWpProducts => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WpProducts>({
    products: [],
    total: 0,
  });
  const callAction = async (params?: ProductFilterCustom) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/woo-products', {
        params: params || values.variables,
      });
      setData(response.data);
      values?.onCompleted && values?.onCompleted(response.data);
    } catch (e) {
      return values?.onError && values?.onError(e as Error);
    }
    setLoading(false);
  };

  return [callAction, { data, loading }];
};

export const useWpTaxonomyFilter = (
  _taxonomyField: string,
  _taxonomyCategories = '',
  _onSale: boolean,
  _onTotalSales: boolean,
  _search: string,
) => {
  const [taxonomy, setTaxonomy] = useState<TaxonomyFilter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const callback = async (
      taxonomyField: string,
      taxonomyCategories: string,
      onSale: boolean,
      onTotalSales: boolean,
      search: string,
    ) => {
      try {
        const response = await axios.get('/api/woo-taxonomy-filter', {
          params: {
            taxonomy_field: taxonomyField,
            taxonomy_category: taxonomyCategories,
            on_sale: onSale,
            on_total_sales: onTotalSales,
            search,
          },
        });
        setTaxonomy(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    callback(
      _taxonomyField,
      _taxonomyCategories,
      _onSale,
      _onTotalSales,
      _search,
    );
  }, [_onSale, _onTotalSales, _taxonomyCategories, _taxonomyField, _search]);

  return { taxonomy, loading };
};
