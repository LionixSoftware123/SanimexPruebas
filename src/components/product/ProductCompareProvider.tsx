import React, { useReducer, useEffect } from 'react';
import { Product } from '@/utils/types/generated';
import {
  ProductContext,
  ProductContextType,
} from '@/components/product/ProductCompareContext';

type Action =
  | { type: 'ADD_PRODUCT'; product: Product }
  | { type: 'REMOVE_PRODUCT'; productId: number };

const reducer = (
  state: ProductContextType,
  action: Action,
): ProductContextType => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        productAdded: true,
        products: [...state.products, action.product],
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          (product: any) =>
            product.databaseId !== action.productId &&
            Number(product?.objectID) !== Number(action?.productId) &&
            Number(product?.external_id) !== Number(action?.productId) &&
            String(product?.id) !== String(action?.productId),
        ),
      };
    default:
      return state;
  }
};

export const ProductCompareProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    productAdded: false,
    products: [],
  });

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem('compareProducts') || '{}',
    );
    if (storedData) {
      const now = new Date().getTime();
      const dataAge = (now - storedData.timestamp) / (1000 * 60 * 60 * 24);
      if (dataAge <= 15) {
        storedData.products.forEach((product: any) => {
          dispatch({ type: 'ADD_PRODUCT', product });
        });
      } else {
        localStorage.removeItem('compareProducts');
      }
    }
  }, []);

  useEffect(() => {
    const dataToStore = {
      timestamp: new Date().getTime(),
      products: state.products,
    };
    localStorage.setItem('compareProducts', JSON.stringify(dataToStore));
  }, [state.products]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
