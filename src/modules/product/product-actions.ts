import { createApolloClient } from '@/apollo/client';
import {
  ExternalProduct,
  FetchProductDocument,
  FetchProductQuery,
  FetchProductQueryVariables,
  Product,
  ProductIdTypeEnum,
  ProductsDocument,
  ProductsQuery,
  ProductsQueryVariables,
} from '@/utils/types/generated';
import axios, { AxiosResponse } from 'axios';
import {
  ProductCustom,
  ProductFilterCustom,
} from '@/modules/product/product-types';
import { FRONTEND_ENDPOINT, WP_ENDPOINT } from '@/utils/constants';
import {
  createAction,
  createStoreAction,
} from '@cobuildlab/react-simple-state';
import {
  fetchSimilarProductsErrorEvent,
  fetchSimilarProductsEvent,
  openNecessaryProductDialogStore,
} from '@/modules/product/product-events';
import {
  Product as ProductType,
  VariableProduct,
} from '@/utils/types/generated';

export const fetchProducts = async (
  variables: ProductsQueryVariables,
): Promise<{ products: Product[]; total: number }> => {
  const client = createApolloClient();
  const response = await client.query<ProductsQuery, ProductsQueryVariables>({
    variables,
    query: ProductsDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 180 },
      },
    },
  });

  return {
    products: response.data.products?.edges.map(
      (edge) => edge.node,
    ) as Product[],
    total: response.data.products?.pageInfo.offsetPagination?.total as number,
  };
};

export const fetchCategoryProducts = async (
  variables: ProductsQueryVariables,
): Promise<{ products: Product[]; total: number }> => {
  const client = createApolloClient();
  const response = await client.query<ProductsQuery>({
    variables,
    query: ProductsDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 180 },
      },
    },
  });

  return {
    products: response.data.products?.edges.map(
      (edge) => edge.node,
    ) as Product[],
    total: response.data.products?.pageInfo.offsetPagination?.total as number,
  };
};

export const fetchProductsInPromo = async (
  params: ProductFilterCustom,
): Promise<{ products: ProductCustom[] }> => {
  const response = await axios.get(
    `${WP_ENDPOINT}/wp-json/wp/v2/products-in-promo`,
    {
      auth: {
        username: 'webmaster',
        password: 'cualquierwebmaster1%',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    },
  );

  return response.data;
};

export const fetchProduct = async (variables: FetchProductQueryVariables) => {
  const client = createApolloClient();
  try {
    const response = await client.query<FetchProductQuery>({
      variables,
      query: FetchProductDocument,
    });
    return response.data.product as ExternalProduct;
  } catch (error) {
    return undefined;
  }
};

export const fetchAxiosProduct = async (
  variables: FetchProductQueryVariables,
) => {
  const response: AxiosResponse<FetchProductQuery> = await axios.post(
    `${FRONTEND_ENDPOINT}/api/productpreview`,
    { variables },
  );

  return response.data.product;
};

export const fetchWpProducts = async (
  params?: ProductFilterCustom,
): Promise<{ products: ProductCustom[]; total: number }> => {
  const response = await axios.get(`${WP_ENDPOINT}/wp-json/wp/v2/products`, {
    auth: {
      username: 'webmaster',
      password: 'cualquierwebmaster1%',
    },
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    params,
  });

  return response.data;
};

export const fetchSimilarProducts = createAction(
  fetchSimilarProductsEvent,
  fetchSimilarProductsErrorEvent,
  async (params: ProductFilterCustom) => {
    return await fetchWpProducts(params);
  },
);

export const openNecessaryProductDialogStoreAction = createStoreAction(
  openNecessaryProductDialogStore,
  (
    prev,
    product: ProductType,
    quantity: number,
    variationProduct: VariableProduct,
  ) => ({
    ...prev,
    product,
    quantity,
    variationProduct,
    isOpen: true,
  }),
);

export const closeNecessaryProductDialogStoreAction = createStoreAction(
  openNecessaryProductDialogStore,
  (prev) => ({
    ...prev,
    product: undefined,
    quantity: 0,
    variationProduct: undefined,
    isOpen: false,
  }),
);

export const requestRevalidate = async (url: string) => {
  const response: AxiosResponse<{ revalidated: boolean }> = await axios.post(
    `${FRONTEND_ENDPOINT}/api/revalidate?secret=al_dialogo_s3cr37%%`,
    { url },
  );
  return {
    response: response.data.revalidated,
  };
};

function deepEqual(obj1?: any, obj2?: any) {
  console.log('obj1', { obj1 });
  console.log('obj2', { obj2 });
  const areEqual = JSON.stringify(obj1) === JSON.stringify(obj2);
  console.log('Es la ultima actualización? ', areEqual);
  return areEqual;
}

export const checkProductInfo = async (
  product: any,
  slug: any,
  productUrl: any,
) => {
  if (slug) {
    try {
      // const response = await fetch(`/api/revalidateProduct?slug=${slug}`);
      // const getOneProduct = await response.json();

      const getOneProduct = await fetchProduct({
        id: slug,
        idType: ProductIdTypeEnum.Slug,
      });

      if (getOneProduct && !deepEqual(getOneProduct, product)) {
        const urlToRevalidate = productUrl ?? '';
        const revalidate = await requestRevalidate(urlToRevalidate);
        return revalidate.response || false;
      }
    } catch (error) {
      console.error('Error en la verificación del producto:', error);
    }
  }
  return false;
};
