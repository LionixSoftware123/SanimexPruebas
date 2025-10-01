import React from 'react';
import CartIcon from '@/images/cart.svg';
import {
  Product as ProductType,
  SimpleProduct,
  VariableProduct,
  ProductCategory,
} from '@/utils/types/generated';
import { getProductBrand } from '@/modules/product/product-utils';
import { useToasts } from 'react-toast-notifications';
import { useCallAction } from '@cobuildlab/react-simple-state';
import { addNecessaryProductCartAction } from '@/modules/cart/cart-actions';
import currencyFormatter from 'currency-formatter';
import { addCartProductNecessaryErrorEvent } from '@/modules/cart/cart-events';

type AddCartNecessaryProductCartButtonProps = {
  product?: ProductType;
  quantity?: number;
  variationProduct?: VariableProduct;
  active?: boolean;
  success?: () => void;
};

const AddCartNecessaryProductCartButton: React.FC<
  AddCartNecessaryProductCartButtonProps
> = ({ product, quantity, variationProduct, active = true, success }) => {
  const { addToast } = useToasts();

  const [addCart, loading] = useCallAction(addNecessaryProductCartAction, {
    onCompleted: () => {
      if (typeof window !== 'undefined') {
        const price = currencyFormatter.unformat(
          (product as SimpleProduct)?.price as string,
          {
            code: 'USD',
          },
        );

        const categories: any = {};

        product?.productCategories?.nodes.forEach((category, i) => {
          if (i)
            categories[`item_category${i}` as keyof any] = (
              category as ProductCategory
            ).name;
          else
            categories['item_category' as keyof any] = (
              category as ProductCategory
            ).name;
        });

        window.gtag('event', 'add_to_cart', {
          items: [
            {
              item_name: product?.name,
              item_id: product?.databaseId,
              price,
              item_brand: getProductBrand(product),
              quantity,
              ...categories,
            },
          ],
        });
      }

      if (success) success();
    },
    onError: (data) => {
      addCartProductNecessaryErrorEvent.dispatch(data);
    },
  });

  const onAddToCart = () => {
    if (!quantity)
      return addToast('Ingrese una cantidad mayor de 0', {
        appearance: 'error',
      });

    if (variationProduct) {
      return addCart({
        productId: product?.databaseId as number,
        quantity,
        variationId: variationProduct?.databaseId as number,
      });
    }

    return addCart({
      productId: product?.databaseId as number,
      quantity,
    });
  };

  return (
    <>
      <button
        className={`rounded-[5px] ${
          active ? 'bg-[#0033A1]' : 'bg-[#0033A1] bg-opacity-60'
        } w-[200px] lg:min-w-[200px] h-[65px] lg:h-[45px] flex items-center text-white text-[11px] px-4`}
        onClick={() => {
          onAddToCart();
        }}
        disabled={loading || !active}
      >
        {loading ? (
          <div className="flex justify-center w-full">
            <svg
              aria-hidden="true"
              className="inline w- h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="flex items-center">
            <CartIcon className="mr-2" />
            AGREGAR AL CARRITO
          </div>
        )}
      </button>
    </>
  );
};

export default AddCartNecessaryProductCartButton;
