import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Crossclose from '@/images/crossClose.svg';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useProductCompareHook } from '@/lib/easysearch/product-compare-hooks';
import IconoComparar from '@/images/comparewhite.svg';

const SkeletonFavoriteHeaderItem = dynamic(
  () => import('@/components/skeleton/SkeletonFavoriteHeaderItem'),
);

const CompareProductHeaderItem = dynamic(
  () => import('@/components/utils/CompareProductHeaderItem'),
);

const CompareHeader: React.FC = () => {
  const { state } = useProductCompareHook();
  const { productAdded, products } = state;

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoading(false);
    }
  }, [productAdded]);

  return (
    <>
      {products.length ? (
        <Menu as="div" className="relative top-1">
          {products ? (
            <div className="text-center absolute bg-[#D200BB] h-[15px] w-[15px] left-0 z-10 rounded-full top-[-5px] text-[10px] text-white">
              {products.length}
            </div>
          ) : null}
          <div>
            <Menu.Button>
              <IconoComparar
                style={{ objectFit: 'cover', height: '23px', width: 'auto' }}
              />
            </Menu.Button>
          </div>
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
              <div className="flex justify-between text-black px-4 py-2 text-[12px] font-Century-Gothic border-b border-b-[#C1C1C1]">
                {products.length < 2 ? (
                  <div className="flex justify-center my-1">
                    <div className="font-bold underline text-[12px]">
                      Agregue 2 o más productos para comparar
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center my-1">
                    <div className="font-bold underline text-[12px]">
                      Comparar
                    </div>
                  </div>
                )}

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
                          <CompareProductHeaderItem
                            product={product}
                            key={key}
                          />
                        ))}
                      </>
                    ) : (
                      <div className="h-24 flex justify-center items-center">
                        No tienes productos para comparar
                      </div>
                    )}
                  </>
                )}
              </div>

              <div>
                {products.length >= 2 && (
                  <div className="flex justify-center my-4">
                    <Link href="/usuario/comparar">
                      <div className="bg-[#0033a1] text-white px-4 py-2 rounded">
                        Comparar productos
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : null}
    </>
  );
};

export default CompareHeader;
