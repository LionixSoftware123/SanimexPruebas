import React from 'react';
import Image from 'next/image';
import {
  Product,
  SaveFavoriteProductResponseEnum,
  SimpleProduct,
  useSaveFavoriteProductMutation,
} from '@/utils/types/generated';
import Link from 'next/link';
import TrashIcon from '@/images/icon-papelera.svg';
import { useToasts } from 'react-toast-notifications';
import { useUserHook } from '@/modules/auth/user-hooks';
import { IProduct } from '@/lib/easysearch/types/generated';

type FavoriteHeaderItemProps = {
  product?: Product;
  onRemove?: (product: Product) => void; // Añade una nueva prop para la función de eliminar
};

const FavoriteHeaderItem: React.FC<FavoriteHeaderItemProps> = ({
  product,
  onRemove,
}) => {
  const { addToast } = useToasts();
  const {
    state: { user },
    favoriteProducts,
    dispatchFavoriteProducts,
  } = useUserHook();

  const [savePosts] = useSaveFavoriteProductMutation({
    onCompleted: (data) => {
      let newFavoriteProducts: any = [];

      if (
        data.saveFavoriteProduct?.type ===
        SaveFavoriteProductResponseEnum.AddFavoriteProduct
      ) {
        addToast(data.saveFavoriteProduct?.message, {
          appearance: 'success',
        });

        const productId =
          product?.databaseId || (product as IProduct)?.external_id;
        newFavoriteProducts = [...favoriteProducts, productId];
      } else {
        const productId =
          product?.databaseId || (product as IProduct)?.external_id;
        newFavoriteProducts = favoriteProducts.filter(
          (favoriteProductId: number) => favoriteProductId !== productId,
        );
        addToast(data.saveFavoriteProduct?.message, {
          appearance: 'success',
        });
      }

      console.log('newFavoriteProducts', newFavoriteProducts);

      dispatchFavoriteProducts(newFavoriteProducts);
    },
  });

  const handleRemoveFromFavorites = () => {
    if (product && onRemove) {
      onRemove(product);
    }

    if (!product?.databaseId && !(product as IProduct)?.external_id) {
      addToast('No se pudo eliminar el producto', { appearance: 'error' });
      return;
    }

    savePosts({
      variables: {
        input: {
          databaseUserId: user?.databaseId || 0,
          databaseProductId:
            product?.databaseId || (product as IProduct)?.external_id,
        },
      },
    });
  };

  return (
    <div className="py-6 px-4 items-container border-b border-b-[#C1C1C1]">
      <div className="text-[14px] grid grid-cols-7 gap-5">
        <div className="flex self-center col-span-2 w-full">
          <Link href={`/productos/${product?.slug}`}>
            <div className="relative flex self-center col-span-2 h-[60px] w-[70px]">
              <Image
                fill
                style={{ objectFit: 'cover' }}
                src={product?.featuredImage?.node.sourceUrl as string}
                alt={product?.name as string}
              />
            </div>
          </Link>
        </div>
        <div className="leading-4 col-span-5">
          <div className="flex justify-between">
            <div className="text-[#1C355E] font-Century-Gothic-Bold">
              <Link href={`/productos/${product?.slug}`}>
                {product?.name} {product?.databaseId}{' '}
              </Link>
            </div>
            <button onClick={handleRemoveFromFavorites}>
              <TrashIcon className="cursor-pointer" />
            </button>
          </div>
          <div className="text-[#666666] flex space-x-[2px]">
            <div>{(product as SimpleProduct)?.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteHeaderItem;
