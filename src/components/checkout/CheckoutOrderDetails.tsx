import React from 'react';
import { Order, SimpleProduct, LineItem } from '@/utils/types/generated';

import { PaymentMethodEnum } from '@/modules/payment/payment-types';
import currencyFormatter from 'currency-formatter';
import dynamic from 'next/dynamic';
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
type CheckoutOrderDetailsProps = {
  order?: Order;
};

const CheckoutOrderDetails: React.FC<CheckoutOrderDetailsProps> = ({
  order,
}) => {
  const sanitizeCurrencyFormatter = (price: string) => {
    return currencyFormatter.unformat(price, { code: 'USD' });
  };

  const totalRegularPrice = order?.lineItems?.nodes.reduce(
    (acc, curr: LineItem) => {
      if (curr.variation) {
        return (
          acc +
          sanitizeCurrencyFormatter(
            curr?.variation?.node.regularPrice as string,
          ) *
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
    },
    0,
  );

  const totalPrice = order?.lineItems?.nodes.reduce((acc, curr: LineItem) => {
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

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b pb-4">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic-Bold">
            PRODUCTO
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic-Bold">
            TOTAL
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {order &&
          order.lineItems &&
          order.lineItems.nodes.map((node: LineItem, key) => (
            <div className="col-span-full text-[13px] lg:text-[16px]" key={key}>
              <div className="grid grid-cols-12 gap-4 lg:gap-4 border-[#C1C1C1] border-b py-4">
                <div className="col-span-3 lg:col-span-2">
                  <div className="relative w-full lg:w-[80px] h-[50px] md:h-[100px] lg:h-[80px] m-auto">
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
                <div className="col-span-4 lg:col-span-4">
                  {`${
                    node.variation
                      ? node.variation.node.name
                      : node.product?.node.name
                  } x ${node.quantity}`}
                </div>
                <div className="col-span-5 text-end lg:col-span-6 flex items-center justify-end">
                  {`${(node?.product?.node as SimpleProduct)?.price}`}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-4">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic-Bold">
            Subtotal
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic-Bold">
            {order?.subtotal}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-4">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            IVA
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
            {order?.totalTax}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-4">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic-Bold">
            Envío
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic-Bold">
            {order?.shippingTotal}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-4">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic-Bold">
            Método de pago:
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic">
            {order?.paymentMethod === PaymentMethodEnum.OpenPay
              ? 'Tarjeta'
              : 'Transferencia bancaria directa'}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-4">
        <div className="col-span-6">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic-Bold">
            Total
          </div>
        </div>
        <div className="col-span-6 text-end">
          <div className="text-[#1C355E] text-[13px] lg:text-[16px] font-Century-Gothic-Bold">
            {order?.total}
          </div>
        </div>
      </div>

      {totalRegularPrice && totalPrice ? (
        <div className="grid grid-cols-12 gap-4 border-[#C1C1C1] border-b py-4">
          <div className="col-span-6">
            <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
              Te ahorraste
            </div>
          </div>
          <div className="col-span-6 text-end">
            <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
              {currencyFormatter.format(totalRegularPrice - totalPrice, {
                code: 'USD',
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CheckoutOrderDetails;
