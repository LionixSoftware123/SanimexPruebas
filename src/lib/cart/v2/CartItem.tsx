import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import ImageWithFallback from '@/utils/ImageWithFallback';
import dynamic from 'next/dynamic';
import { useCallAction } from '@cobuildlab/react-simple-state';
import Link from 'next/link';
import { CartItem, CartItemVariation } from './cart-types';
import { formatCurrency } from './utils/formats';
import { addCartAction, removeCartAction } from '@/lib/cart/v2/cart-actions';

import { useCartHook } from './cart-hooks';
import { useToasts } from 'react-toast-notifications';

const ProductInputQuantity = dynamic(
  () => import('@/lib/cart/v2/components/ProductInputQuantity'),
);

type CartItemProps = {
  cartItem: CartItem;
};

const CartItemComponent: React.FC<CartItemProps> = ({ cartItem }) => {
  const [quantity, setQuantity] = useState<number>(
    cartItem?.quantity as number,
  );
  const { addToast } = useToasts();

  const { updateCart } = useCartHook();

  const [callRemoveCart, loading] = useCallAction(removeCartAction, {
    onCompleted: (data) => {
      updateCart?.(data?.cart);
      // addToast('El producto se ha eliminado del carrito correctamente!', {
      //   appearance: 'success',
      // });
    },
    onError: () => {
      addToast('Tenemos problemas para agregar el producto!', {
        appearance: 'error',
      });
    },
  });
  const [callAddCart] = useCallAction(addCartAction, {
    onCompleted: (data) => {
      updateCart?.(data?.cart);
      // addToast('El carrito se ha actualizado correctamente correctamente!', {
      //   appearance: 'success',
      // });
    },
    onError: () => {
      // addToast('Tenemos problemas para agregar el producto!', {
      //   appearance: 'error',
      // });
    },
  });

  const onHandleUpdate = (_quantity: number) => {
    const difference = _quantity - quantity;

    callAddCart({
      id: cartItem.id,
      quantity: difference,
    });

    setQuantity(_quantity);
  };

  const productSlug = `${cartItem?.permalink.replace(
    'https://sanimex.com.mx',
    '',
  )}`;

  return (
    <div className="grid grid-cols-12 py-8 border-[#C1C1C1] border-b items-center gap-4 mb-6">
      <div className="col-span-4 ">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="relative w-[85px] h-[85px] m-auto">
              <Link href={productSlug}>
                <ImageWithFallback
                  fill
                  style={{ objectFit: 'cover' }}
                  src={cartItem?.images[0].thumbnail as string}
                  alt={cartItem?.name as string}
                />
              </Link>
            </div>
          </div>
          <div className="col-span-2">
            <Link href={productSlug}>
              <div
                className="text-[#0033A1] font-Century-Gothic-Bold"
                dangerouslySetInnerHTML={{ __html: cartItem?.name }}
              ></div>
            </Link>

            <div className="flex gap-2 text-[#111111] font-Century-Gothic">
              <span className="font-Century-Gothic">Código:</span>
              <span className="text-[#B2B2B2] first-letter:uppercase">
                {cartItem?.sku}
              </span>
            </div>

            {cartItem?.variation &&
              cartItem?.variation?.map(
                (item: CartItemVariation, key: number) => {
                  return (
                    <div className="flex gap-2 text-[#111111]" key={key}>
                      <span className="font-Century-Gothic">
                        {item.attribute}:
                      </span>
                      <span className="text-[#B2B2B2] first-letter:uppercase">
                        {item.value}
                      </span>
                    </div>
                  );
                },
              )}
          </div>
        </div>
      </div>
      <div className="col-span-3 text-center text-[10px] text-[#666666] flex justify-center">
        <ProductInputQuantity
          quantity={quantity}
          product={cartItem}
          onChange={(value) => onHandleUpdate(value)}
        />
      </div>      
      <div className="col-span-3 text-center ">
        <>
          {cartItem?.prices?.price !== cartItem?.prices?.regular_price ? (
            <>
              <div className="line-through text-[#666666] text-[14px]">
                antes {formatCurrency(cartItem?.prices?.regular_price)} MXN
              </div>
              <div className="text-[#666666] font-Century-Gothic-Bold text-[14px]">
                con descuento {formatCurrency(cartItem?.prices?.price)} MXN
              </div>
            </>
          ) : (
            <div className="text-[#666666] font-Century-Gothic-Bold text-[14px]">
              {formatCurrency(cartItem?.prices?.price)} MXN
            </div>
          )}
        </>
      </div>
      <div className="col-span-2 ">
        <div className="text-end">
          <div className="flex justify-end items-center">
            <div className="text-[#666666] mr-3 font-Century-Gothic-Bold text-[14px]">
              {formatCurrency(cartItem?.totals?.line_subtotal ?? 0)} MXN
            </div>
            {loading ? (
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            ) : (
              <TrashIcon
                onClick={() =>
                  callRemoveCart({
                    keys: [cartItem.key],
                  })
                }
                className="h-[18px] w-[16px] relative z-1 cursor-pointer text-[#666666]"
              />
            )}
          </div>
        </div>
      </div>
      <div className="col-span-1 w-[85px]  h-[5px]"></div>
      <div className="col-span-8 ml-4">
        <div>
          {cartItem &&
            cartItem?.variation &&
            (cartItem?.name === 'Sanitario Paquete Sienna con Accesorios' ||
              cartItem?.name === 'Sanitario Paquete Sienna con Accesorios') && (
              <span className="text-[#93278F] font-Century-Gothic text-[16px] mb-10">
                Producto hasta agotar existencias
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
