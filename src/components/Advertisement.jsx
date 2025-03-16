import React from 'react'
import { GrGallery } from "react-icons/gr";

function Advertisement() {
  return (
    <div className='flex flex-col md:flex-row gap-8 justify-center items-center px-10 py-10 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-200'>
      <div className='text-center md:text-left'>
        <h1 className='font-oswald text-5xl sm:text-6xl text-slate-950'>
          Designed for <span className='text-rose-600'> Creative </span> Professionals
        </h1>
        <p className='font-lato text-slate-700 mt-4 leading-relaxed'>
          Whether you're a UI/UX designer, graphic artist, brand strategist, or print expert — 
          Creozone equips you with powerful features to streamline and enhance your creative journey.
        </p>

        <button className="bg-rose-600 text-white px-6 py-3 rounded-sm mt-6 hover:bg-rose-700 transition-all font-lato">
          Explore Features
        </button>
      </div>
        <div className='px-1 lg:px-8 py-4 '>
            <img src="/show.png" alt="" className='w-auto h-auto cursor-pointer'/>
        </div>
    </div>
  )
}

export default Advertisement