import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Product,
  PaColor,
  VariableProduct,
  MediaItem,
} from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';
import Image from 'next/image';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

type ProductImageDetailsProps = {
  product?: Product;
  onSelectedColor?: (color?: PaColor) => void;
  productVariantFilter?: ProductVariantFilter[];
  clearSelection: () => void;
  discount: number;
  bannerData: {
    active: string;
    url: string;
    color: string;
    text: string;
  };
};

const ProductImageDetails: React.FC<ProductImageDetailsProps> = ({
  product,
  productVariantFilter,
  onSelectedColor,
  clearSelection,
  discount,
  bannerData,
}) => {
  const [gallery, setGallery] = useState<MediaItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<MediaItem | undefined>(
    undefined,
  );
  const [productAmbience, setProductAmbience] = useState<string | undefined>(
    undefined,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [initialImages, setInitialImages] = useState([]);
  const [filterImage, setFilterImage] = useState(false);

  const categories = product?.productCategories?.nodes;
  const hasPisoCategory = categories?.some(
    (category: any) =>
      category.name.toLowerCase().includes('piso') ||
      category.name.toLowerCase().includes('pisos'),
  );

  const colors = (
    product?.allPaColor?.edges.map((edge) => edge.node) as PaColor[]
  ).filter((u) =>
    getProductVariableFilter(
      product as VariableProduct,
      u,
      productVariantFilter || [],
    ),
  );

  const handleColorClick = (color: any) => {
    if (!color) {
      return;
    }
    onSelectedColor && onSelectedColor(color);
  };

  useEffect(() => {
    if (!product) return;

    const featuredImageUrl = product?.featuredImage?.node.sourceUrl || '';
    if (featuredImageUrl && !productAmbience)
      setProductAmbience(featuredImageUrl);
    let _gallery =
      product?.galleryImages?.edges?.map((edge) => edge.node) || [];

    const images =
      (product as any)?.variations?.nodes.map(
        (node: any) => node.featuredImage?.node,
      ) || [];

    if (!initialImages.length) {
      setInitialImages(images);
    }

    _gallery = [..._gallery, ...initialImages].filter(Boolean);

    const galleryhideMediaItem = _gallery.filter(
      (image: any) => image.__typename === 'MediaItem',
    );

    // if (galleryhideMediaItem.length) {
    //   setcurrentGallery(galleryhideMediaItem);
    // }

    const findFilteredColor = (image: any) => {
      const filteredColor = (colors || []).find((color) => {
        const colorVariations = getProductVariableFilter(
          product as VariableProduct,
          color,
          productVariantFilter || [],
        );
        return (
          colorVariations.featuredImage?.node.sourceUrl === image.sourceUrl
        );
      });
      return filteredColor ? image : image;
    };

    const galleryhideMediaItemColors = galleryhideMediaItem
      .map(findFilteredColor)
      .filter(Boolean);

    if (featuredImageUrl) {
      galleryhideMediaItemColors.unshift({
        sourceUrl: featuredImageUrl,
      } as MediaItem);
    }
    const ProductVariation =
      (product as any)?.__typename === 'ProductVariation';

    setGallery((prevGallery) => {
      if (ProductVariation) {
        return prevGallery;
      } else {
        return galleryhideMediaItemColors as MediaItem[];
      }
    });
  }, [product, productAmbience]);

  useEffect(() => {
    if (!product?.featuredImage?.node.sourceUrl) {
      return;
    }

    const newSelectedImage = gallery.find(
      (image) => image?.sourceUrl === product?.featuredImage?.node?.sourceUrl,
    );

    if (newSelectedImage) {
      setSelectedImage(newSelectedImage);
    } else {
      setSelectedImage(undefined);
    }
  }, [product, gallery]);

  useEffect(() => {
    const selectedIndex = gallery.findIndex((image) => image === selectedImage);

    if (selectedIndex < currentIndex || selectedIndex >= currentIndex + 5) {
      setCurrentIndex(Math.floor(selectedIndex / 5) * 5);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (product?.featuredImage?.node.sourceUrl) {
      setProductAmbience(product?.featuredImage?.node.sourceUrl);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product, gallery, selectedImage]);

  useEffect(() => {
    if (!colors) return;

    const findFilteredColor = (color: PaColor) => {
      const colorVariations = getProductVariableFilter(
        product as VariableProduct,
        color,
        productVariantFilter || [],
      );
      return (
        colorVariations.featuredImage?.node.sourceUrl ===
        selectedImage?.sourceUrl
      );
    };

    const filteredColor = colors.find(findFilteredColor);

    if (filteredColor) {
      handleColorClick(filteredColor);
    }
  }, [filterImage]);

  const handleSelectImage = (image: MediaItem) => {
    if (!hasPisoCategory && image) {
      setFilterImage(!filterImage);
      clearSelection();
      setSelectedImage(image);
    } else {
      setSelectedImage(image);
    }
  };

  console.log(bannerData);

  return (
    <div className="grid grid-cols-12 gap-4 ">
      <div className={`lg:col-span-2 col-span-12 flex lg:block gap-4`}>
        {currentIndex > 0 && (
          <div
            className="relative lg:w-[100px] w-[100%]  h-[40px] mb-4 cursor-pointer flex items-center justify-center bg-[#00559b]"
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={() => setCurrentIndex(currentIndex - 5)}
          >
            <div className="absolute inset-0  flex items-center justify-center ">
              <span className="text-white">
                <Image
                  src="/arrow-up.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 transform lg:rotate-0 rotate-[270deg]"
                />
              </span>
            </div>
          </div>
        )}
        {!isLoading ? (
          <>
            {gallery.slice(currentIndex, currentIndex + 5).map((image, key) => (
              <div
                className={`border ${
                  selectedImage === image
                    ? 'border-[#0033a1]'
                    : 'border-[#DFDFDF]'
                } relative  lg:w-[100px] w-[100px] h-[75px] mb-2 cursor-pointer `}
                key={key}
                onClick={() => handleSelectImage(image)}
              >
                <ImageWithFallback
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                  src={image?.sourceUrl as string}
                  alt={product?.name as string}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              role="status"
              className="flex items-center justify-center h-24 max-w-lg w-[100%] bg-gray-100 animate-pulse "
            ></div>
            <div
              role="status"
              className="flex items-center justify-center mt-2 h-24 max-w-lg w-[100%] bg-gray-100 animate-pulse "
            ></div>

            <div
              role="status"
              className="flex items-center justify-center mt-2 h-24 max-w-lg w-[100%] bg-gray-100 animate-pulse "
            ></div>
          </>
        )}

        {gallery.length > currentIndex + 5 && (
          <div
            className="relative lg:w-[100px] w-[100%] h-[40px] mb-4 cursor-pointer flex items-end justify-center bg-[#00559b]"
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={() => setCurrentIndex(currentIndex + 5)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white">
                <Image
                  src="/arrow-up.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 transform lg:rotate-180 rotate-90"
                />
              </span>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${
          gallery.length
            ? 'lg:col-span-10 col-span-12'
            : 'lg:col-span-10 col-span-12'
        } h-[530px] lg:h-[550px] lg:max-h-[550px]`}
      >
        <div className="relative w-full h-[530px] lg:h-[530px]  flex items-start border">
          {!isLoading ? (
            <>
              {discount > 0 && (
                <div
                  className="absolute top-0 right-0 h-8 w-10 text-white font-bold p-1 z-[20] m-1"
                  style={{ backgroundColor: bannerData?.color ?? '#1C355E' }}
                >
                  {discount}%
                </div>
              )}
              <ImageWithFallback
                fill
                src={selectedImage?.sourceUrl as string}
                alt={product?.name as string}
                priority
                loading={'eager'}
                className="w-full h-[100%] object-contain"
              />
            </>
          ) : (
            <>
              <div
                role="status"
                className="flex items-center mx-auto justify-center h-[100%] max-w-lg w-[100%] bg-gray-100 animate-pulse "
              ></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImageDetails;
