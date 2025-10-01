import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import CartIcon from '@/images/cart.svg';
import { TrashIcon } from '@heroicons/react/24/solid';
import { VariableProduct } from '@/utils/types/generated';
import { generateProductVariableFilter } from '@/modules/product/product-utils';

import { getProductVariableFilter } from '@/modules/product/product-utils';
import ProductCompareSelectMeasures from '../product/components/ProductCompareSelectMeasures';
import ProductCompareSelectBoxs from '../product/components/ProductCompareSelectBoxs';
import ProductCompareSelectUse from '../product/components/ProductCompareSelectUse';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';

interface ProductSliderItemProps {
  product: ExtendedProductCustom;
  index: number;
  handleRemove: (product: ExtendedProductCustom) => void;
  onSuccessFavorite: () => void;
}

type ExtendedProductCustom = VariableProduct & {
  title: string;
  databaseId: number;
  objectID: string;
  galleryImages: {
    edges: [
      {
        node: {
          sourceUrl: string;
        };
      },
    ];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  product_image: string;
  attributes: {
    nodes: [
      {
        terms: any;
        name: string;
      },
    ];
  };
};

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const ProductCompareSelectColor = dynamic(
  () => import('@/components/product/components/ProductCompareSelectColor'),
);
const FavoriteComponent = dynamic(
  () => import('@/components/utils/ProductFavoriteCustom'),
);

const ProductSliderItem: React.FC<ProductSliderItemProps> = ({
  product,
  index,
  handleRemove,
  onSuccessFavorite,
}) => {
  const [productVariantFilter, setProductVariantFilter] = useState<any[]>([]);
  const [productMeasureVariantFilter, setProductMeasureVariantFilter] =
    useState<any[]>([]);
  const [productBoxVariantFilter, setProductBoxVariantFilter] = useState<any[]>(
    [],
  );

  const [productUseVariantFilter, setProductUseVariantFilter] = useState<any[]>(
    [],
  );
  const router = useRouter();

  const [variantProduct, setVariantProduct] = useState<any>(null);
  const [reset, setReset] = useState(false);
  const [selectedUse, setSelectedUse] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMeasure, setSelectedMeasure] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const { addToast } = useToasts();

  const handleSelectedMeasure = (measure: any, index: any) => {
    if (measure) {
      const newMeasureFilter = [...productMeasureVariantFilter];
      const newFilter = generateProductVariableFilter(
        measure,
        productMeasureVariantFilter[index],
        'pa_medidas_cm',
      )[0];

      newMeasureFilter.push(newFilter);

      const productVariable = getProductVariableFilter(product, measure, [
        ...productVariantFilter,
        ...newMeasureFilter,
      ]);

      setProductMeasureVariantFilter(newMeasureFilter);
      setVariantProduct(productVariable);
      setSelectedMeasure((productVariable?.attributes?.nodes[0] as any)?.value);
    }
  };

  const handleSelectedColor = (color: any, index: any) => {
    if (color) {
      const newColorFilter = [...productVariantFilter];
      const newFilter = generateProductVariableFilter(
        color,
        productVariantFilter[index],
        'pa_color',
      )[0];

      newColorFilter.push(newFilter);

      const productVariable = getProductVariableFilter(product, color, [
        ...newColorFilter,
        ...productMeasureVariantFilter,
      ]);
      setProductVariantFilter(newColorFilter);
      setVariantProduct(productVariable);
      setSelectedColor(newFilter?.slug as any);
    }
  };

  const handleSelectedBox = (box: any) => {
    if (box) {
      const boxesWithSamePrice = productBoxVariantFilter.filter(
        (boxVariant) => boxVariant.price === selectedMeasure,
      );

      const newBoxFilter = [...boxesWithSamePrice];
      const newFilter = generateProductVariableFilter(
        box,
        boxesWithSamePrice[0],
        'pa_caja',
      )[0];

      newBoxFilter.push(newFilter);

      const productVariable = getProductVariableFilter(product, box, [
        ...productVariantFilter,
        ...productMeasureVariantFilter,
        ...newBoxFilter,
      ]);

      setProductBoxVariantFilter(newBoxFilter);
      setVariantProduct(productVariable);
      setSelectedBox(newFilter?.name as any);
    }
  };

  const handleSelectedUse = (use: any) => {
    if (use) {
      const usesWithSamePrice = productUseVariantFilter.filter(
        (useVariant) => useVariant.price === selectedMeasure,
      );

      const newUseFilter = [...usesWithSamePrice];
      const newFilter = generateProductVariableFilter(
        use,
        usesWithSamePrice[0],
        'pa_uso',
      )[0];

      newUseFilter.push(newFilter);

      const productVariable = getProductVariableFilter(product, use, [
        ...productVariantFilter,
        ...productMeasureVariantFilter,
        ...newUseFilter,
      ]);

      setProductUseVariantFilter(newUseFilter);
      setVariantProduct(productVariable);

      const usoAttribute = productVariable?.attributes?.nodes.find(
        (node: any) => node.name === 'pa_uso',
      );
      setSelectedUse((usoAttribute as any)?.value);
    }
  };

  const handleBuyProduct = () => {
    router.push({
      pathname: `/productos/${product?.slug}`,
    });
  };

  const currentProduct = variantProduct || product;

  const productPrecioPor =
    product?.precioPor === 'precio-por-pieza'
      ? 'Piezas:'
      : product?.precioPor === 'precio-por-caja'
      ? 'Cajas:'
      : product?.precioPor === 'precio-por-bulto'
      ? 'Bultos:'
      : product?.precioPor === 'precio-por-juego'
      ? 'Precio por juego:'
      : 'Cantidad';

  function getAttributeValue(
    attribute: any,
    selectedColor: any,
    selectedMeasure: any,
    selectedBox: any,
    selectedUse: any,
  ) {
    if (attribute?.name === 'Color') {
      return selectedColor;
    } else if (attribute?.name === 'Medidas (cm)') {
      return selectedMeasure;
    } else if (attribute?.name.includes('Caja')) {
      return selectedBox;
    } else if (attribute?.label === 'Uso') {
      return selectedUse;
    } else {
      return attribute?.terms?.nodes[0]?.name;
    }
  }

  return (
    <div className="lg:mx-4">
      <div
        key={index}
        className="bg-white  border h-full  text-sm text-left text-gray-500 border-r  shadow"
      >
        <div className="flex lg:flex-row justify-end pt-2">
          <div className=" my-2 mx-auto flex justify-center">
            <Link   href={`/productos/${product?.slug}`}>
              <ImageWithFallback
                style={{
                  objectFit: 'cover',
                  minHeight: '100px',
                  height: '200px',
                  width: 'auto',
                  minWidth: '100px',
                }}
                src={
                  variantProduct?.featuredImage.node.sourceUrl ||
                  product?.galleryImages?.edges[0]?.node?.sourceUrl ||
                  product?.featuredImage?.node?.sourceUrl ||
                  product?.product_image
                }
                alt={product?.name as string}
                width={400}
                height={200}
              />
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center mx-4 my-4">
          <div className="w-[33px] h-[33px] place-items-center flex border border-[#F1F1F1] rounded-full bg-white cursor-pointer">
            <button
              id="tooltip"
              onClick={() => {
                handleRemove(product);
                addToast('El producto se ha eliminado de comparar productos', {
                  appearance: 'error',
                });
              }}
              className="text-gray-300 mx-auto"
            >
              <span id="tooltipText">Eliminar de Comparar</span>

              <TrashIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mx-4">
            <FavoriteComponent
              product={
                {
                  ...product,
                  id: product.id ? Number(product.id) : undefined,
                } as any
              }
              onSuccess={onSuccessFavorite}
            />
          </div>
        </div>
        <div className="min-h-[120px]">
          <table>
            <tr className="flex lg:h-6 flex-col md:table-row md:mb-2 ">
              <th
                scope="col"
                className="px-6 md:table-cell text-[#000]  w-[40%]"
              >
                Nombre
              </th>
              <td className="px-6 lg:h-6  md:table-cell mb-2  lg:w-[60%]">
                <Link   href={`/productos/${product?.slug}`}>
                  <span className="font-bold text-[#1c355e] text-[16px] ">
                    {currentProduct.name}
                  </span>
                </Link>
              </td>
            </tr>
            <tr></tr>

            <tr className="flex flex-col md:table-row">
              <th
                scope="col"
                className="px-6 py-1 md:table-cell text-[#000] lg:w-[40%]"
              >
                {productPrecioPor}
              </th>
              <td className="px-6  font-bold md:table-cell text-[#000] lg:w-[60%]">
                <h2 className="text-[16px] lg:mt-4 ">
                  {currentProduct.price ?? product.price}
                </h2>
              </td>
            </tr>
          </table>
        </div>
        <div className="lg:mx-6 flex justify-center lg:justify-start mt-4 mb-4">
          <button
            onClick={handleBuyProduct}
            className={`rounded-[5px] bg-[#0033A1] lg:w-[100%] lg:min-w-[200px] h-[45px] lg:h-[45px] flex items-center text-white text-[11px] px-4`}
          >
            <div className="flex items-center justify-center mx-auto">
              <CartIcon className="mr-2" />
              <span className="font-bold">COMPRAR PRODUCTO</span>
            </div>
          </button>
        </div>

        <div className="px-6">
          <ProductCompareSelectMeasures
            product={product as any}
            productVariantFilter={productMeasureVariantFilter}
            onSelectedMeasure={(measure, index) =>
              handleSelectedMeasure(measure, index)
            }
            reset={reset}
          />
        </div>
        <div className="px-6">
          <ProductCompareSelectBoxs
            product={product as any}
            productVariantFilter={productBoxVariantFilter}
            onSelectedBox={(box) => handleSelectedBox(box)}
            reset={reset}
            selectedMeasure={selectedMeasure || 'a'}
          />
        </div>
        <div className="px-6">
          <ProductCompareSelectUse
            product={product as any}
            productVariantFilter={productBoxVariantFilter}
            onSelectedUse={(use) => handleSelectedUse(use)}
            reset={reset}
          />
        </div>
        <div className="px-6">
          <ProductCompareSelectColor
            product={product as any}
            productVariantFilter={productVariantFilter}
            onSelectedColor={(color, index) =>
              handleSelectedColor(color, index)
            }
            reset={reset}
          />
        </div>
        {selectedMeasure || selectedBox || selectedUse || selectedColor ? (
          <div className="px-6">
            <button
              onClick={() => {
                setVariantProduct(null);
                setSelectedMeasure(null);
                setReset(!reset);
                setProductMeasureVariantFilter([]);
                setProductVariantFilter([]);
                setSelectedBox(null);
                setProductBoxVariantFilter([]);
                setSelectedUse(null);
                setSelectedColor(null);
              }}
            >
              X Limpiar
            </button>
          </div>
        ) : null}

        {product?.attributes?.nodes ? (
          <h1 className="px-6 py-4 font-bold h-18 text-[#000] text-[14px]">
            Información Adicional:
          </h1>
        ) : null}
        <table className="w-full">
          {product?.attributes?.nodes
            ? product?.attributes?.nodes
                .filter(
                  (attribute: any) =>
                    attribute?.name !== 'código' &&
                    attribute?.name !== 'Observaciones',
                )
                .map((attribute) => {
                  const attributeValue =
                    getAttributeValue(
                      attribute,
                      selectedColor,
                      selectedMeasure,
                      selectedBox,
                      selectedUse,
                    ) || (attribute as any)?.terms?.nodes[0]?.name;

                  if (!attributeValue) {
                    return null;
                  }

                  return (
                    <tr
                      key={(attribute as any)?.name}
                      className="flex flex-col md:table-row border-t w-full "
                    >
                      <th
                        scope="col"
                        className="px-6  py-1 text-[14px] md:table-cell text-[#000]"
                      >
                        {`${(attribute as any)?.name}:`}
                      </th>
                      <td className="px-6 py-2 text-[14px] md:table-cell font-bold">
                        {attributeValue}
                      </td>
                    </tr>
                  );
                })
            : null}
        </table>
      </div>
    </div>
  );
};

export default ProductSliderItem;
