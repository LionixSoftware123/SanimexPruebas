/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: {}; output: {} };
};

export type IAttribute = {
  __typename?: 'IAttribute';
  count?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type IAttributeResponse = {
  __typename?: 'IAttributeResponse';
  brands?: Maybe<Array<Maybe<IAttribute>>>;
  categories?: Maybe<Array<Maybe<IAttribute>>>;
  colors?: Maybe<Array<Maybe<IAttribute>>>;
  materials?: Maybe<Array<Maybe<IAttribute>>>;
  typologies?: Maybe<Array<Maybe<IAttribute>>>;
  units?: Maybe<Array<Maybe<IAttribute>>>;
};

export type IProduct = {
  __typename?: 'IProduct';
  brands?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  categories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  colors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  created_at?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  is_on_sale?: Maybe<Scalars['Boolean']['output']>;
  materials?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  parent_categories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  preciomts2?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  regular_price?: Maybe<Scalars['Float']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<IProductStatus>;
  stock?: Maybe<Scalars['Int']['output']>;
  thumbnail_url?: Maybe<Scalars['String']['output']>;
  total_sales?: Maybe<Scalars['Int']['output']>;
  typologies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  units?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updated_at?: Maybe<Scalars['String']['output']>;
  uses?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  variations?: Maybe<Array<Maybe<IProductVariation>>>;
};

export type IProductOrderInput = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  total_sales?: InputMaybe<Scalars['Int']['input']>;
};

export enum IProductStatus {
  Publish = 'publish',
  Trash = 'trash',
}

export type IProductVariation = {
  __typename?: 'IProductVariation';
  stock_status?: Maybe<Scalars['Boolean']['output']>;
};

export type IProductWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<IProductWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<IProductWhereInput>>>;
  brands?: InputMaybe<Scalars['JSON']['input']>;
  categories?: InputMaybe<Scalars['JSON']['input']>;
  colors?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  is_on_sale?: InputMaybe<Scalars['Boolean']['input']>;
  materials?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_categories?: InputMaybe<Scalars['JSON']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<IProductStatus>;
  typologies?: InputMaybe<Scalars['JSON']['input']>;
  units?: InputMaybe<Scalars['JSON']['input']>;
  uses?: InputMaybe<Scalars['JSON']['input']>;
  variations?: InputMaybe<VariationFilterInput>;
};

export type IProductsResponse = {
  __typename?: 'IProductsResponse';
  count?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<IProduct>>>;
};

export type Query = {
  __typename?: 'Query';
  attributes?: Maybe<IAttributeResponse>;
  products?: Maybe<IProductsResponse>;
};

export type QueryAttributesArgs = {
  attributes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  where?: InputMaybe<IProductWhereInput>;
};

export type QueryProductsArgs = {
  orderBy: IProductOrderInput;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IProductWhereInput>;
};

export type VariationFilterInput = {
  stock_status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IProductFragmentFragment = {
  __typename?: 'IProduct';
  id: string;
  name: string | null;
  slug: string | null;
  description: string | null;
  external_id: number | null;
  price: number | null;
  regular_price: number | null;
  image_url: string | null;
  thumbnail_url: string | null;
  sku: string | null;
  stock: number | null;
  status: IProductStatus | null;
  total_sales: number | null;
  is_on_sale: boolean | null;
  brands: Array<string | null> | null;
  categories: Array<string | null> | null;
  parent_categories: Array<string | null> | null;
  colors: Array<string | null> | null;
  materials: Array<string | null> | null;
  typologies: Array<string | null> | null;
  units: Array<string | null> | null;
  uses: Array<string | null> | null;
  preciomts2: number | null;
  created_at: string | null;
  updated_at: string | null;
  variations: Array<{
    __typename?: 'IProductVariation';
    stock_status: boolean | null;
  } | null> | null;
};

export type IAttributeFragmentFragment = {
  __typename?: 'IAttribute';
  name: string | null;
  count: number | null;
};

export type AttributesQueryVariables = Exact<{
  where?: InputMaybe<IProductWhereInput>;
  attributes?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type AttributesQuery = {
  __typename?: 'Query';
  attributes: {
    __typename?: 'IAttributeResponse';
    brands: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
    materials: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
    colors: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
    typologies: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
    units: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
  } | null;
};

export type ProductsWithAttributesQueryVariables = Exact<{
  orderBy: IProductOrderInput;
  where?: InputMaybe<IProductWhereInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  attributesWhere?: InputMaybe<IProductWhereInput>;
  attributes?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type ProductsWithAttributesQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'IProductsResponse';
    count: number | null;
    items: Array<{
      __typename?: 'IProduct';
      id: string;
      name: string | null;
      slug: string | null;
      description: string | null;
      external_id: number | null;
      price: number | null;
      regular_price: number | null;
      image_url: string | null;
      thumbnail_url: string | null;
      sku: string | null;
      stock: number | null;
      status: IProductStatus | null;
      total_sales: number | null;
      is_on_sale: boolean | null;
      brands: Array<string | null> | null;
      categories: Array<string | null> | null;
      parent_categories: Array<string | null> | null;
      colors: Array<string | null> | null;
      materials: Array<string | null> | null;
      typologies: Array<string | null> | null;
      units: Array<string | null> | null;
      uses: Array<string | null> | null;
      preciomts2: number | null;
      created_at: string | null;
      updated_at: string | null;
      variations: Array<{
        __typename?: 'IProductVariation';
        stock_status: boolean | null;
      } | null> | null;
    } | null> | null;
  } | null;
  attributes: {
    __typename?: 'IAttributeResponse';
    brands: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
    materials: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
    colors: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
    typologies: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
    units: Array<{
      __typename?: 'IAttribute';
      name: string | null;
      count: number | null;
    } | null> | null;
  } | null;
};

export type ProductsQueryVariables = Exact<{
  orderBy: IProductOrderInput;
  where?: InputMaybe<IProductWhereInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ProductsQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'IProductsResponse';
    count: number | null;
    items: Array<{
      __typename?: 'IProduct';
      id: string;
      name: string | null;
      slug: string | null;
      description: string | null;
      external_id: number | null;
      price: number | null;
      regular_price: number | null;
      image_url: string | null;
      thumbnail_url: string | null;
      sku: string | null;
      stock: number | null;
      status: IProductStatus | null;
      total_sales: number | null;
      is_on_sale: boolean | null;
      brands: Array<string | null> | null;
      categories: Array<string | null> | null;
      parent_categories: Array<string | null> | null;
      colors: Array<string | null> | null;
      materials: Array<string | null> | null;
      typologies: Array<string | null> | null;
      units: Array<string | null> | null;
      uses: Array<string | null> | null;
      preciomts2: number | null;
      created_at: string | null;
      updated_at: string | null;
      variations: Array<{
        __typename?: 'IProductVariation';
        stock_status: boolean | null;
      } | null> | null;
    } | null> | null;
  } | null;
};

