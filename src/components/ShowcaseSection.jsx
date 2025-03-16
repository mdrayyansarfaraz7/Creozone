import React from 'react'
import { FaFolderOpen, FaUsers, FaThumbsUp } from 'react-icons/fa'

function ShowcaseSection() {
  return (
    <div className="bg-slate-100 py-8">
      <div className="text-center">
        <h1 className="text-6xl  text-slate-900 font-oswald">
          Ready to <span className='text-rose-600'> showcase</span>  your designs?
        </h1>
        <p className="text-slate-600 mt-2 font-lato">
          Join thousands of designers who are already using Creozone to share their work
          and get recognized.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6 font-lato">
        {/* Projects Shared */}
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-[180px]">
          <FaFolderOpen className="text-rose-600 text-3xl mb-2" />
          <h2 className="text-2xl font-semibold text-slate-900">15K+</h2>
          <p className="text-slate-600">Stash Created</p>
        </div>

        {/* Active Designers */}
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-[180px]">
          <FaUsers className="text-rose-600 text-3xl mb-2" />
          <h2 className="text-2xl font-semibold text-slate-900 ">8K+</h2>
          <p className="text-slate-600">Active Designers</p>
        </div>

        {/* Monthly Interactions */}
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-[180px]">
          <FaThumbsUp className="text-rose-600 text-3xl mb-2" />
          <h2 className="text-2xl font-semibold text-slate-900">2.5M+</h2>
          <p className="text-slate-600">Monthly Interactions</p>
        </div>
      </div>
    </div>
  )
}

export default ShowcaseSection
