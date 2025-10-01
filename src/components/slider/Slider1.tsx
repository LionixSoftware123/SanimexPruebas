import React, { LegacyRef, useEffect, useState } from 'react';
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

const Slider1: React.FC<SliderProps> = ({
  items,
  controls,
  infinite,
  onlyOne = false,
}) => {
  const sliderRef: LegacyRef<AliceCarousel> | undefined = React.createRef();
  const [responsive, setResponsive] = useState({});

  useEffect(() => {
    setResponsive({
      0: {
        items: 1,
      },
      720: {
        items: 1,
        itemsFit: 'contain',
      },
      1240: {
        items: 1,
        itemsFit: 'contain',
      },
    });
  }, []);
  return (
    <div className="">
      <div className="relative">
        <AliceCarousel
          autoHeight={onlyOne}
          autoWidth={onlyOne}
          mouseTracking={false}
          items={items}
          responsive={responsive}
          infinite={infinite}
          disableButtonsControls
          ref={sliderRef}
          touchTracking={false}
          disableDotsControls
          autoPlay={true}
          autoPlayInterval={4000}
        />
        {controls && sliderRef && (
          <div className={`slider-controls absolute top-1/3 w-full mt-4`}>
            <div
              className=" slider-control left bg-[#1C355E] absolute w-10 h-10 rounded-full  flex justify-center cursor-pointer items-center"
              onClick={() =>
                sliderRef && sliderRef.current && sliderRef.current.slidePrev()
              }
            >
              <div className="flex m-auto">
                <ArrowLeft />
              </div>
            </div>
            <div
              className=" slider-control right bg-[#1C355E]  absolute w-10 h-10 right-0 rounded-full flex justify-center cursor-pointer items-center"
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

export default Slider1;
