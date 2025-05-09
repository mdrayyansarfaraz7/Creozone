import React from 'react'

function Feature() {
  return (
    <div className=' flex flex-col gap-8 py-8 px-16'>
      {/* StyleChain Feature */}
      <div className='flex flex-col md:flex-row items-center justify-center gap-8'>
        <div className='w-full md:w-1/3'>
          <img src="/styleChain.png" alt="StyleChain" className='w-full h-auto cursor-pointer'/>
        </div>
        <div className='w-full md:w-2/3 text-center md:text-left'>
          <h1 className='font-oswald text-6xl sm:text-7xl text-slate-950 font-bold'>
            Introducing <span className='text-rose-600'>StyleChain</span>
          </h1>
          <p className='font-lato text-slate-700 mt-4 leading-relaxed w-auto lg:w-[700px]'>
            Enhance your creative process with seamless style management across multiple designs. 
            With StyleChain, effortlessly maintain consistency and refine visual identity by linking design elements. 
            Streamline your workflow and ensure your ideas shine through.
          </p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-center gap-8'>
        <div className='w-full md:w-1/3'>
          <img src="/outlooks.png" alt="OutLooks" className='w-full h-auto cursor-pointer'/>
        </div>
        <div className='w-full md:w-2/3 text-center md:text-left'>
          <h1 className='font-oswald text-6xl sm:text-7xl text-slate-950 font-bold'>
            Explore <span className='text-rose-600'>OutLooks</span>
          </h1>
          <p className='font-lato text-slate-700 mt-4 leading-relaxed w-auto lg:w-[700px]'>
            Discover valuable insights through detailed feedback and organized discussions. 
            OutLooks empowers you to analyze perspectives, refine your designs, and connect with creative minds — 
            making each design iteration stronger and more meaningful.
          </p>
        </div>
      </div>

            {/* Refinement Requests Feature */}
            <div className='flex flex-col md:flex-row items-center justify-center gap-8'>
        <div className='w-full md:w-1/3'>
          <img src="/refinements.png" alt="Refinements" className='w-full h-auto cursor-pointer'/>
        </div>
        <div className='w-full md:w-2/3 text-center md:text-left'>
          <h1 className='font-oswald text-6xl sm:text-7xl text-slate-950 font-bold'>
            Add <span className='text-rose-600'>Refinements</span>
          </h1>
          <p className='font-lato text-slate-700 mt-4 leading-relaxed w-auto lg:w-[700px]'>
            Refine your designs like never before. Our refinement request system enables collaborators to suggest improvements, 
            leave comments, and track changes with clarity. Turn feedback into actionable insights for better results.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Feature
