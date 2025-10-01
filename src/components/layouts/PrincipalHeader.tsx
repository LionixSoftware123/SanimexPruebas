import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/logo.png';
import { ChevronDown } from 'lucide-react';
import { data } from '@/components/layouts/components/data';
import Hamburger from '@/images/hamburger.svg';
import { useRouter } from 'next/router';
import { useUserHook } from '@/modules/auth/user-hooks';
import dynamic from 'next/dynamic';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import BasicSearchInput from '@/lib/basicsearch/BasicSearchInput';

const FavoriteHeader = dynamic(
  () => import('@/components/utils/FavoriteHeader'),
);
const CompareHeader = dynamic(() => import('@/components/utils/CompareHeader'));

const LocationDropdown = dynamic(
  () => import('@/components/layouts/components/LocationDropdown'),
);
const ProductMenu = dynamic(
  () => import('@/components/layouts/components/ProductMenu'),
);

const QuickLogin = dynamic(
  () => import('@/components/layouts/components/QuickLogin'),
);
const Cart = dynamic(() => import('@/lib/cart/v2/components/Cart'));

const ModalMenu = dynamic(() => import('./components/ModalMenu'));

const AnimationPreset = dynamic(
  () => import('@/components/utils/AnimationPreset'),
);

const PrincipalHeader = () => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const {
    state: { user, isLoading },
  } = useUserHook();
  const { topBanner } = useEvent(renderTopBannerEvent);

  useEffect(() => {
    const FetchSitemaps = async () => {
      try {
        const response = await fetch('/api/update-sitemaps');

        const resp = await response.json();
        console.log({ resp });
        return;
      } catch {
        return null;
      }
    };
    FetchSitemaps();
  }, []);

  const routeHasProducts = router.pathname.startsWith('/productos');
  const routeHasBrands = router.pathname.startsWith('/marcas');
  const routeHasPromotions = router.pathname.startsWith('/promociones');
  const routeHasShops = router.pathname.startsWith('/sucursales');
  const routeHasContact = router.pathname.startsWith('/contactanos');

  return (
    <div>
      <div className="min-h-[32px] h-auto bg-[#0071CE] flex justify-center items-center text-white font-Century-Gothic-Bold"><a href="https://publuu.com/flip-book/445362/2107543" target="_black">Visita nuestro Catálogo Digital</a></div>
      <div className="max-h-[92px] h-auto bg-[#1C355E] flex justify-center">
        <div className="hidden lg:block xl:w-[1200px]">
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="col-span-3 flex items-center">
              <div className="w-full relative h-[88px]">
                <Link href="/">
                  <Image
                    src={Logo}
                    alt="logo gam"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Link>
              </div>
            </div>
            <div className="col-span-9">
              <div className="flex justify-end my-[3px] pb-[1px]">
                <div className="pt-1">
                  <div className="flex mr-4">
                    <div className="text-[10px] text-white">
                      <LocationDropdown />
                    </div>
                  </div>
                </div>
                <div className="min-w-[100px] flex items-center">
                  {!isLoading &&
                    (user ? (
                      <div className="flex justify-center text-[11px] mx-[15px]">
                        <div className="text-white">Bienvenido,&nbsp;</div>
                        <Link
                          className="hover:cursor-pointer text-[#ffffff] font-Century-Gothic-Bold gap-4 items-center flex flex-row"
                          href="/usuario"
                          prefetch
                        >
                          {user?.name}
                          <Image
                            src={user?.avatar?.url as string}
                            alt={user?.name as string}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        </Link>
                      </div>
                    ) : (
                      <div className="text-[11px] my-auto mx-[15px]">
                        <div className="text-white flex self-center">
                          No ha iniciado sesión,&nbsp;
                          <Link
                            className="hover:cursor-pointer text-[#0071CE] font-Century-Gothic-Bold"
                            href="/auth"
                          >
                            Acceder
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="pb-2 pt-1">
                  <div className="flex items-center justify-center">
                    <QuickLogin />
                    <div className="mx-3">
                      <Cart />
                    </div>
                    <FavoriteHeader />
                    <div className="ml-3">
                      <CompareHeader />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-white h-[42px] items-center text-[16px]">
                <div className="flex text-white h-full items-center text-[16px]">
                  <button
                    onMouseEnter={() => setOpenMenu(true)}
                    onMouseLeave={() => setOpenMenu(false)}
                    className={`${
                      routeHasProducts ? 'bg-[#0071CE]' : ''
                    } hover:bg-[#0071CE] px-[30px] h-full flex items-center cursor-pointer border-l border-white`}
                  >
                    <Link href="/productos" className="flex flex-row">
                      <span>Productos</span>
                      <ChevronDown className="ml-4" />
                    </Link>
                    <AnimationPreset open={openMenu} setOpen={setOpenMenu}>
                      <div
                        className={`w-full text-black left-0 top-[96px] absolute ${
                          topBanner?.active ? 'mt-12' : 'mt-4'
                        }`}
                      >
                        <div className="xl:w-[1200px] h-[414px] text-start xl:px-0 mx-auto bg-white border-[#37BBD8] border rounded-[10px]">
                          <ProductMenu routes={data.routes} />
                        </div>
                      </div>
                    </AnimationPreset>
                  </button>
                  <Link
                    href="/marcas"
                    className={`${
                      routeHasBrands ? 'bg-[#0071CE]' : ''
                    } h-full hover:bg-[#0071CE]`}
                  >
                    <div className="h-full px-4 flex items-center cursor-pointer border-l border-white">
                      Marcas
                    </div>
                  </Link>
                  <Link
                    href="/promociones"
                    className={`${
                      routeHasPromotions ? 'bg-[#0071CE]' : ''
                    } h-full hover:bg-[#0071CE]`}
                  >
                    <div className="h-full px-4 flex items-center cursor-pointer border-l border-white">
                      Promociones
                    </div>
                  </Link>
                  <Link
                    href="/sucursales"
                    className={`${
                      routeHasShops ? 'bg-[#0071CE]' : ''
                    } h-full hover:bg-[#0071CE]`}
                  >
                    <div className="h-full px-4 flex items-center cursor-pointer border-l border-white">
                      Tiendas
                    </div>
                  </Link>
                  <Link
                    href="/contactanos"
                    className={`${
                      routeHasContact ? 'bg-[#0071CE]' : ''
                    } h-full hover:bg-[#0071CE]`}
                  >
                    <div className="h-full px-3 flex items-center cursor-pointer border-l border-white">
                      Contáctanos
                    </div>
                  </Link>
                </div>
                <div className="pr-1 xl:pr-0 z-0">
                  <BasicSearchInput />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden px-4 pb-2 w-full">
          <div className="self-center w-full text-white grid grid-cols-3 items-center">
            <div className="justify-self-start">
              <button
                onClick={() => setMobileMenu(true)}
                className="w-[25px] h-[25px]"
              >
                <Hamburger />
              </button>
            </div>
            <div className="justify-self-center">
              <div className="w-[150px] relative h-[40px] mt-2 flex self-center">
                <Link href="/">
                  <Image
                    src={Logo}
                    alt="logo gam"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </div>
            </div>
            <div className="justify-self-end flex space-x-2 items-center lg:mr-[-15px]">
              <QuickLogin />
              <Cart />
              <CompareHeader />
            </div>
          </div>
          <div className="mt-[7px]">
            <BasicSearchInput />
          </div>
        </div>
      </div>
      <AnimationPreset open={mobileMenu} setOpen={() => {}}>
        <div className="w-full absolute left-0 top-0">
          <ModalMenu routes={data.routes} setClose={setMobileMenu} />
        </div>
      </AnimationPreset>
    </div>
  );
};

export default PrincipalHeader;
