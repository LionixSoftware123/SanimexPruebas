import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import Profile from '@/images/profile-1.svg';
import CrossClose from '@/images/crossCloseWhite.svg';
import Logo from '@/images/logo.png';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

type ProductType = {
  routes: {
    label: string;
    slug: string;
    childrenRoutes: { label: string; slug: string }[];
  }[];
  setClose: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

const ModalMenu: React.FC<ProductType> = ({ routes, setClose }) => {
  const [productMenu, setProductMenu] = useState(false);

  return (
    <div className="absolute flex justify-between left-0 top-0 w-full h-screen bg-black z-50 bg-opacity-75 ">
      <div className=" bg-white w-[300px] overflow-y-auto h-full">
        <div className="bg-[#1C355E] px-4">
          <div className="flex justify-end">
            <Link   className="flex" href={'/auth'}>
              <div className="flex self-center text-white text-[14px]">
                Iniciar Sesion
              </div>
              <div className="ml-2">
                <Profile />
              </div>
            </Link>
          </div>
          <div className="flex justify-center py-8">
            <Link   className="relative w-[209px] h-[70px]" href="/">
              <Image
                src={Logo}
                alt={'logo sanimex'}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
        </div>
        <div className="text-[#666666] flex flex-col uppercase p-4 text-[12px] font-Century-Gothic-Bold">
          <div className="py-4 border-b border-[#EFEFEF]">
            <button
              onClick={() => {
                setProductMenu(!productMenu);
              }}
              className="w-full flex justify-between"
            >
              <div className="uppercase text-[#0071CE] font-Century-Gothic-Bold">
                <Link   href={'/productos'}>Productos</Link>
              </div>
              <div>
                {!productMenu ? (
                  <ChevronDownIcon
                    className="h-[17px] w-[17px]"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronUpIcon
                    className="h-[17px] w-[17px]"
                    aria-hidden="true"
                  />
                )}
              </div>
            </button>
            <div className={`${productMenu ? '' : 'hidden'}`}>
              <div className="py-4 w-full grid  gap-4">
                {routes.map((item, index) => (
                  <div
                    className="text-[#002881] font-Century-Gothic-Bold"
                    key={'ProdItem-' + index}
                  >
                    <div className="uppercase mb-3 pb-3 border-b border-[#DFDFDF]">
                      <Link
                        className="hover:bg-[#eee] rounded-[10px] px-1"
                        href={`/productos/${item.slug}`}
                        prefetch
                      >
                        {item.label}
                      </Link>
                    </div>

                    <div>
                      {item.childrenRoutes.map((children, index) => (
                        <div
                          className="w-full"
                          key={'subcategoryproduct-' + index}
                        >
                          <div className=" text-[14px] font-Century-Gothic flex justify-between text-[10px] bg-transparent flex w-full font-semibold capitalize text-black">
                            <Link
                              className="hover:bg-[#eee] rounded-[10px] px-1"
                              prefetch
                              href={`/productos/${item.slug}/${children.slug}`}
                            >
                              {children.label}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link className="py-4 border-b border-[#EFEFEF]" href={'/marcas'}>
            Marcas
          </Link>
          <Link
            className="py-4 border-b border-[#EFEFEF]"
            href={'/promociones'}
          >
            promociones
          </Link>

          <Link className="py-4 border-b border-[#EFEFEF]" href={'/sucursales'}>
            tiendas
          </Link>
          <Link
            className="py-4 border-b border-[#EFEFEF]"
            href={'/contactanos'}
          >
            Contáctanos
          </Link>
        </div>
      </div>
      <div className="pr-4 pt-4">
        <button
          onClick={() => {
            setClose(false);
          }}
          className="relative w-[20px] h-[20px] "
        >
          <CrossClose />
        </button>
      </div>
    </div>
  );
};

export default ModalMenu;
