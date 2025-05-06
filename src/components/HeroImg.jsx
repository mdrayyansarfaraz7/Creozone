import React from 'react';

const HeroImg = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen hidden md:flex items-center justify-center">
      <img
        src="/Hero.png"
        alt="Main Person"
        className="z-10 max-w-[300px] md:max-w-[500px] lg:max-w-[700px] object-contain"
      />

      <img
        src="/img1.png"
        alt="Magazine Cover"
        className="absolute top-40 left-4 sm:left-10 w-24 sm:w-28 md:w-32 lg:w-40 z-20 rounded shadow-lg animate-slowBounce"
      />

      <img
        src="/img2.png"
        alt="Travel Card"
        className="absolute bottom-20 right-4 sm:right-10 w-24 sm:w-28 md:w-32 lg:w-40 z-20 rounded shadow-lg animate-slowFloatX"
      />
    </div>
  );
};

export default HeroImg;
