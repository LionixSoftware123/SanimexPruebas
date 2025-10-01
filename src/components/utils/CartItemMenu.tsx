import React from 'react';
import {
  CartItem,
  ProductAttribute,
  SimpleProduct,
  VariationAttribute,
} from '@/utils/types/generated';
import Link from 'next/link';
import Image from 'next/image';
import TrashIcon from '@/images/icon-papelera.svg';
import { useCallAction } from '@cobuildlab/react-simple-state';
import { removeCartAction } from '@/modules/cart/cart-actions';
import { getImageAttributes } from '@/utils/utils';

type CartItemMenuProps = {
  cartItem: CartItem;
};

export const CartItemMenu: React.FC<CartItemMenuProps> = ({ cartItem }) => {
  const [removeCart, loading] = useCallAction(removeCartAction);
  const { src, alt } = getImageAttributes(cartItem);

  return (
    <div className="py-10 px-4 items-container border-b border-b-[#C1C1C1]">
      <div className="text-[14px] grid grid-cols-7 gap-5 ">
        <div className="flex self-center col-span-2 w-full h-[50px]">
          <Link href={`/productos/${cartItem.product?.node.slug}`}>
            <div className="relative flex self-center col-span-2 h-[60px] w-[70px]">
              <Image
                fill
                style={{ objectFit: 'cover' }}
                src={src as string}
                alt={alt as string}
              />
            </div>
          </Link>
        </div>
        <div className="leading-4 col-span-5 ">
          <div className="flex justify-between w-[200px]">
            <Link href={`/productos/${cartItem.product?.node.slug}`}>
              <div className="text-[#1C355E] font-Century-Gothic-Bold">
                {cartItem.variation
                  ? cartItem.variation.node.name
                  : cartItem.product?.node.name}
              </div>
            </Link>
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
                className="cursor-pointer"
                onClick={() => {
                  removeCart({
                    keys: [cartItem.key],
                    all: false,
                  });
                }}
              />
            )}
          </div>
          <div className="text-[#666666] flex space-x-[2px]">
            <div>
              {cartItem.variation
                ? cartItem.variation.node.price
                : (cartItem?.product?.node as SimpleProduct)?.price}{' '}
              x {cartItem?.quantity}
            </div>
          </div>
          {cartItem.variation ? (
            <>
              {cartItem.variation.node.attributes?.nodes?.map(
                (node: VariationAttribute, key) => {
                  const label = node?.label?.split('-').length
                    ? node?.label?.split('-')[0]
                    : node?.label;
                  return (
                    <div className="flex text-[#111111]" key={key}>
                      <div> {label}: </div>
                      <div className="ml-1 text-[#B2B2B2] first-letter:uppercase">
                        {node?.value}
                      </div>
                    </div>
                  );
                },
              )}
            </>
          ) : (
            <>
              {cartItem?.product?.node.attributes?.nodes.map(
                (node: ProductAttribute, key) => {
                  if (node.name === 'código') {
                    return (
                      <div className="flex text-[#111111]" key={key}>
                        <div>{node.label}:</div>
                        <div className="text-[#B2B2B2] first-letter:uppercase">
                          {node.options?.join(', ')}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className="flex text-[#111111]" key={key}>
                      <div>{node.label}:</div>
                      <div className="text-[#B2B2B2] first-letter:uppercase">
                        {(node.options || []).join(', ').replace(/-/g, ' ')}
                      </div>
                    </div>
                  );
                },
              )}
            </>
          )}

          <div className="flex text-[#111111]">
            Cantidad: {cartItem?.quantity?.toString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemMenu;
