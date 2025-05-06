import Famous from '../components/Famous';
import ShowcaseSection from '../components/ShowcaseSection';
import Feature from '../components/Feature';
import Advertisement from '../components/Advertisement';
import HeroImg from '../components/HeroImg';

function Home() {
  return (
<>
<div className="h-[100vh] w-full flex items-center bg-white relative overflow-hidden">
  <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-12 py-12 max-w-[1400px] mx-auto w-full">
 
    <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
      <p className="font-lato text-gray-700 text-2xl lg:text-3xl mb-2">
        Welcome to
      </p>
      <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
        Your Gallery of <br className="hidden lg:block" />
        <span className="text-rose-600">Creations</span>
      </h1>
      <p className="mt-6 text-base md:text-lg text-gray-500 font-lato max-w-xl mx-auto lg:mx-0">
        The platform for designers to create, collaborate seamlessly, and build on ideas — transforming
        visions into impactful designs that inspire and innovate.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
        <button className="bg-rose-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-rose-700 transition-all">
          Explore Designs
        </button>
        <button className="border border-rose-600 text-rose-600 px-6 py-3 rounded-full font-semibold hover:bg-rose-50 transition-all">
          Contribute Yours
        </button>
      </div>
    </div>

    
    <div className="w-full lg:w-1/2 relative items-center justify-center hidden md:flex ">
  <HeroImg />
</div>
  </div>

 
  <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-rose-100 opacity-30 rounded-full blur-3xl z-0" />
</div>

    <Advertisement/>
    <Feature/>
    <ShowcaseSection/>
    <Famous/>

</>
  )
}

export default Home