import React from 'react';
import Link from 'next/link';

type ProductMenuType = {
  routes: {
    label: string;
    slug: string;
    childrenRoutes: { label: string; slug: string }[];
  }[];
};

const ProductMenu: React.FC<ProductMenuType> = ({ routes }) => {
  const pisosMuros = routes.find((route) => route.label === 'Pisos y muros');
  const cocina = routes.find((route) => route.label === 'Cocina');
  const banos = routes.find((route) => route.label === 'Baños');
  const materialInstalacion = routes.find(
    (route) => route.label === 'Material de Instalación',
  );
  const complementos = routes.find((route) => route.label === 'Complementos');

  const renderRoute = (route: any | undefined) =>
    route ? (
      <div
        className="text-[#315299] font-Century-Gothic-Bold "
        key={'ProdItem-' + route.slug}
      >
        <div className=" uppercase mb-3 pb-3 border-b border-[#DFDFDF] w-72">
          <Link
            className="hover:bg-[#eee] rounded-[10px] px-1"
            href={`/productos/${route.slug}`}
          >
            {route.label}
          </Link>
        </div>

        <div>
          {route.childrenRoutes.map(
            (
              children: {
                slug: any;
                label:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
              },
              index: string,
            ) => (
              <div className="w-full" key={'subcategoryproduct-' + index}>
                <div className=" text-[14px] font-Century-Gothic flex justify-between  bg-transparent  w-full font-semibold  text-[#606060]">
                  <Link
                    className="hover:bg-[#eee] rounded-[10px] px-1"
                    href={`/productos/${route.slug}/${children.slug}`}
                  >
                    {' '}
                    {children.label}{' '}
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    ) : null;

  return (
    <div className={`pt-[42px] w-full grid grid-cols-12 gap-4 ml-4 `}>
      <div className="col-span-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          {renderRoute(pisosMuros)}
          <div className="mt-8">{renderRoute(cocina)}</div>
        </div>
      </div>

      <div className="col-span-4">{renderRoute(banos)}</div>
      <div className="col-span-2">
        {renderRoute(materialInstalacion)}
        <div className="mt-6">{renderRoute(complementos)}</div>
      </div>
    </div>
  );
};

export default ProductMenu;
