import React, { useState } from 'react';

import { Product as ProductType, SimpleProduct } from '@/utils/types/generated';

import {
  calculateDiscount,
  getPercentDiscount,
  getProductAttributeBag,
  getProductAttributeBox,
  getProductBrand,
  getProductCategory,
} from '@/modules/product/product-utils';
import dynamic from 'next/dynamic';
import { useToasts } from 'react-toast-notifications';
import currencyFormatter from 'currency-formatter';
import { useCallAction } from '@cobuildlab/react-simple-state';
import { addCartProductNecessaryAction } from '@/modules/cart/cart-actions';
import Link from 'next/link';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const ProductBoxCalculator = dynamic(
  () => import('@/components/product/components/ProductBoxCalculator'),
);

const ProductBoquillasCalculator = dynamic(
  () => import('@/components/product/components/ProductBoquillasCalculator'),
);

const ProductJuntaCalculator = dynamic(
  () => import('@/components/product/components/ProductJuntaCalculator'),
);

const ProductBagCalculator = dynamic(
  () => import('@/components/product/components/ProductBagCalculator'),
);

const ProductInputQuantity = dynamic(
  () => import('@/components/product/components/ProductInputQuantity'),
);

type ProductSixProps = {
  product?: ProductType;
};
const ProductSix: React.FC<ProductSixProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const { addToast } = useToasts();
  const discount = calculateDiscount(product);
  const priceDiscount = getPercentDiscount(
    currencyFormatter.unformat(
      ((product as SimpleProduct).regularPrice ||
        (product as SimpleProduct).price) as string,
      {
        code: 'USD',
      },
    ),
    discount,
  );

  const [addCart, loading] = useCallAction(addCartProductNecessaryAction);

  const productAttributeBox = getProductAttributeBox(product);
  const productAttributeBag = getProductAttributeBag(product);
  const isBoquillas = getProductCategory(product, 'boquillas');
  const isJuntas = getProductCategory(product, 'juntas');
  const productSlug = `/productos/${product?.slug}`;

  return (
    <div>
      <div className="hidden lg:grid grid-cols-6 py-6  items-center gap-4 ">
        <div className="col-span-2">
          <div className="grid grid-cols-2">
            <div>
              <div className="relative w-[85px] h-[85px] m-auto">
                <Link href={productSlug}>
                  <ImageWithFallback
                    fill
                    style={{
                      objectFit: 'contain',
                    }}
                    src={product?.featuredImage?.node.sourceUrl as string}
                    alt={product?.name as string}
                  />
                </Link>
              </div>
            </div>
            <div>
              <div className="text-[#0033A1] font-Century-Gothic-Bold text-[10px]">
                {getProductBrand(product)}
              </div>
              <Link href={productSlug}>
                <div className="text-[14px] font-Century-Gothic-Bold">
                  {product?.name}
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <ProductInputQuantity
            product={product}
            quantity={quantity}
            onChange={(value) => setQuantity(value)}
          />
        </div>
        <div className="text-center">
          {(product as SimpleProduct)?.price !==
          (product as SimpleProduct)?.regularPrice ? (
            <>
              <div className="text-[#B2B2B2] text-[14px] font-Century-Gothic">
                antes {(product as SimpleProduct)?.regularPrice} -{' '}
                {priceDiscount}%
              </div>
              <div className="text-[16px] font-Century-Gothic-Bold">
                {(product as SimpleProduct)?.price}
              </div>
            </>
          ) : (
            <>
              <div className="text-[16px] font-Century-Gothic-Bold">
                {' '}
                {(product as SimpleProduct)?.price}
              </div>
            </>
          )}
        </div>

        <div className="col-span-2 mx-6">
          <button
            onClick={() => {
              if (!quantity)
                return addToast('Ingrese una cantidad mayor de 0', {
                  appearance: 'error',
                });
              addCart({
                productId: product?.databaseId as number,
                quantity,
              });
            }}
            className=" bg-[#1C355E] text-white rounded-[2px] uppercase h-[45px] w-full font-Century-Gothic-Bold flex items-center justify-center text-[15px]"
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
              <>AGREGAR AL CARRITO</>
            )}
          </button>
        </div>
        <div className="col-span-full">
          {productAttributeBox ? (
            <div className="mb-6">
              <ProductBoxCalculator
                product={product}
                quantity={quantity}
                onQuantity={(quantity) => setQuantity(quantity)}
              />
            </div>
          ) : null}
          {productAttributeBag && !(isJuntas || isBoquillas) ? (
            <div className="mb-6">
              <ProductBagCalculator
                product={product}
                quantity={quantity}
                onQuantity={(quantity) => setQuantity(quantity)}
              />
            </div>
          ) : null}
          {productAttributeBag && isJuntas ? (
            <div className="mb-6">
              <ProductJuntaCalculator
                product={product}
                quantity={quantity}
                onQuantity={(quantity) => setQuantity(quantity)}
              />
            </div>
          ) : null}
          {productAttributeBag && isBoquillas ? (
            <div className="mb-6">
              <ProductBoquillasCalculator
                product={product}
                quantity={quantity}
                onQuantity={(quantity) => setQuantity(quantity)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductSix;
