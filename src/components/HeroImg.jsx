import React from 'react';

const HeroImg = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen hidden md:flex items-center justify-center">
      <img
        src="/HeroImg.png"
        alt="Main Person"
        className="z-10 max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[600px] object-contain"
      />

      <img
        src="/img1.png"
        alt="Magazine Cover"
        className="absolute top-10 sm:top-20 md:top-28 lg:top-36 xl:top-40 left-4 sm:left-10 w-16 sm:w-16 md:w-24 lg:w-32 xl:w-48 z-20 rounded shadow-lg animate-slowBounce"
      />

      <img
        src="/img2.png"
        alt="Travel Card"
        className="absolute bottom-10 sm:bottom-16 md:bottom-20 lg:bottom-24 xl:bottom-20 right-4 sm:right-10 w-16 sm:w-16 md:w-24 lg:w-32 xl:w-48 z-20 rounded shadow-lg animate-slowFloatX"
      />
    </div>
  );
};

export default HeroImg;

