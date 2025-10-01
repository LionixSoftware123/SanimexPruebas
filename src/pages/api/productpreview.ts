import type { NextApiRequest, NextApiResponse } from 'next';
import { FetchProductQueryVariables } from '@/utils/types/generated';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: { variables: FetchProductQueryVariables } = req.body;
  const response = await axios.post(
    BACKEND_ENDPOINT,
    {
      query: `query FetchProduct($id: ID!, $idType: ProductIdTypeEnum) {
        product(id: $id, idType: $idType) {
            related(first: 20) {
                nodes{
                    id
                    databaseId
                }
            }
            type
            ... on SimpleProduct {
                price
                regularPrice
                salePrice
                stockStatus
                name
                databaseId
                sku
                precioPor
                slug
                stockStatus
                stockQuantity
                crossSell(first: 20) {
                    nodes{
                        id
                        databaseId
                    }
                }
            }
            ... on VariableProduct {
                price
                regularPrice
                salePrice
                stockStatus
                name
                databaseId
                sku
                precioPor
                slug
                stockStatus
                stockQuantity
                variations(first:100){
                    nodes {
                        price
                        regularPrice
                        salePrice
                        stockStatus
                        name
                        databaseId
                        sku
                        slug
                        stockStatus
                        stockQuantity
                        attributes {
                            nodes {
                                attributeId
                                name
                                label
                                value
    
                            }
                        }
                        featuredImage {
                            node {
                                sourceUrl(size:LARGE)
                            }
                        }
                    }
                }
                crossSell(first: 20) {
                    nodes{
                        id
                        databaseId
                    }
                }
            }
            allPaColor(first:100) {
                edges {
                    node {
                        name
                        hex
                        slug
                    }
                }
            }
            allPaCaja{
                edges{
                    node{
                        name
                        slug
                    }
                }
            }
            allPaMedidasCm{
                edges {
                    node {
                        name
                        slug
                    }
                }
            }
            allPaUso{
                edges{
                    node{
                        name
                        slug
                    }
                }
            }
            attributes(first:100) {
                nodes {
                    id
                    attributeId
                    ... on LocalProductAttribute {
                        name
                        options
                        label
                        variation
    
                    }
                    ... on GlobalProductAttribute {
                        name
                        options
                        label
                        variation
                        slug
                        terms (first:100){
                            nodes {
                                id
                                name
                            }
                        }
                    }
                }
            }
            allPaMarcas {
                edges {
                    node {
                        databaseId
                        name
                    }
                }
            }
    
            featuredImage {
                node {
                    sourceUrl(size:LARGE)
                }
            }
            galleryImages {
                edges {
                    node {
                        sourceUrl(size:LARGE)
                    }
                }
            }
            productCategories{
                nodes{
                    name
                    slug
                }
            }
            upsell(first: 3) {
                edges {
                    node {
                        ... on SimpleProduct {
                            price
                            regularPrice
                            salePrice
                            dateOnSaleTo
                            name
                            databaseId
                            sku
                            slug
                            stockStatus
                            stockQuantity
                        }
                        ... on VariableProduct {
                            price
                            regularPrice
                            salePrice
                            stockStatus
                            name
                            databaseId
                            sku
                            slug
                            stockStatus
                            stockQuantity
                        }
                        featuredImage {
                            node {
                                sourceUrl(size:LARGE)
                            }
                        }
                        allPaMarcas {
                            edges {
                                node {
                                    databaseId
                                    name
                                }
                            }
                        }
                    }
                }
            }
        description(format: RENDERED)
        }
    }`,
      variables: body.variables,
    },
    {
      auth: {
        username: 'webmaster',
        password: 'cualquierwebmaster1%',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return res.status(200).json(response.data.data);
}
