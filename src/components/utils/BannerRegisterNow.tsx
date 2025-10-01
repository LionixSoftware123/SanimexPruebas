import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserHook } from '@/modules/auth/user-hooks';
import Link from 'next/link';

function BannerRegisterNow() {
  const [isVisible, setIsVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState('');
  const router = useRouter();

  const {
    state: { user },
  } = useUserHook();

  const handleClose = () => {
    setAnimationClass('fade-out-banner');
    setTimeout(() => setIsVisible(false), 500);
  };

  useEffect(() => {
    setIsVisible(!user);
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animationClass === 'fade-in-banner') {
        setAnimationClass('');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [animationClass]);

  if (isVisible === null || !isVisible || router.pathname !== '/') {
    return null;
  }

  return (
    <>
      {isVisible ? (
        <div
          className={`h-40 w-100 bg-[#fcfcfc] shadow-top w-full left-0 bottom-0 fixed flex justify-center items-end z-50  ${animationClass}`}
        >
          <button className="absolute top-0 right-0 m-2" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#333"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <div className="grid grid-cols-9">
            <div className="col-span-7 h-40 ">
              <div className="flex flex-col justify-start mt-10">
                <h1 className="text-[30px] font-Century-Gothic-Bold">
                  Regístrate ahora!
                </h1>
                <h3 className="text-[20px] font-Century-Gothic-Bold text-[#333]">
                  Y recibe un cupón de descuento.
                </h3>
              </div>
            </div>
            <div className="col-span-2 flex items-center h-40 ">
              <Link
                href={'/auth'}
                className="flex justify-center items-center cursor-pointer  hover:bg-[#2a4875] font-Century-Gothic-Bold text-[22px] text-white uppercase w-[255px] h-[64px] rounded-[10px] bg-[#1c355e]"
              >
                <span>Quiero regístrarme</span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BannerRegisterNow;
