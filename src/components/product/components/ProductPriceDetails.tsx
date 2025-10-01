import React, { useEffect, useState } from 'react';
import {
  SimpleProduct,
  VariableProduct,
  ProductCategory,
  ProductTypesEnum,
} from '@/utils/types/generated';
//import currencyFormatter from 'currency-formatter';
import PriceDisplay from './PriceDisplay';
//import DiscountDisplay from './DiscountDisplay';
import LoadingSkeleton from './LoadingSkeleton';

type ProductPriceDetailsProps = {
  product?: SimpleProduct | VariableProduct;
  setMaxDiscount?: (discount: number) => void;
};

const ProductPriceDetails: React.FC<ProductPriceDetailsProps> = ({
  product,
  setMaxDiscount,
}) => {
  //const discount = calculateDiscount(product);
  //const regularPrice =
  //  (product as SimpleProduct)?.type === ProductTypesEnum.Simple
  //    ? (product as SimpleProduct).regularPrice?.split(' - ')[1]
  //    : (product as VariableProduct)?.regularPrice;

  const price =
    (product as SimpleProduct)?.type === ProductTypesEnum.Simple
      ? (product as SimpleProduct).price?.split(' - ')[0]
      : (product as VariableProduct)?.price;

  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  //const priceDiscount = parseFloat((((regularPrice as any) / (price as any)) * 100).toFixed(2));
  
  const [precioPor] = useState(product?.precioPor);
  const [isLoading, setIsLoading] = useState(true);

  function formatPrecioPor(precioPor: string): string {
    return (
      precioPor.replace(/-/g, ' ').charAt(0).toUpperCase() +
      precioPor.replace(/-/g, ' ').slice(1)
    );
  }

  /*function afterPrecioPor(precioPor: string): string {

    if (precioPor === 'precio-por-caja' ) {
      return (
        ' ' + precioPor.replace(/-/g, ' ').slice('precio-'.length).toLowerCase()
      );
    } else {
      return '';
    }
  }*/

  const formatPriceMts = React.useCallback(
    (price: string): string | null => {
      if (!price) return null;

      // Manejar el caso de rango de precios
      const prices = price
        .split(' - ')
        .map((p) => Number(p.replace(/,/g, '').replace(/\$/g, '')));

      const priceNumber = prices.length > 1 ? prices[0] : prices[0] || 0; // Toma el precio mínimo si es un rango

      const attributeNode = product?.attributes?.nodes.find(
        (node) => (node as ProductCategory)?.slug === 'pa_caja',
      );
      const attributeNodeName = product?.attributes?.nodes.find(
        (node) => (node as ProductCategory)?.name === 'pa_caja',
      );
      const attributeNodeSimpleValue = (attributeNode as any)?.terms?.nodes[0]
        ?.name;
      const attributeNodeVariableValue = (attributeNodeName as any)?.value;
      const divisor = attributeNodeSimpleValue ?? attributeNodeVariableValue;

      if (!divisor || Number(divisor) === 0) return null; // Evitar división por 0 o valores inválidos

      const priceFinal = priceNumber / divisor;

      if (
        Number(priceFinal) &&
        priceFinal !== Infinity &&
        !Number.isNaN(priceFinal)
      ) {
        // Si es un rango, calcula también el precio máximo
        if (prices.length > 1) {
          const maxPriceFinal = prices[1] / divisor;
          return `$${priceFinal.toFixed(2)} - $${maxPriceFinal.toFixed(2)}`;
        }

        return `$${priceFinal.toFixed(2)}`;
      } else {
        return null;
      }
    },
    [product],
  );

  const [precioMts, setPrecioMts] = useState<string | null>(null);
  useEffect(() => {
    const updatedPrecioMts = formatPriceMts(price as string) ?? null;
    setPrecioMts(updatedPrecioMts);
  }, [price, formatPriceMts]);

  useEffect(() => {
    const price = formatPriceMts(product?.price as any);

    if (price !== null) {
      setFinalPrice(price as any);
    }
  }, [product, formatPriceMts]);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [product]);

  const [messageDiscount, setMessageDiscount] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      if ((product as VariableProduct).variations) {
        const discountPercentages = (product as any).variations.nodes.map(
          (variation: any) => {
            const price = parseFloat(
              variation.price.replace('$', '').replace(/,/g, ''),
            );
            const regularPrice = parseFloat(
              variation.regularPrice.replace('$', '').replace(/,/g, ''),
            );
            const discountPercentage =
              ((regularPrice - price) / regularPrice) * 100;
            return discountPercentage;
          },
        );

        const minDiscount = Math.min(...discountPercentages).toFixed(2);
        const maxDiscount = Math.max(...discountPercentages).toFixed(2);

        const formatDiscount = (discount: string) => {
          return discount.endsWith('.00') ? discount.slice(0, -3) : discount;
        };

        if (setMaxDiscount) {
          setMaxDiscount(Number(maxDiscount));
        }
        if (Number(formatDiscount(maxDiscount)) > 0) {
          if (minDiscount === maxDiscount) {
            setMessageDiscount(
              `Hasta un ${formatDiscount(maxDiscount)}% de descuento`,
            );
          } else {
            setMessageDiscount(
              `Desde un ${formatDiscount(
                minDiscount,
              )}% hasta un ${formatDiscount(maxDiscount)}% de descuento`,
            );
          }
        } else {
          setMessageDiscount('');
        }
      } else if (product?.regularPrice && product?.price) {
        const regularPriceNumber = parseFloat(
          product.regularPrice.replace(/[^0-9.-]+/g, ''),
        );
        const priceNumber = parseFloat(product.price.replace(/[^0-9.-]+/g, ''));
        const discountPercentage =
          ((regularPriceNumber - priceNumber) / regularPriceNumber) * 100;
        if (Number(discountPercentage.toFixed(2)) > 0) {
          if (setMaxDiscount) {
            setMaxDiscount(Number(discountPercentage.toFixed(0)));
          }
          setMessageDiscount(`Descuento del ${discountPercentage.toFixed(0)}%`);
        } else {
          setMessageDiscount('');
        }
      } else {
        setMessageDiscount('');
      }
    }
  }, [product, setMaxDiscount]);
  
  return (
    <>
      {!isLoading ? (
        <div className="mb-2">
          {product?.price !== product?.regularPrice ? (
            <div className="text-[#0274CC] text-[16px] font-bold font-Century-Gothic">
              <span>
                Antes <span className="line-through">{product?.regularPrice}</span>
              </span>
            </div>
          ) : null}
          {messageDiscount && (
            <p className="text-[#0274CC] text-[16px] font-bold font-Century-Gothic">
              {messageDiscount}
            </p>
          )}
          <PriceDisplay
            finalPrice={finalPrice}
            price={price ?? undefined}
            precioMts={precioMts}
            precioPor={precioPor ?? undefined}
            formatPrecioPor={formatPrecioPor}
            product={product}
          />
        </div>
      ) : (
        <LoadingSkeleton />
      )}
    </>
  );
};

export default ProductPriceDetails;
