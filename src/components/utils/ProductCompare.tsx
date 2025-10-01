import React, { useState, useEffect } from 'react';
import { Product as ProductType } from '@/utils/types/generated';
import { useProductCompareHook } from '@/lib/easysearch/product-compare-hooks';
import { useToasts } from 'react-toast-notifications';
import IconCompare from '@/images/compare.svg';
import IconCompareWhite from '@/images/comparewhite.svg';
import { IProduct } from '@/lib/easysearch/types/generated';

type ProductCompareProps = {
  product?: ProductType;
};

const ProductCompare: React.FC<ProductCompareProps> = ({ product }) => {
  const { state, dispatch } = useProductCompareHook();
  const { products } = state;
  const [isAdded, setIsAdded] = useState(false);
  const { addToast } = useToasts();

  const handleClick = () => {
    if (product) {
      const productId =
        (product as ProductType)?.databaseId ||
        (product as IProduct)?.external_id ||
        Number((product as any)?.objectID) ||
        product?.id;

      const productIndex = products.findIndex(
        (existingProduct: any) =>
          existingProduct.databaseId === productId ||
          Number(existingProduct.external_id) === productId ||
          Number(existingProduct.objectID) === productId ||
          Number(existingProduct.id) === productId,
      );
      if (productIndex !== -1) {
        dispatch({ type: 'REMOVE_PRODUCT', productId: Number(productId) });
        addToast('Se ha eliminado de comparar productos.', {
          appearance: 'error',
        });
        setIsAdded(false);
      } else {
        dispatch({ type: 'ADD_PRODUCT', product: product as ProductType });
        addToast('Se ha añadido a comparar productos.', {
          appearance: 'success',
        });
        setIsAdded(true);
      }
    }
  };

  useEffect(() => {
    const productId =
      (product as ProductType)?.databaseId ||
      (product as IProduct)?.external_id ||
      product?.id ||
      Number((product as any)?.objectID);

    if (productId) {
      const productExists = products.some(
        (existingProduct: any) =>
          existingProduct?.databaseId === productId ||
          Number(existingProduct?.objectID) === productId ||
          Number(existingProduct?.external_id) === productId ||
          Number(existingProduct?.id) === productId,
      );

      setIsAdded(productExists);
    }
  }, [product, products]);

  return (
    <div className="mr-2">
      <div
        id="tooltip"
        className={`flex   items-center justify-center cursor-pointer h-8 w-8 rounded-full ${
          isAdded ? 'bg-[#1c355e]  text-white' : 'bg-[#fff]'
        }`}
        onClick={handleClick}
      >
        {isAdded ? (
          <>
            <span id="tooltipText">Eliminar de Comparar</span>
            <IconCompareWhite
              style={{ objectFit: 'cover', height: '17px', width: 'auto' }}
            />
          </>
        ) : (
          <>
            <span id="tooltipText">Agregar a Comparar</span>
            <IconCompare
              style={{ objectFit: 'cover', height: '17px', width: 'auto' }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCompare;
