import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import {
  checkProductInStock,
  generateProductVariableFilter,
  getProductAttributeBag,
  getProductAttributeBox,
  getProductBrand,
  getProductCategory,
  getProductVariableByFilter,
} from '@/modules/product/product-utils';

import {
  Product as ProductType,
  PaCaja,
  ProductTypesEnum,
  useFetchProductLazyQuery,
  ProductIdTypeEnum,
  VariableProduct,
} from '@/utils/types/generated';
import Link from 'next/link';
import CrossClose from '@/images/crossClose.svg';
import { useRouter } from 'next/router';
import { ProductVariantFilter } from '@/modules/product/product-types';

const ProductPriceDetails = dynamic(
  () => import('@/components/product/components/ProductPriceDetailsTwo'),
);
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const ProductMeasureList = dynamic(
  () => import('@/components/product/components/ProductMeasureList'),
);
const ProductBoxList = dynamic(
  () => import('@/components/product/components/ProductBoxList'),
);
const ProductUseList = dynamic(
  () => import('@/components/product/components/ProductUseList'),
);
const ProductColorSimpleDetails = dynamic(
  () => import('@/components/product/components/ProductColorSimpleDetails'),
);
const AddNecessaryProductCartButton = dynamic(
  () => import('@/lib/cart/v2/components/AddNecessaryProductCartButton'),
);
const ProductBoxCalculator = dynamic(
  () => import('@/components/product/components/ProductBoxCalculator'),
);

const ProductBagCalculator = dynamic(
  () => import('@/components/product/components/ProductBagCalculator'),
);
const ProductBoquillasCalculator = dynamic(
  () => import('@/components/product/components/ProductBoquillasCalculator'),
);

const ProductJuntaCalculator = dynamic(
  () => import('@/components/product/components/ProductJuntaCalculator'),
);

const ProductAcabadoList = dynamic(
  () => import('@/components/product/components/ProductAcabadoList'),
);

