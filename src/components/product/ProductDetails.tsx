import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import IconWhatsapp from '@/images/icon-whatsapp-modal.svg';
import {
  Product as ProductType,
  PaCaja,
  ProductTypesEnum,
  SimpleProduct,
  VariableProduct,
  Product,
  PaColor,
} from '@/utils/types/generated';
import {
  getMarca,
  checkProductInStock,
  getProductAttributeBag,
  getProductAttributeBox,
  getProductCategory,
  getProductVariableByFilter,
  getStock,
  generateProductVariableFilter,
} from '@/modules/product/product-utils';
import { useRouter } from 'next/router';
import { ProductVariantFilter } from '@/modules/product/product-types';
import Link from 'next/link';
import { openNecessaryProductDialogStoreAction } from '@/modules/product/product-actions';
import monterreyZipCodes from '@/utils/postal-codes-product-limit.json';
import { locationStore } from '@/modules/geolocation/use-store-location';
import { useStore } from '@cobuildlab/react-simple-state';
import LimitedProductsGeo from '@/utils/geo-product-limit.json';
import ProductPartCalculator from './components/ProductPartCalculator';
import ClearSelectionButton from './components/ClearSelectionButton';
import { TopBannerResponse } from '@/utils/types/generated';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import { useEvent } from '@cobuildlab/react-simple-state';
import { useToasts } from 'react-toast-notifications';

const NecessaryProductDialog = dynamic(
  () => import('@/components/product/NecessaryProductDialog'),
);
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

const ProductBoquillasCalculator = dynamic(
  () => import('@/components/product/components/ProductBoquillasCalculator'),
);

const ProductJuntaCalculator = dynamic(
  () => import('@/components/product/components/ProductJuntaCalculator'),
);

const ProductFavorite = dynamic(
  () => import('@/components/utils/ProductFavorite'),
);

const ProductCompare = dynamic(
  () => import('@/components/utils/ProductCompare'),
);

const ProductBoxCalculator = dynamic(
  () => import('@/components/product/components/ProductBoxCalculator'),
);

const ProductBagCalculator = dynamic(
  () => import('@/components/product/components/ProductBagCalculator'),
);

const ButtonShared = dynamic(() => import('@/components/utils/ButtonShared'));

const ProductImageDetails = dynamic(
  () => import('@/components/product/components/ProductImageDetails'),
);
const AddCartButton = dynamic(
  () => import('@/lib/cart/v2/components/AddCartButton'),
);

const ProductPriceDetails = dynamic(
  () => import('@/components/product/components/ProductPriceDetails'),
);

const ProductBoxList = dynamic(
  () => import('@/components/product/components/ProductBoxList'),
);

const ProductMeasureList = dynamic(
  () => import('@/components/product/components/ProductMeasureList'),
);

const ProductUseList = dynamic(
  () => import('@/components/product/components/ProductUseList'),
);

const ProductInputQuantity = dynamic(
  () => import('@/components/product/components/ProductInputQuantity'),
);

const ProductColorDetails = dynamic(
  () => import('@/components/product/components/ProductColorDetails'),
);

const ProductAcabadoList = dynamic(
  () => import('@/components/product/components/ProductAcabadoList'),
);

