import React, { useState, useEffect, useMemo } from 'react';
import Image, { ImageProps } from 'next/image';

const ImageWithFallback: React.FC<ImageProps> = ({ alt, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    setImgSrc('/sanifallbacknew.png');
  };

  const memoizedImgSrc = useMemo(() => imgSrc, [imgSrc]);

  return (
    <Image
      className="bg-white"
      alt={alt}
      src={memoizedImgSrc}
      onError={handleError}
      placeholder="blur"
      blurDataURL="/sanifallbacknew.png"
      {...props}
    />
  );
};

export default ImageWithFallback;
