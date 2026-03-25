import React, { useEffect, useState } from 'react';
import {
  SimpleProduct,
  VariableProduct,
  ProductCategory,
  ProductTypesEnum,
} from '@/utils/types/generated';
import PriceDisplay from './PriceDisplay';
import LoadingSkeleton from './LoadingSkeleton';

type ProductPriceDetailsProps = {
  product?: SimpleProduct | VariableProduct;
  setMaxDiscount?: (discount: number) => void;
};

// 1. Función de utilidad para formatear el número a moneda MXN
const formatToCurrency = (value: string | number | undefined | null): string => {
  if (!value) return '';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(num);
};

const ProductPriceDetails: React.FC<ProductPriceDetailsProps> = ({
  product,
  setMaxDiscount,
}) => {
  const price =
    (product as SimpleProduct)?.type === ProductTypesEnum.Simple
      ? (product as SimpleProduct).price?.split(' - ')[0]
      : (product as VariableProduct)?.price;

  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [precioPor] = useState(product?.precioPor);
  const [isLoading, setIsLoading] = useState(true);

  function formatPrecioPor(precioPor: string): string {
    return (
      precioPor.replace(/-/g, ' ').charAt(0).toUpperCase() +
      precioPor.replace(/-/g, ' ').slice(1)
    );
  }

  const formatPriceMts = React.useCallback(
    (price: string): string | null => {
      if (!price) return null;

      // Ahora price viene limpio "28502.19", ya no necesitamos quitar $ o comas con regex complejas
      const prices = price
        .split(' - ')
        .map((p) => Number(p.trim()));

      const priceNumber = prices.length > 1 ? prices[0] : prices[0] || 0;

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

      if (!divisor || Number(divisor) === 0) return null;

      const priceFinal = priceNumber / divisor;

      if (
        Number(priceFinal) &&
        priceFinal !== Infinity &&
        !Number.isNaN(priceFinal)
      ) {
        if (prices.length > 1) {
          const maxPriceFinal = prices[1] / divisor;
          // Usamos la función de formateo aquí también
          return `${formatToCurrency(priceFinal)} - ${formatToCurrency(maxPriceFinal)}`;
        }
        return formatToCurrency(priceFinal);
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
    const priceVal = formatPriceMts(product?.price as any);
    if (priceVal !== null) {
      setFinalPrice(priceVal as any);
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
            // Limpieza simple ya que ahora los valores son numéricos en string
            const vPrice = parseFloat(String(variation.price).replace(/[^0-9.]/g, ''));
            const vRegularPrice = parseFloat(String(variation.regularPrice).replace(/[^0-9.]/g, ''));
            
            const discountPercentage = ((vRegularPrice - vPrice) / vRegularPrice) * 100;
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
            setMessageDiscount(`Hasta un ${formatDiscount(maxDiscount)}% de descuento`);
          } else {
            setMessageDiscount(
              `Desde un ${formatDiscount(minDiscount)}% hasta un ${formatDiscount(maxDiscount)}% de descuento`
            );
          }
        } else {
          setMessageDiscount('');
        }
      } else if (product?.regularPrice && product?.price) {
        const regularPriceNumber = parseFloat(String(product.regularPrice).replace(/[^0-9.]/g, ''));
        const priceNumber = parseFloat(String(product.price).replace(/[^0-9.]/g, ''));
        const discountPercentage = ((regularPriceNumber - priceNumber) / regularPriceNumber) * 100;
        
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
                {/* Aplicamos formatToCurrency al precio regular */}
                Antes <span className="line-through">{formatToCurrency(product?.regularPrice)}</span>
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
            // Formateamos el precio principal para el componente visual
            price={formatToCurrency(price) ?? undefined}
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
