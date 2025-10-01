import React from 'react';
import {
  Cart as CartType,
  SimpleProduct,
  AppliedCoupon,
} from '@/utils/types/generated';
import currencyFormatter from 'currency-formatter';
import { useStore } from '@cobuildlab/react-simple-state';
import { confirmGeolocationStore } from '@/modules/geolocation/geolocation-events';
import { calculateCost } from '@/modules/geolocation/geolocation-utils';
import dynamic from 'next/dynamic';
import CartCoupon from '@/components/cart/components/CartCoupon';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

type CheckoutDetailsProps = {
  cart?: CartType;
  FreeShipping?: boolean;
};

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  cart,
  FreeShipping,
}) => {
  const { distance } = useStore(confirmGeolocationStore);

  const total = currencyFormatter.unformat(cart?.total as string, {
    code: 'USD',
  });

  const sanitizeCurrencyFormatter = (price: string) => {
    return currencyFormatter.unformat(price, { code: 'USD' });
  };

  const totalRegularPrice = cart?.contents?.nodes.reduce((acc, curr) => {
    if (curr.variation) {
      return (
        acc +
        sanitizeCurrencyFormatter(curr?.variation.node.regularPrice as string) *
          (curr?.quantity || 1)
      );
    }
    return (
      acc +
      sanitizeCurrencyFormatter(
        (curr?.product?.node as SimpleProduct)?.regularPrice as string,
      ) *
        (curr?.quantity || 1)
    );
  }, 0);

  const totalPrice = cart?.contents?.nodes.reduce((acc, curr) => {
    if (curr.variation) {
      return (
        acc +
        sanitizeCurrencyFormatter(curr?.variation.node.price as string) *
          (curr?.quantity || 1)
      );
    }
    return (
      acc +
      sanitizeCurrencyFormatter(
        (curr?.product?.node as SimpleProduct)?.price as string,
      ) *
        (curr?.quantity || 1)
    );
  }, 0);

  const totalDiscount = sanitizeCurrencyFormatter(
    cart?.discountTotal as string,
  );

  const shippingAmount = calculateCost(distance, FreeShipping);

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b pb-2">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            PRODUCTO
          </div>
        </div>
        <div className="col-span-3 text-center">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            CANTIDAD
          </div>
        </div>
        <div className="col-span-3 text-end">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            SUBTOTAL
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {cart &&
          cart.contents &&
          cart.contents.nodes.map((node, key) => (
            <div className="col-span-full" key={key}>
              <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-2">
                <div className="col-span-3">
                  <div className="relative w-[50px] h-[50px] m-auto">
                    <ImageWithFallback
                      fill
                      style={{ objectFit: 'cover' }}
                      src={
                        (node.variation
                          ? node.variation.node.featuredImage?.node.sourceUrl
                          : node.product?.node.featuredImage?.node
                              .sourceUrl) as string
                      }
                      alt={
                        (node.variation
                          ? node.variation.node.name
                          : node.product?.node.name) as string
                      }
                    />
                  </div>
                </div>
                <div className="col-span-3  flex-col">
                  <div className="pb-2">
                    {`${
                      node.variation
                        ? node.variation.node.name
                        : node.product?.node.name
                    } `}
                  </div>
                </div>
                <div className="col-span-3  flex items-center justify-center">
                  {`
                    ${node.quantity}
                  `}
                </div>

                <div className="col-span-3  flex text-end w-full items-center justify-end">
                  {`${
                    node.variation
                      ? node.variation.node.price
                      : (node?.product?.node as SimpleProduct)?.price
                  }`}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-2">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            Subtotal
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            {cart?.subtotal}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-2">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            IVA
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            {cart?.totalTax}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-2">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            Envío
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            ${shippingAmount.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-2">
        <div className="col-span-6">
          <div className="text-[#0033A1] text-[16px] font-Century-Gothic-Bold">
            Descuento
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#0033A1] text-[16px] font-Century-Gothic-Bold">
            {cart?.discountTotal}
          </div>
        </div>
        {cart?.appliedCoupons?.map((appliedCoupon, key) => (
          <CartCoupon coupon={appliedCoupon as AppliedCoupon} key={key} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-2">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            Total
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            {currencyFormatter.format(total + shippingAmount, {
              code: 'USD',
            })}
          </div>
        </div>
      </div>
      {(totalRegularPrice && totalPrice) || totalDiscount ? (
        <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-2">
          <div className="col-span-6">
            <div className="text-[#0274CC] text-[16px] font-Century-Gothic-Bold">
              Te estás ahorrando
            </div>
          </div>
          <div className="col-span-6 text-end">
            <div className="text-[#0274CC] text-[16px] font-Century-Gothic-Bold">
              {currencyFormatter.format(
                (totalRegularPrice || 0) - (totalPrice || 0) + totalDiscount,
                {
                  code: 'USD',
                },
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CheckoutDetails;