type ProductDetailsProps = {
  product?: ProductType;
};
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [branchName, setBranchName] = useState('');
  const [variantProduct, setVariantProduct] = useState<ProductType | undefined>(
    undefined,
  );
  const [productVariantFilter, setProductVariantFilter] = useState<
    ProductVariantFilter[]
  >([]);
  const [quantity, setQuantity] = useState<number>(1);
  const productAttributeBox = getProductAttributeBox(product);
  const productAttributeBag = getProductAttributeBag(product);

  const isBoquillas = getProductCategory(product, 'boquillas');
  const isJuntas = getProductCategory(product, 'juntas');
  const color = productVariantFilter.find(
    (variant) => variant.taxonomyName === 'pa_color',
  );
  const isTina = product?.productCategories?.nodes.find(
    (node) => (node as any).slug === 'tinas',
  );
  const box = productVariantFilter.find(
    (variant) => variant.taxonomyName === 'pa_caja',
  );
  const productPriceForPart = product?.precioPor === 'precio-por-pieza';

  const [isLoading, setIsLoading] = useState(true);
  const [selectedUse, setSelectedUse] = useState(null);
  const [selectedMeasure, setSelectedMeasure] = useState(null);
  const [selectedColor, setSelectedColor] = useState<PaColor>();
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedProductMax, setSelectedProductMax] = useState(null);
  const [bannerData, setBannerData] = useState<TopBannerResponse>();
  const router = useRouter();
  const [isMonterreyZipCode, setIsMonterreyZipCode] = useState<boolean | null>(
    false,
  );
  const [discount, setDiscount] = useState<number | 0>(0);

  useEffect(() => {
    if (selectedUse) {
      setProductVariantFilter(
        generateProductVariableFilter(
          selectedUse,
          productVariantFilter,
          'pa_uso',
        ),
      );
    }
  }, [selectedUse, productVariantFilter]);

  useEffect(() => {
    if (selectedBox) {
      setProductVariantFilter(
        generateProductVariableFilter(
          selectedBox,
          productVariantFilter,
          'pa_caja',
        ),
      );
    }
  }, [selectedBox, productVariantFilter]);

  useEffect(() => {
    if (selectedColor) {
      setProductVariantFilter((prevFilters) =>
        generateProductVariableFilter(selectedColor, prevFilters, 'pa_color'),
      );
    }
  }, [selectedColor]); // Eliminamos productVariantFilter de las dependencias

  useEffect(() => {
    if (selectedMeasure) {
      setProductVariantFilter(
        generateProductVariableFilter(
          selectedMeasure,
          productVariantFilter,
          'pa_medidas-cm',
        ),
      );
    }
  }, [selectedMeasure, productVariantFilter]);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setQuantity(0);
      setVariantProduct(undefined);
      setProductVariantFilter([]);
    });
    return () => {
      router.events.off('routeChangeStart', () => {
        setQuantity(0);
        setVariantProduct(undefined);
        setProductVariantFilter([]);
      });
    };
  }, [router.events]);

  useEffect(() => {
    if (productVariantFilter.length) {
      setVariantProduct(
        getProductVariableByFilter(
          product as VariableProduct,
          productVariantFilter,
        ),
      );
    }
  }, [product, productVariantFilter, productVariantFilter.length]);

  //console.log({variantProduct});

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }

    setSelectedProductMax(product?.maximumQuantity as any);
  }, [product]);

  const { topBanner } = useEvent(renderTopBannerEvent);
  const { addToast } = useToasts();

  useEffect(() => {
    if (topBanner) {
      setBannerData(topBanner);
    }
  }, [topBanner]);

  const formatProductUrl = (product: SimpleProduct) => {
    return `/logos/${getMarca(product)
      ?.toString()
      .toLowerCase()
      .replace(/'/g, '')
      .replace(' ', '-')}.png`;
  };

  const ImageBranch = (
    <div
      className={`relative justify-start w-[166px] h-[90px]  ${
        !branchName ? '' : 'hidden'
      }`}
    >
      {!isLoading ? (
        <Link
          href={`/marcas?filter=${getMarca(product)
            ?.toString()
            .toLowerCase()
            .replace(' ', '-')}`}
        >
          <ImageWithFallback
            key={2}
            src={formatProductUrl(product as SimpleProduct)}
            alt=""
            fill
            style={{ objectFit: 'contain' }}
            className={`${!branchName ? '' : 'hidden'}`}
            onError={() => {
              setBranchName(`Marca: ${getMarca(product)?.toString()}` || '');
            }}
          />
        </Link>
      ) : (
        <div className="mb-5">
          <div className="w-full">
            <div className="h-12 bg-gray-200 dark:bg-gray-100 max-w-[160px]"></div>
          </div>
        </div>
      )}
    </div>
  );

  const clearSelection = () => {
    setQuantity(0);
    setSelectedColor(undefined);
    setSelectedBox(null);
    setSelectedMeasure(null);
    setSelectedUse(null);
    setProductVariantFilter([]);
    setVariantProduct(undefined);
  };

  const ProductTimeDelivery = product?.tiempoDeEntregaPod;

  const isPisosMuros = !!getProductCategory(product, 'pisos-y-azulejos');
  const isAdhesivos = !!getProductCategory(product, 'adhesivos');
  const { postalCode } = useStore(locationStore);

  useEffect(() => {
    if (postalCode) {
      const zipcodeExist = monterreyZipCodes['monterrey'].includes(postalCode);
      setIsMonterreyZipCode(zipcodeExist ? true : false);
    }
  }, [postalCode]);
  const [isLimited, setIsLimited] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const ProductSlug = router.query.product as string;
    setIsLimited(
      LimitedProductsGeo['products'].includes(ProductSlug) ? true : false,
    );
  }, [router]);

  const productPrecioPor =
    product?.precioPor === 'precio-por-pieza'
      ? 'Piezas:'
      : product?.precioPor === 'precio-por-caja'
      ? 'Cajas:'
      : product?.precioPor === 'precio-por-bulto'
      ? 'Bultos:'
      : 'Cantidad:';

  return (
    <div className="grid grid-cols-12 lg:gap-6">
      <div className="col-span-full lg:col-span-7">
        <div className="lg:hidden  mb-6">
          <div className=" pb-4 text-[14px] md:text-[17px] font-Century-Gothic-Bold text-[#9BA0C9]">
            <div>
              {branchName && <div className="my-2">{branchName}</div>}

              <div className="flex lg:justify-center">{ImageBranch}</div>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-[#0033A1] w-[80%]  lg:text-[22px] font-Century-Gothic-Bold">
              {product?.name}
            </div>

            <div className="flex items-center w-10%] gap-2">
              <ProductCompare product={product} />

              <ProductFavorite product={product} />

              <ButtonShared />
            </div>
          </div>
        </div>
        <ProductImageDetails
          product={variantProduct || product}
          productVariantFilter={productVariantFilter}
          onSelectedColor={(color: any | undefined) =>
            setSelectedColor(color || null)
          }
          clearSelection={clearSelection}
          discount={discount}
          bannerData={bannerData as any}
        />
      </div>
      <div className="col-span-full lg:col-span-5">
        <div className="hidden lg:block  mb-6 ">
          <div className="text-[14px] md:text-[17px] font-Century-Gothic-Bold text-[#9BA0C9]">
            <div className="">
              {branchName && <div className="my-2">{branchName}</div>}

              <div className="flex justify-start">{ImageBranch}</div>
            </div>
            {/**<div className="my-2">Marca: {getMarca(product)?.toString()}</div> */}
          </div>
          {!isLoading ? (
            <>
              <div className="grid grid-cols-8 items-start w-full">
                <div className="text-[#0033A1]  lg:text-[22px] font-Century-Gothic-Bold col-span-6">
                  {product?.name}
                </div>
                <div className="flex items-start col-span-2">
                  <ProductCompare product={product} />

                  <ProductFavorite product={product} />
                  <ButtonShared />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-12">
                <div className="h-6 bg-gray-200  dark:bg-gray-100 max-w-[300px] mb-2.5 col-span-7"></div>
                <div className="h-6 mb-2.5 max-w-[140px] col-span-3"></div>

                <div className="h-6 w-6 bg-gray-200  dark:bg-gray-100 mb-2.5 max-w-[90px] mr-2 col-span-1"></div>
                <div className="h-6 w-6 bg-gray-200  dark:bg-gray-100 max-w-[140px] mb-6 ml-2 col-span-1"></div>
              </div>
            </>
          )}
        </div>

        {!isLoading ? (
          <ProductPriceDetails
            product={variantProduct || (product as any)}
            setMaxDiscount={setDiscount}
          />
        ) : (
          <>
            <div className="mb-5">
              <div className="w-full">
                <div className="h-2 bg-gray-200 dark:bg-gray-100 max-w-[180px] mb-2.5"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-100 mb-2.5 max-w-[90px]"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-100 max-w-[140px] mb-6"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-100 max-w-[260px] mb-2.5"></div>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-x-2  lg:gap-y-0">
            {!isLoading ? (
              <ProductMeasureList
                product={product as VariableProduct}
                productVariantFilter={productVariantFilter}
                onSelectedMeasure={(measure: any | null) =>
                  setSelectedMeasure(measure)
                }
              />
            ) : (
              <>
                <div className="mb-5">
                  <div className="w-full">
                    <div className="h-6 bg-gray-200 dark:bg-gray-100 max-w-[150px] mb-2.5"></div>
                  </div>
                </div>
              </>
            )}
          {!isLoading ? (
              <ProductBoxList
                product={product as VariableProduct}
                productVariantFilter={productVariantFilter}
                onSelectedBox={(box?: any | undefined) => {
                  setSelectedBox(box || null);
                  setSelectedUse(null);
                  setProductVariantFilter(
                    generateProductVariableFilter(
                      undefined,
                      productVariantFilter,
                      'pa_acabado',
                    ),
                  );
                }}
              />
          ) : (
            <>
              <div className="mb-5">
                <div className="w-full">
                  <div className="h-6 bg-gray-200 dark:bg-gray-100 max-w-[150px] mb-2.5"></div>
                </div>
              </div>
            </>
          )}
            {!isLoading ? (
              <ProductUseList
                product={product as any}
                productVariantFilter={productVariantFilter}
                onSelectedUse={(use: any | undefined) =>
                  setSelectedUse(use || null)
                }
              />
            ) : null}
            {!isLoading ? (
              <ProductAcabadoList
                product={product as any}
                productVariantFilter={productVariantFilter}
                onSelectedAcabado={(acabado) =>
                  setProductVariantFilter(
                    generateProductVariableFilter(
                      acabado,
                      productVariantFilter,
                      'pa_acabado',
                    ),
                  )
                }
              />
            ) : null}
        </div>

        {!isLoading ? (
          <div className="flex items-end">
            <ProductColorDetails
              product={product}
              productVariantFilter={productVariantFilter}
              onSelectedColor={(color: PaColor | undefined) => {
                setSelectedColor(color);
              }}
            />
            {productVariantFilter.length ? (
              <ClearSelectionButton onClear={clearSelection} />
            ) : null}
          </div>
        ) : (
          <>
            <div className="mb-5">
              <div className="w-full">
                <div className="h-3 bg-gray-200 dark:bg-gray-100 max-w-[150px] mb-2.5"></div>
              </div>
            </div>
          </>
        )}

        {color ? (
          <>
            <div className="text-[#000] lg:text-[16px] font-Century-Gothic-Bold">
              {/** <IconCaja className="mr-1" />**/}
              Color Seleccionado:
            </div>
            <div className="font-Century-Gothic flex self-center text-[#838383] w-[150px] mb-2">
              {color.name}
            </div>
          </>
        ) : null}
        <div className="flex flex-row mb-4">
          {!isLoading ? (
            <div className="flex">
              <>
                {product?.type === ProductTypesEnum.Variable ? (
                  <>
                    {checkProductInStock(
                      variantProduct || (product as Product),
                    ) ? (
                      <div className="flex">
                        <div className="mr-2 self-center flex font-Century-Gothic">
                          {productPrecioPor}
                        </div>
                        <ProductInputQuantity
                          product={variantProduct || product}
                          quantity={quantity}
                          maxQuantity={selectedProductMax as any}
                          onChange={(value) => setQuantity(value)}
                          disabled={
                            product?.type === ProductTypesEnum.Variable &&
                            !variantProduct
                          }
                          onDisabledClick={() => {
                            if (
                              product?.type === ProductTypesEnum.Variable &&
                              !variantProduct
                            ) {
                              addToast(
                                'Por favor selecciona una variante antes de ajustar la cantidad.',
                                {
                                  appearance: 'warning',
                                },
                              );
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div>Agotado</div>
                    )}
                  </>
                ) : null}
              </>

              <>
                {product?.type === ProductTypesEnum.Simple ? (
                  <>
                    {color ? (
                      <>
                        <div className="flex self-center Cajanegra font-Century-Gothic">
                          {/** <IconCaja className="mr-1" />**/}
                        </div>
                        <div className="font-Century-Gothic flex self-center text-[#838383] w-[150px]">
                          {color.name}
                        </div>
                      </>
                    ) : null}

                    {checkProductInStock(variantProduct || (product as any)) ? (
                      <div className="flex ">
                        <div className="mr-2 self-center flex font-Century-Gothic">
                          {productPrecioPor}
                        </div>
                        <ProductInputQuantity
                          product={variantProduct || product}
                          quantity={quantity}
                          maxQuantity={selectedProductMax as any}
                          onChange={(value) => setQuantity(value)}
                        />
                      </div>
                    ) : (
                      <div>Agotado</div>
                    )}
                  </>
                ) : null}
              </>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <div className="grid grid-cols-12 w-[300px]">
                  <div className="h-6 bg-gray-200 dark:bg-gray-100 max-w-[150px] mb-2.5 col-span-2 mr-2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-100 max-w-[150px] mb-2.5 col-span-8"></div>
                </div>
              </div>
            </>
          )}

          <div
            className={`pb-2 flex items-center text-[#838383] ml-8 text-[14px] ${
              variantProduct ?? 'hidden'
            }`}
          >
            SKU: {variantProduct?.sku}
          </div>
          {checkProductInStock(product as any) &&
          product?.type === ProductTypesEnum.Simple ? (
            <div className="pb-2 mt-2 flex items-center text-[#838383] text-[14px] ml-4">
              SKU: {product?.sku}
            </div>
          ) : (
            <></>
          )}
        </div>

        {checkProductInStock(product as any) &&
        product?.type === ProductTypesEnum.Simple ? (
          <>
            <div className="mb-6 flex space-x-3">
              <AddCartButton
                product={product}
                quantity={quantity}
                variationProduct={variantProduct as any}
                success={() =>
                  openNecessaryProductDialogStoreAction(
                    product,
                    quantity,
                    variantProduct as VariableProduct,
                  )
                }
              />

              <a
                href={`https://api.whatsapp.com/send?phone=5215581353955&text=%C2%A1Hola!%20%C2%BFMe%20podr%C3%ADan%20ayudar%3F%20Necesito%20m%C3%A1s%20informaci%C3%B3n%20sobre%3A%20${product.name}%20SKU%3A%20${product.sku}%20URL%3A%20${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}${router.asPath}`}
                className={`rounded-[5px] border border-[#0033A1] w-[200px] lg:min-w-[200px] h-[65px] lg:h-[45px] flex justify-center items-center text-[#0033A1] text-[11px] px-4`}
                target="_blank"
              >
                <div className="flex self-center w-[20px] h-[20px] mr-2">
                  <IconWhatsapp />
                </div>
                <div className="flex self-center w-full">
                  SOLICITAR INFORMACIÓN
                </div>
              </a>
            </div>

            <div className="text-[#AF278F] text-[14px] font-Segoe-Ui">
              {ProductTimeDelivery
                ? ProductTimeDelivery
                : isTina
                ? 'Producto exclusivo bajo pedido. Tiempo de entrega (25 a 30 días naturales)'
                : getMarca(product)?.[0]?.toLocaleLowerCase() !== 'hansgrohe' &&
                  getMarca(product)?.[0]?.toLocaleLowerCase() !== 'grohe'
                ? '*Envío a domicilio de 5 a 7 dias hábiles'
                : '*El tiempo de entrega varía de acuerdo al producto y/o existencia'}
            </div>

            {isTina &&
              getMarca(product)?.[0]?.toLocaleLowerCase() === 'izuzzu' &&
              isMonterreyZipCode && (
                <div className="text-[#1a1a1a] text-[14px] font-Segoe-Ui mb-8 ">
                  No disponible para venta en Monterrey
                </div>
              )}

            {isLimited && (
              <div className="text-[#1a1a1a] text-[14px] font-Segoe-Ui mb-8 font-bold">
                No disponible para venta en Monterrey
              </div>
            )}

            {/*{product?.slug === 'sanitario-one-piece-oporto' && (*/}
            {/*  <p className="text-[14px] font-Segoe-Ui my-8 font-bold text-black text-center ">*/}
            {/*    Este descuento no aplica para Monterrey y Área Metropolitana*/}
            {/*  </p>*/}
            {/*)}*/}

            {!productPriceForPart && productAttributeBox ? (
              <div className="mb-6">
                <ProductBoxCalculator
                  variantBox={box as PaCaja}
                  product={product as any}
                  variantProduct={variantProduct as any}
                  quantity={quantity}
                  onQuantity={(quantity) => setQuantity(quantity)}
                />
              </div>
            ) : null}

            {productPriceForPart && productAttributeBox ? (
              <div className="mb-6">
                <ProductPartCalculator
                  variantBox={box as PaCaja}
                  product={product as any}
                  variantProduct={variantProduct as any}
                  quantity={quantity}
                  onQuantity={(quantity) => setQuantity(quantity)}
                />
              </div>
            ) : null}
            {(productAttributeBag &&
              !(isJuntas || isBoquillas) &&
              isPisosMuros) ||
            isAdhesivos ? (
              <div className="mb-6">
                <ProductBagCalculator
                  product={product as any}
                  variantProduct={variantProduct as any}
                  quantity={quantity as any}
                  onQuantity={(quantity) => setQuantity(quantity)}
                />
              </div>
            ) : null}
            {productAttributeBag && isJuntas ? (
              <div className="mb-6">
                <ProductJuntaCalculator
                  product={product as any}
                  variantProduct={variantProduct as any}
                  quantity={quantity}
                  onQuantity={(quantity) => setQuantity(quantity)}
                />
              </div>
            ) : null}
            {productAttributeBag && isBoquillas ? (
              <div className="mb-6">
                <ProductBoquillasCalculator
                  product={variantProduct || (product as any)}
                  quantity={quantity}
                  onQuantity={(quantity) => setQuantity(quantity)}
                />
              </div>
            ) : null}
          </>
        ) : (
          checkProductInStock(product as any) &&
          product?.type === ProductTypesEnum.Variable && (
            <>
              <div
                className={`pb-2 text-[#838383] hidden ${
                  variantProduct ?? 'hidden'
                }`}
              >
                <div className="font-Century-Gothic flex self-center text-[#838383] mb-2 font-bold">
                  {!getProductCategory(
                    variantProduct as SimpleProduct,
                    'tinas',
                  ) &&
                  !getMarca(product)
                    ?.toString()
                    .toLowerCase()
                    .includes('ambiance') &&
                  getStock(variantProduct as SimpleProduct) <= 10 ? (
                    <div>
                      En existencia: {getStock(variantProduct as SimpleProduct)}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4 flex space-x-3">
                <AddCartButton
                  product={product}
                  quantity={quantity}
                  variationProduct={variantProduct}
                  /* active={
                    checkProductInStock(variantProduct as any) &&
                    (variantProduct | product)?.attributes?.nodes.length ===
                      productVariantFilter.length
                  }*/
                  active={checkProductInStock(variantProduct)}
                  success={() =>
                    openNecessaryProductDialogStoreAction(
                      product,
                      quantity,
                      variantProduct as VariableProduct,
                    )
                  }
                />

                <a
                  href={`https://api.whatsapp.com/send?phone=5215581353955&text=%C2%A1Hola!%20%C2%BFMe%20podr%C3%ADan%20ayudar%3F%20Necesito%20m%C3%A1s%20informaci%C3%B3n%20sobre%3A%20${
                    variantProduct?.name || product.name
                  }${
                    variantProduct?.sku
                      ? '%20SKU%3A%20' + variantProduct?.sku
                      : ''
                  }%20URL%3A%20${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}${
                    router.asPath
                  }`}
                  className={`rounded-[5px] border border-[#0033A1] w-[200px] lg:min-w-[200px] h-[65px] lg:h-[45px] flex justify-center items-center text-[#0033A1] text-[11px] px-4`}
                  target="_blank"
                >
                  <div className="flex self-center w-[20px] h-[20px] mr-2">
                    <IconWhatsapp />
                  </div>
                  <div className="flex self-center w-full">
                    SOLICITAR INFORMACIÓN
                  </div>
                </a>
              </div>

              <div className="text-[#AF278F] text-[14px] font-Segoe-Ui mb-8">
                {ProductTimeDelivery
                  ? ProductTimeDelivery
                  : isTina
                  ? 'Producto exclusivo bajo pedido. Tiempo de entrega (25 a 30 días naturales)'
                  : getMarca(product)?.[0]?.toLocaleLowerCase() !==
                      'hansgrohe' &&
                    getMarca(product)?.[0]?.toLocaleLowerCase() !== 'grohe'
                  ? '*Envío a domicilio de 5 a 7 dias hábiles'
                  : '*El tiempo de entrega varía de acuerdo al producto y/o existencia'}
              </div>

              {productAttributeBox ? (
                <div className="mb-6">
                  <ProductBoxCalculator
                    variantBox={box as PaCaja}
                    product={product as any}
                    variantProduct={variantProduct as any}
                    quantity={quantity}
                    onQuantity={(quantity) => setQuantity(quantity)}
                    active={checkProductInStock(variantProduct as any)}
                  />
                </div>
              ) : null}
              {productAttributeBag && !(isJuntas || isBoquillas) ? (
                <div className="mb-6">
                  <ProductBagCalculator
                    product={product as any}
                    variantProduct={variantProduct as any}
                    quantity={quantity}
                    onQuantity={(quantity) => setQuantity(quantity)}
                    active={checkProductInStock(variantProduct as any)}
                  />
                </div>
              ) : null}
              {productAttributeBag && isJuntas ? (
                <div className="mb-6">
                  <ProductJuntaCalculator
                    product={product as any}
                    variantProduct={variantProduct as any}
                    quantity={quantity}
                    onQuantity={(quantity) => setQuantity(quantity)}
                    active={checkProductInStock(variantProduct as any)}
                  />
                </div>
              ) : null}
              {productAttributeBag && isBoquillas ? (
                <div className="mb-6">
                  <ProductBoquillasCalculator
                    product={variantProduct || (product as any)}
                    quantity={quantity}
                    onQuantity={(quantity) => setQuantity(quantity)}
                    active={checkProductInStock(variantProduct as any)}
                  />
                </div>
              ) : null}
            </>
          )
        )}
      </div>
      <NecessaryProductDialog />
    </div>
  );
};

export default ProductDetails;