type ProductFourProps = {
  productIn?: ProductType;
  closeModal?: () => void;
};
const ProductFour: React.FC<ProductFourProps> = ({ productIn, closeModal }) => {
  const [product, setProduct] = useState<ProductType>();
  const [quantity, setQuantity] = useState<number>(1);
  const [variantProduct, setVariantProduct] = useState<ProductType | undefined>(
    undefined,
  );

  const ProductInputQuantity = dynamic(
    () => import('@/components/product/components/ProductInputQuantityTwo'),
  );

  const productAttributeBox = getProductAttributeBox(product);
  const productAttributeBag = getProductAttributeBag(product);
  const isBoquillas = getProductCategory(product, 'boquillas');
  const isJuntas = getProductCategory(product, 'juntas');
  const router = useRouter();

  const [productVariantFilter, setProductVariantFilter] = useState<
    ProductVariantFilter[]
  >([]);

  const [fetchProduct, { loading }] = useFetchProductLazyQuery({
    onCompleted: (data) => {
      setProduct(data.product as ProductType);
    },
  });
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
    fetchProduct({
      variables: {
        id: productIn?.slug ?? '',
        idType: ProductIdTypeEnum.Slug,
      },
    });
  }, [fetchProduct, productIn?.slug]);

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

  const productSlug = `/productos/${product?.slug}`;

  const color = productVariantFilter.find(
    (variant) => variant.taxonomyName === 'pa_color',
  );
  const box = productVariantFilter.find(
    (variant) => variant.taxonomyName === 'pa_caja',
  );

  return (
    <>
      {!loading ? (
        <div className=" pt-2 grid grid-cols-12 sm:gap-1 px-4 sm:px-0">
          <div className="col-span-full sm:col-span-3 ">
            <div className="relative w-[73px] h-[73px] lg:w-[100px] lg:h-[100px] m-auto">
              <Link href={productSlug} onClick={closeModal}>
                <ImageWithFallback
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                  src={product?.featuredImage?.node.sourceUrl as string}
                  alt={product?.name as string}
                />
              </Link>
            </div>
          </div>
          <div className="col-span-full sm:col-span-9 flex flex-col justify-center ">
            <div className="text-[#555555] uppercase mb-1 font-Century-Gothic-Bold text-[14px] ">
              {getProductBrand(product)}
            </div>
            <div className="flex justify-between items-center mb-1">
              <Link href={productSlug} onClick={closeModal}>
                <div className="font-Century-Gothic-Bold text-[14px] text-[#0033A1]  w-[160px]">
                  {product?.name}
                </div>
              </Link>
            </div>

            <div className=" overflow-y-auto">
              <ProductPriceDetails product={variantProduct || product} />
              <ProductMeasureList
                product={product}
                productVariantFilter={productVariantFilter}
                onSelectedMeasure={(measure) =>
                  setProductVariantFilter(
                    generateProductVariableFilter(
                      measure,
                      productVariantFilter,
                      'pa_medidas-cm',
                    ),
                  )
                }
              />
              <ProductAcabadoList
                product={product}
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
              <ProductBoxList
                product={product}
                productVariantFilter={productVariantFilter}
                onSelectedBox={(box) =>
                  setProductVariantFilter(
                    generateProductVariableFilter(
                      box,
                      productVariantFilter,
                      'pa_caja',
                    ),
                  )
                }
              />

              <ProductUseList
                product={product}
                productVariantFilter={productVariantFilter}
                onSelectedUse={(use) =>
                  setProductVariantFilter(
                    generateProductVariableFilter(
                      use,
                      productVariantFilter,
                      'pa_uso',
                    ),
                  )
                }
              />
              <div className="flex ">
                <ProductColorSimpleDetails
                  product={product}
                  productVariantFilter={productVariantFilter}
                  onSelectedColor={(color) =>
                    setProductVariantFilter(
                      generateProductVariableFilter(
                        color,
                        productVariantFilter,
                        'pa_color',
                      ),
                    )
                  }
                />
                {productVariantFilter.length ? (
                  <div
                    className="flex h-[30px] items-center  text-[10px] cursor-pointer mb-2"
                    onClick={() => {
                      setProductVariantFilter([]);
                      setVariantProduct(undefined);
                    }}
                  >
                    <div className="w-[12px] flex self-center h-[12px] mr-1">
                      <CrossClose />
                    </div>
                    <div className="flex self-center">Limpiar</div>
                  </div>
                ) : null}
              </div>

              <div className="mb-2 flex space-x-3">
                <>
                  {product?.type === ProductTypesEnum.Variable ? (
                    <>
                      {color ? (
                        <>
                          <div className="flex self-center Cajanegra mr-2 font-Century-Gothic">
                            {/** <IconCaja className="mr-1" />**/}
                            Color:
                          </div>
                          <div className="font-Century-Gothic flex self-center text-[#838383] w-[150px]">
                            {color.name}
                          </div>
                        </>
                      ) : null}
                      {checkProductInStock(variantProduct || product) ? (
                        <div className="flex space-x-2">
                          <div className="mr-2 self-center flex font-Century-Gothic">
                            {productAttributeBox ? 'Cajas:' : ''}
                            {productAttributeBag && !(isJuntas || isBoquillas)
                              ? 'Bultos:'
                              : ''}
                            {productAttributeBag && (isJuntas || isBoquillas)
                              ? 'Cajas:'
                              : ''}
                            {!productAttributeBox &&
                            !(
                              productAttributeBag && !(isJuntas || isBoquillas)
                            ) &&
                            !(
                              (productAttributeBag && isJuntas) ||
                              (productAttributeBag && isBoquillas)
                            )
                              ? 'Cantidad:'
                              : ''}
                          </div>
                          <ProductInputQuantity
                            product={variantProduct || product}
                            quantity={quantity}
                            onChange={(value) => setQuantity(value)}
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
                      {checkProductInStock(variantProduct || product) ? (
                        <div className="flex">
                          <div className="mr-2 self-center flex font-Century-Gothic">
                            {productAttributeBox ? 'Cajas:' : ''}
                            {productAttributeBag && !(isJuntas || isBoquillas)
                              ? 'Bultos:'
                              : ''}
                            {productAttributeBag && (isJuntas || isBoquillas)
                              ? 'Cajas:'
                              : ''}
                            {!productAttributeBox &&
                            !(
                              productAttributeBag && !(isJuntas || isBoquillas)
                            ) &&
                            !(
                              (productAttributeBag && isJuntas) ||
                              (productAttributeBag && isBoquillas)
                            )
                              ? 'Cantidad:'
                              : ''}
                          </div>
                          <ProductInputQuantity
                            product={variantProduct || product}
                            quantity={quantity}
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
              {checkProductInStock(product) &&
              product?.type === ProductTypesEnum.Simple ? (
                <>
                  <div className="mb-6 flex space-x-3">
                    <AddNecessaryProductCartButton
                      product={product}
                      quantity={quantity}
                      variationProduct={variantProduct}
                    />
                  </div>
                  {productAttributeBox ? (
                    <div className="mb-6">
                      <ProductBoxCalculator
                        variantBox={box as PaCaja}
                        product={product}
                        variantProduct={variantProduct}
                        quantity={quantity}
                        onQuantity={(quantity) => setQuantity(quantity)}
                      />
                    </div>
                  ) : null}
                  {productAttributeBag && !(isJuntas || isBoquillas) ? (
                    <div className="mb-6">
                      <ProductBagCalculator
                        product={variantProduct || product}
                        quantity={quantity}
                        onQuantity={(quantity) => setQuantity(quantity)}
                      />
                    </div>
                  ) : null}
                  {productAttributeBag && isJuntas ? (
                    <div className="mb-6">
                      <ProductJuntaCalculator
                        product={variantProduct || product}
                        quantity={quantity}
                        onQuantity={(quantity) => setQuantity(quantity)}
                      />
                    </div>
                  ) : null}
                  {productAttributeBag && isBoquillas ? (
                    <div className="mb-6">
                      <ProductBoquillasCalculator
                        product={variantProduct || product}
                        quantity={quantity}
                        onQuantity={(quantity) => setQuantity(quantity)}
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                checkProductInStock(product) &&
                product?.type === ProductTypesEnum.Variable && (
                  <>
                    <div className="mb-6 flex space-x-3">
                      <AddNecessaryProductCartButton
                        product={product}
                        quantity={quantity}
                        variationProduct={variantProduct}
                        active={
                          checkProductInStock(variantProduct) &&
                          variantProduct?.attributes?.nodes.length ===
                            productVariantFilter.length
                        }
                      />
                    </div>
                    {productAttributeBox ? (
                      <div className="mb-6">
                        <ProductBoxCalculator
                          variantBox={box as PaCaja}
                          product={product}
                          variantProduct={variantProduct}
                          quantity={quantity}
                          onQuantity={(quantity) => setQuantity(quantity)}
                        />
                      </div>
                    ) : null}
                    {productAttributeBag && !(isJuntas || isBoquillas) ? (
                      <div className="mb-6">
                        <ProductBagCalculator
                          product={variantProduct || product}
                          quantity={quantity}
                          onQuantity={(quantity) => setQuantity(quantity)}
                          active={checkProductInStock(variantProduct)}
                        />
                      </div>
                    ) : null}
                    {productAttributeBag && isJuntas ? (
                      <div className="mb-6">
                        <ProductJuntaCalculator
                          product={variantProduct || product}
                          quantity={quantity}
                          onQuantity={(quantity) => setQuantity(quantity)}
                          active={checkProductInStock(variantProduct)}
                        />
                      </div>
                    ) : null}
                    {productAttributeBag && isBoquillas ? (
                      <div className="mb-6">
                        <ProductBoquillasCalculator
                          product={variantProduct || product}
                          quantity={quantity}
                          onQuantity={(quantity) => setQuantity(quantity)}
                          active={checkProductInStock(variantProduct)}
                        />
                      </div>
                    ) : null}
                  </>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center h-[80px]">Cargando...</div>
      )}
    </>
  );
};

export default ProductFour;
