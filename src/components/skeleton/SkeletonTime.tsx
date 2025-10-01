import React from 'react';
import AnimatedClockSands from './AnimatedClockSands';

export default function SkeletonTime() {
  return (
    <div className="border border-gray-300 p-4">
      <div className="w-full h-[100vh] max-h-[600px] bg-[#E9E9E9] flex flex-col items-center justify-center p-2 ">
        <div className="mb-4">
          <div className=" m-2 rounded-full p-5">
            <AnimatedClockSands />
          </div>
        </div>

        <div className="text-gray-400 text-lg font-bold tracking-wider">
          CARGANDO LOS PRODUCTOS...
        </div>
      </div>
    </div>
  );
}
