import React, { useState } from 'react'
import Famous from '../components/Famous';
import ShowcaseSection from '../components/ShowcaseSection';
import Feature from '../components/Feature';
import Advertisement from '../components/Advertisement';
import { Carousel } from '../components/ui/carousel';


const slideData = [
    { title: "Redefine Design Together", src: "/bg2.jpeg" },
    { title: "Inspire. Collaborate. Create.", src: "/bg3.jpeg" },
    { title: "Your Canvas, Our Community", src: "/bg4.jpeg" },
    { title: "Design Beyond Limits", src: "/bg.jpeg" },
  ];

function Home() {
    const [previousImage, setPreviousImage] = useState(slideData[slideData.length - 1].src);

    const handleSlideChange = (currentIndex) => {
      const previousIndex = (currentIndex - 1 + slideData.length) % slideData.length;
      setPreviousImage(slideData[previousIndex].src);
    };
  return (
<>
<div
      className="h-[120vh] md:h-screen w-full bg-cover bg-center opacity-85 background-transition"
      style={{ backgroundImage: `url('${previousImage}')` }}
    >
      
      <div className='flex flex-col lg:flex-row items-center justify-center gap-8 px-6 lg:px-12 py-12'>
        <div className='w-full lg:w-1/2 text-center lg:text-left'>
          <p className='font-lato text-white text-2xl lg:text-4xl mb-2'>Welcome to</p>
          <h1 className='font-oswald text-white text-5xl lg:text-8xl'>
            Your Gallery of <br className='hidden lg:block'/> Creations
          </h1>
          <p className='mt-6 lg:mt-10 font-lato text-white text-lg lg:text-2xl'>
            The platform for designers to create, collaborate seamlessly, and build on ideas —
            transforming visions into impactful designs that inspire and innovate.
          </p>
        </div>
        <div className='cursor-pointer w-full lg:w-2/5 m-10 p-4 h-[380px] md:h-[500px] lg:h-[590px] overflow-hidden rounded-lg shadow-lg bg-white/20'>
          <Carousel slides={slideData} onSlideChange={handleSlideChange} />
        </div>
      </div>
    </div>
    <Advertisement/>
    <Feature/>
    <ShowcaseSection/>
    <Famous/>
</>
  )
}

export default Home