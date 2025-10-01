import React, { useState, useEffect } from 'react';
import { useProductCompareHook } from '@/lib/easysearch/product-compare-hooks';
import { useToasts } from 'react-toast-notifications';
import CompareIcon from '@/images/compare.svg';
import { IProduct } from '@/lib/easysearch/types/generated';
import { ProductCompareProps } from '@/lib/easysearch/types';
import { Product } from '@/utils/types/generated';

const EasySearchProductCompare: React.FC<ProductCompareProps> = ({
  product,
}) => {
  const { state, dispatch } = useProductCompareHook();
  const { products } = state;
  const [isAdded, setIsAdded] = useState(false);
  const { addToast } = useToasts();

  const handleClick = () => {
    if (product) {
      const productId = product?.id || (product as IProduct)?.external_id;

      const productIndex = products.findIndex(
        (existingProduct) =>
          (existingProduct as IProduct).external_id === productId ||
          existingProduct.id === productId,
      );
      if (productIndex !== -1) {
        if (typeof productId === 'number') {
          dispatch({ type: 'REMOVE_PRODUCT', productId: productId });
        }
        addToast('Se ha eliminado de comparar productos.', {
          appearance: 'error',
        });
        setIsAdded(false);
      } else {
        dispatch({ type: 'ADD_PRODUCT', product });
        addToast('Se ha añadido a comparar productos.', {
          appearance: 'success',
        });
        setIsAdded(true);
      }
    }
  };

  useEffect(() => {
    const productId =
      (product as Product)?.databaseId ||
      product?.id ||
      Number((product as any)?.objectID) ||
      (product as IProduct)?.external_id;

    if (productId) {
      const productExists = products.some(
        (existingProduct: any) =>
          existingProduct?.databaseId === productId ||
          existingProduct?.id === productId ||
          existingProduct?.objectID === productId,
      );

      setIsAdded(productExists);
    }
  }, [product, products]);

  return (
    <>
      <div className="relative h-[17px] w-[20px] mr-2" onClick={handleClick}>
        {isAdded ? (
          <>
            <div className="flex flex-row gap-2">
              <div>
                <CompareIcon />
              </div>
              <div>
                <span>Comparar</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-2 ">
              <div>
                <CompareIcon />
              </div>
              <div>
                <span>Comparar</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EasySearchProductCompare;