export const IProductFragmentFragmentDoc = gql`
  fragment IProductFragment on IProduct {
    id
    name
    slug
    description
    external_id
    price
    regular_price
    image_url
    thumbnail_url
    sku
    stock
    status
    total_sales
    is_on_sale
    brands
    categories
    parent_categories
    colors
    materials
    typologies
    units
    uses
    variations {
      stock_status
    }
    preciomts2
    created_at
    updated_at
  }
`;
export const IAttributeFragmentFragmentDoc = gql`
  fragment IAttributeFragment on IAttribute {
    name
    count
  }
`;
export const AttributesDocument = gql`
  query Attributes($where: IProductWhereInput, $attributes: [String]) {
    attributes(where: $where, attributes: $attributes) {
      brands {
        ...IAttributeFragment
      }
      materials {
        ...IAttributeFragment
      }
      colors {
        ...IAttributeFragment
      }
      typologies {
        ...IAttributeFragment
      }
      units {
        ...IAttributeFragment
      }
    }
  }
  ${IAttributeFragmentFragmentDoc}
`;

/**
 * __useAttributesQuery__
 *
 * To run a query within a React component, call `useAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useAttributesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AttributesQuery,
    AttributesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AttributesQuery, AttributesQueryVariables>(
    AttributesDocument,
    options,
  );
}
export function useAttributesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AttributesQuery,
    AttributesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AttributesQuery, AttributesQueryVariables>(
    AttributesDocument,
    options,
  );
}
export type AttributesQueryHookResult = ReturnType<typeof useAttributesQuery>;
export type AttributesLazyQueryHookResult = ReturnType<
  typeof useAttributesLazyQuery
>;
export type AttributesQueryResult = Apollo.QueryResult<
  AttributesQuery,
  AttributesQueryVariables
>;
export const ProductsWithAttributesDocument = gql`
  query ProductsWithAttributes(
    $orderBy: IProductOrderInput!
    $where: IProductWhereInput
    $take: Int
    $skip: Int
    $attributesWhere: IProductWhereInput
    $attributes: [String]
  ) {
    products(orderBy: $orderBy, where: $where, take: $take, skip: $skip) {
      count
      items {
        ...IProductFragment
      }
    }
    attributes(where: $attributesWhere, attributes: $attributes) {
      brands {
        ...IAttributeFragment
      }
      materials {
        ...IAttributeFragment
      }
      colors {
        ...IAttributeFragment
      }
      typologies {
        ...IAttributeFragment
      }
      units {
        ...IAttributeFragment
      }
    }
  }
  ${IProductFragmentFragmentDoc}
  ${IAttributeFragmentFragmentDoc}
`;

/**
 * __useProductsWithAttributesQuery__
 *
 * To run a query within a React component, call `useProductsWithAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsWithAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsWithAttributesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      attributesWhere: // value for 'attributesWhere'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useProductsWithAttributesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProductsWithAttributesQuery,
    ProductsWithAttributesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ProductsWithAttributesQuery,
    ProductsWithAttributesQueryVariables
  >(ProductsWithAttributesDocument, options);
}
export function useProductsWithAttributesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductsWithAttributesQuery,
    ProductsWithAttributesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ProductsWithAttributesQuery,
    ProductsWithAttributesQueryVariables
  >(ProductsWithAttributesDocument, options);
}
export type ProductsWithAttributesQueryHookResult = ReturnType<
  typeof useProductsWithAttributesQuery
>;
export type ProductsWithAttributesLazyQueryHookResult = ReturnType<
  typeof useProductsWithAttributesLazyQuery
>;
export type ProductsWithAttributesQueryResult = Apollo.QueryResult<
  ProductsWithAttributesQuery,
  ProductsWithAttributesQueryVariables
>;
export const ProductsDocument = gql`
  query Products(
    $orderBy: IProductOrderInput!
    $where: IProductWhereInput
    $take: Int
    $skip: Int
  ) {
    products(orderBy: $orderBy, where: $where, take: $take, skip: $skip) {
      count
      items {
        ...IProductFragment
      }
    }
  }
  ${IProductFragmentFragmentDoc}
`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useProductsQuery(
  baseOptions: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export function useProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductsQuery,
    ProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<
  typeof useProductsLazyQuery
>;
export type ProductsQueryResult = Apollo.QueryResult<
  ProductsQuery,
  ProductsQueryVariables
>;
