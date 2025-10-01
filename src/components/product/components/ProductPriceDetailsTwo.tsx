import React from 'react';
import {
  SimpleProduct,
  VariableProduct,
  ProductCategory,
  ProductTypesEnum,
} from '@/utils/types/generated';
import {
  calculateDiscount,
  getPercentDiscount,
} from '@/modules/product/product-utils';
import currencyFormatter from 'currency-formatter';
import { getMarca } from '@/modules/product/product-utils';
type ProductPriceDetailsProps = {
  product?: SimpleProduct | VariableProduct;
};

const ProductPriceDetailsTwo: React.FC<ProductPriceDetailsProps> = ({
  product,
}) => {
  const discount = calculateDiscount(product);
  const isTina = product?.productCategories?.nodes.find(
    (node) => (node as ProductCategory).slug === 'tinas',
  );
  const regularPrice =
    (product as SimpleProduct)?.type === ProductTypesEnum.Variable
      ? (product as SimpleProduct).regularPrice?.split(' - ')[1]
      : (product as SimpleProduct)?.regularPrice;
  const price =
    (product as SimpleProduct)?.type === ProductTypesEnum.Variable
      ? (product as SimpleProduct).price?.split(' - ')[0]
      : (product as SimpleProduct)?.price;

  const priceDiscount = getPercentDiscount(
    currencyFormatter.unformat(regularPrice as string, {
      code: 'USD',
    }),
    discount,
  );

  return (
    <div className="mb-2">
      {product?.price !== product?.regularPrice && priceDiscount ? (
        <>
          <div className="text-[20px]  font-Century-Gothic-Bold">{price}</div>
        </>
      ) : (
        <>
          <div className="text-[20px] font-Century-Gothic-Bold">{price}</div>
        </>
      )}
      <div className="text-[#93278F] text-[12px] font-Segoe-Ui">
        {isTina
          ? 'Producto exclusivo bajo pedido. Tiempo de entrega (25 a 30 días naturales)'
          : getMarca(product)?.[0]?.toLocaleLowerCase() !== 'hansgrohe' &&
            getMarca(product)?.[0]?.toLocaleLowerCase() !== 'grohe'
          ? '*Envío a domicilio de 5 a 7 dias hábiles'
          : '*El tiempo de entrega varía de acuerdo al producto y/o existencia'}
      </div>
    </div>
  );
};

export default ProductPriceDetailsTwo;
