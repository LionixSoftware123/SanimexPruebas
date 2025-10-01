import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Crossclose from '@/images/crossClose.svg';
import FavoriteWhite from '@/images/favoritewhite.svg';
import { useUserHook } from '@/modules/auth/user-hooks';
import { useProductsLazyQuery, Product } from '@/utils/types/generated';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const SkeletonFavoriteHeaderItem = dynamic(
  () => import('@/components/skeleton/SkeletonFavoriteHeaderItem'),
);

const FavoriteHeaderItem = dynamic(
  () => import('@/components/utils/FavoriteHeaderItem'),
);

const FavoriteHeader: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const {
    state: { user },
    favoriteProducts,
  } = useUserHook();

  const [FetchProducts, { loading }] = useProductsLazyQuery({
    onCompleted: (data) => {
      setProducts(data.products?.edges.map((edge) => edge.node) as Product[]);
    },
  });

  useEffect(() => {
    if (favoriteProducts && favoriteProducts.length) {
      FetchProducts({
        variables: {
          where: {
            include: favoriteProducts,
          },
        },
      });
    }
  }, [FetchProducts, favoriteProducts]);

  return (
    <Menu as="div" className="relative top-1">
      {products && products.length ? (
        <div className="text-center absolute bg-[#D200BB] h-[15px] w-[15px] left-0 z-10 rounded-full -top-[5px] text-[10px] text-white">
          {products.length}
        </div>
      ) : null}
      <div>
        <Menu.Button>
          <FavoriteWhite
            style={{ objectFit: 'cover', height: '20px', width: 'auto' }}
          />
        </Menu.Button>
      </div>
      {user ? (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-[350px] origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="flex justify-between text-black px-4 py-2 text-[14px] font-Century-Gothic border-b border-b-[#C1C1C1]">
              <div>
                <Link
                  href={'/usuario/favoritos'}
                  className="font-bold underline"
                >
                  Favoritos
                </Link>
              </div>

              <div className=" relative  flex self-center h-[9px] w-[9px]">
                <Menu.Button>
                  <div className="w-[12px] h-[12px] flex self-center">
                    <Crossclose />
                  </div>
                </Menu.Button>
              </div>
            </div>
            <div className="max-h-[350px] overflow-auto">
              {loading ? (
                <>
                  {[1, 2, 3].map((key) => (
                    <SkeletonFavoriteHeaderItem key={key} />
                  ))}
                </>
              ) : (
                <>
                  {products.length ? (
                    <>
                      {products.map((product, key) => (
                        <FavoriteHeaderItem product={product} key={key} />
                      ))}
                    </>
                  ) : (
                    <div className="h-full flex justify-center items-center min-h-12 p-12 text-center">
                      No tienes productos agregados a favoritos
                    </div>
                  )}
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      ) : null}
    </Menu>
  );
};

export default FavoriteHeader;
