import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const ImageWithHideOnError: React.FC<ImageProps> = ({ alt, src, ...props }) => {
  const [hideImage, setHideImage] = useState(false);

  return !hideImage ? (
    <Image
      className="bg-white"
      alt={alt}
      // onError={(data) => {
      //   //@ts-ignore
      //   setError(data);
      // }}
      src={src}
      {...props}
      onError={() => {
        setHideImage(true);
      }}
    />
  ) : null;
};

export default ImageWithHideOnError;
