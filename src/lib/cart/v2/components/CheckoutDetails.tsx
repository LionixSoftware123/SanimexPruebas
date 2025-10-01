import React from 'react';
import { AppliedCoupon } from '@/utils/types/generated';
import { useStore } from '@cobuildlab/react-simple-state';
import { confirmGeolocationStore } from '@/modules/geolocation/geolocation-events';
import { calculateCost } from '@/modules/geolocation/geolocation-utils';
import dynamic from 'next/dynamic';
import CartCoupon from '@/components/cart/components/CartCoupon';
import { decodeHtmlEntities, formatCurrency } from '../utils/formats';
import { Cart } from '@/lib/cart/v2/cart-types';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

type CheckoutDetailsProps = {
  cart?: Cart | null;
  FreeShipping?: boolean;
};

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  cart,
  FreeShipping,
}) => {
  const { distance } = useStore(confirmGeolocationStore);
  const shipping = calculateCost(distance, FreeShipping);
  const shippingAmount = Number(shipping * 100);
  const totalAmount = Number(cart?.totals?.total_price);
  const total = formatCurrency(totalAmount + shippingAmount);
  const discountTax = Number(cart?.totals?.total_discount_tax);
  const discount = Number(cart?.totals?.total_items_tax);

  const totalDiscount = discountTax ? discount - discountTax : discount;

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
        {cart?.items?.map((item, key) => (
          <div className="col-span-full" key={key}>
            <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-2">
              <div className="col-span-3">
                <div className="relative w-[50px] h-[50px] m-auto">
                  <ImageWithFallback
                    fill
                    style={{ objectFit: 'cover' }}
                    src={item?.images[0]?.src}
                    alt={item?.name}
                  />
                </div>
              </div>
              <div className="col-span-3  flex-col">
                <div className="pb-2">
                  {decodeHtmlEntities(item?.name || '')}
                </div>
              </div>
              <div className="col-span-3  flex items-center justify-center">
                {item?.quantity}
              </div>

              <div className="col-span-3  flex text-end w-full items-center justify-end">
                {formatCurrency(item?.prices?.price)}
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
            {formatCurrency(cart?.totals?.total_items ?? 0)} MXN
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
            {formatCurrency(totalDiscount)} MXN
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
            {formatCurrency(shippingAmount)} MXN
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
            {formatCurrency(cart?.totals?.total_discount ?? 0)} MXN
          </div>
        </div>
        {cart?.coupons?.map((appliedCoupon, key) => (
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
            {total} MXN
          </div>
        </div>
      </div>
      {/* {(totalRegularPrice && totalPrice) || totalDiscount ? (
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
      ) : null} */}
    </div>
  );
};

export default CheckoutDetails;
