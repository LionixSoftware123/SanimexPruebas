import React from 'react';
import Image from 'next/image';
import { Product, SimpleProduct } from '@/utils/types/generated';
import Link from 'next/link';
import { useProductCompareHook } from '@/lib/easysearch/product-compare-hooks';
import { TrashIcon } from '@heroicons/react/24/solid';

type CompareProductHeaderItemProps = {
  product?: Product;
  onRemove?: (product: Product) => void;
};

const CompareProductHeaderItem: React.FC<CompareProductHeaderItemProps> = ({
  product,
  onRemove,
}) => {
  const { dispatch } = useProductCompareHook();

  const handleRemove = () => {
    if (product) {
      dispatch({
        type: 'REMOVE_PRODUCT',
        productId: Number(
          (product as any)?.databaseId ||
            (product as any)?.objectID ||
            (product as any)?.external_id ||
            (product as any)?.id,
        ),
      });

      if (onRemove) {
        onRemove(product);
      }
    }
  };
  let priceDisplay = (product as SimpleProduct)?.price || 0;
  if (typeof priceDisplay === 'number') {
    priceDisplay = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(priceDisplay);
  }

  return (
    <div className="py-6 px-4 items-container border-b border-b-[#C1C1C1C]">
      <div className="text-[14px] grid grid-cols-7 gap-5 ">
        <div className="flex self-center col-span-2 w-full">
          <Link
            href={`/productos/${
              (product as any)?.slug || (product as any)?.product_slug
            }`}
          >
            <div className="relative flex self-center col-span-2 h-[60px] w-[70px]">
              <Image
                fill
                style={{ objectFit: 'cover' }}
                src={
                  (product as any)?.featuredImage?.node?.sourceUrl ||
                  (product as any)?.featuredImage ||
                  (product as any)?.galleryImages?.edges[0]?.node?.sourceUrl ||
                  (product as any)?.product_image ||
                  (product as any)?.image_url
                }
                alt={product?.name as string}
              />
            </div>
          </Link>
        </div>
        <div className="leading-4 col-span-5 ">
          <div className="flex justify-between ">
            <div className="text-[#1C355E] font-Century-Gothic-Bold">
              <Link
                href={`/productos/${
                  (product as any)?.slug || (product as any)?.product_slug
                }`}
              >
                {(product as any)?.name || (product as any)?.product_name}
              </Link>
            </div>
            <button onClick={handleRemove} className="text-gray-300  ml-2">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="text-[#666666] flex space-x-[2px]">
            <div>{priceDisplay}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProductHeaderItem;
