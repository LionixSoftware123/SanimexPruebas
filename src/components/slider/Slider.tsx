import React, { LegacyRef, useEffect, useState, useMemo } from 'react';
import AliceCarousel from 'react-alice-carousel';
import ArrowLeft from '@/images/arrow-left.svg';
import ArrowRight from '@/images/arrow-right.svg';
import 'react-alice-carousel/lib/alice-carousel.css';

type SliderProps = {
  items?: React.ReactNode[];
  infinite?: boolean;
  controls?: boolean;
  onlyOne?: boolean;
};

const Slider: React.FC<SliderProps> = ({
  items,
  controls,
  infinite,
  onlyOne = true,
}) => {
  const sliderRef: LegacyRef<AliceCarousel> | undefined = React.createRef();
  const [responsive, setResponsive] = useState({});

  useEffect(() => {
    setResponsive({
      0: {
        items: 1,
      },
      720: {
        items: 3,
        itemsFit: 'contain',
      },
      1240: {
        items: 4,
        itemsFit: 'contain',
      },
    });
  }, []);

  const carouselProps = useMemo(
    () => ({
      autoHeight: onlyOne,
      autoWidth: onlyOne,
      mouseTracking: true,
      items,
      responsive,
      infinite,
      disableButtonsControls: true,
      ref: sliderRef,
      touchTracking: true,
      disableDotsControls: true,
    }),
    [onlyOne, items, responsive, infinite, sliderRef],
  );

  return (
    <div className="">
      <div className="relative ">
        <AliceCarousel {...carouselProps} />
        {controls && sliderRef && (
          <div className={`slider-controls absolute top-1/3 w-full mt-4`}>
            <div
              className="ml-2 slider-control left bg-[#1C355E] absolute w-10 h-10 rounded-full  flex justify-center cursor-pointer items-center"
              onClick={() =>
                sliderRef && sliderRef.current && sliderRef.current.slidePrev()
              }
            >
              <div className="flex m-auto">
                <ArrowLeft />
              </div>
            </div>
            <div
              className=" slider-control right bg-[#1C355E] mr-2 absolute w-10 h-10 right-0 rounded-full flex justify-center cursor-pointer items-center"
              onClick={() =>
                sliderRef && sliderRef.current && sliderRef.current.slideNext()
              }
            >
              <div className="flex m-auto">
                <ArrowRight />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
