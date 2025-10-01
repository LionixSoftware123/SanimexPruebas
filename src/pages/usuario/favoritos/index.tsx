import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { fetchProducts } from '@/modules/product/product-actions';
import {
  FetchUserDocument,
  UserNodeIdTypeEnum,
  FetchUserQuery,
  FetchUserQueryVariables,
  Product as ProductType,
  useProductsLazyQuery,
} from '@/utils/types/generated';
import jwtDecode from 'jwt-decode';
import { createApolloClient } from '@/apollo/client';
import ProductsLoading from '@/components/product/components/ProductsLoading';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Paginate = dynamic(() => import('@/components/utils/Paginate'));
const LayoutUser = dynamic(() => import('@/components/layouts/LayoutUser'));
const Product = dynamic(() => import('@/components/product/Product'));

const PER_PAGE = 15;
const INITIAL_PAGE = 0;

type FavoritesProps = {
  products?: ProductType[];
  total?: number;
  favorites?: number[];
};

const FavoritePage: React.FC<FavoritesProps> = ({
  products = [],
  total = 0,
  favorites,
}) => {
  const [_products, _setProducts] = useState<ProductType[]>(products);
  const [_total, _setTotal] = useState(total);
  const [, setPage] = useState<number>(INITIAL_PAGE);

  const [FetchProducts, { loading }] = useProductsLazyQuery({
    onCompleted: ({ products }) => {
      _setProducts(products?.edges.map((edge) => edge.node) as ProductType[]);
      _setTotal(products?.pageInfo.offsetPagination?.total as number);
    },
  });
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Favoritos'}
        description={'Favoritos'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <LayoutUser>
        <div className="grid grid-cols-12 md:grid-cols-3 mb-[20px]">
          <div className="col-span-full">
            <div className="hidden lg:block text-[25px] text-[#333E48] font-Century-Gothic-Bold">
              <span>{_total} Productos encontrados</span>
            </div>
          </div>
          <div className="col-span-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {!loading ? (
                <>
                  {_products.map((product, key) => (
                    <Product
                      key={key}
                      product={product}
                      onSuccessFavorite={(values) => {
                        FetchProducts({
                          variables: {
                            where: {
                              offsetPagination: {
                                size: PER_PAGE,
                                offset: 0,
                              },
                              include: values,
                            },
                          },
                        });
                      }}
                    />
                  ))}
                </>
              ) : (
                <div className="col-span-full">
                  <ProductsLoading />
                </div>
              )}
            </div>
          </div>
          <div className="col-span-full">
            {_products.length ? (
              <div className="flex justify-center">
                <Paginate
                  page={0}
                  initialPage={INITIAL_PAGE}
                  pageCount={Math.ceil(_total / PER_PAGE)}
                  onPageChange={(data) => {
                    setPage(data.selected);
                    FetchProducts({
                      variables: {
                        where: {
                          offsetPagination: {
                            size: PER_PAGE,
                            offset: 0,
                          },
                          include: favorites,
                        },
                      },
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </LayoutUser>
    </RootLayout>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  if (req.cookies && !req.cookies.jwtAuthToken) {
    return {
      redirect: {
        destination: `/auth`,
        permanent: false,
      },
      props: {},
    };
  }

  const decodeToken = jwtDecode<{
    data: { user: { id: string } };
    exp?: number;
  }>(req.cookies.jwtAuthToken as string);

  const client = createApolloClient(
    req.cookies.wooSessionToken,
    req.cookies.jwtAuthToken,
  );

  const user = await client.query<FetchUserQuery, FetchUserQueryVariables>({
    query: FetchUserDocument,
    variables: {
      id: decodeToken.data.user.id,
      idType: UserNodeIdTypeEnum.DatabaseId,
    },
  });

  const favorites = [...(user.data?.user?.favoriteProducts as number[])];

  if (favorites.length) {
    const { products, total } = await fetchProducts({
      where: {
        offsetPagination: {
          size: PER_PAGE,
          offset: 0,
        },
        include: favorites,
      },
    });

    return {
      props: {
        products,
        total,
        favorites,
      },
    };
  }

  return {
    props: {
      products: [],
      total: 0,
      favorites: [],
    },
  };
};
export default FavoritePage;
