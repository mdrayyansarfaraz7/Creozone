import React from 'react';
import { FaStar } from 'react-icons/fa';

function SignUp() {
  return (
    <div className="h-screen flex flex-col lg:flex-row relative">

      {/* Logo (Always Top-Right) */}
      <img
        src="/Logo.png"
        alt="Logo"
        className="absolute top-4 left-4 h-10 z-10"
      />

      {/* LEFT: Form Section */}
      <div className="w-full lg:w-[40%] h-full bg-white flex flex-col justify-center items-center px-8 lg:px-16">
        <h2 className="text-3xl lg:text-4xl text-rose-600 font-semibold mb-6 mt-16 lg:mt-0">Create account</h2>

        {/* Google Sign Up */}
        <button className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center space-x-2 hover:bg-gray-50 transition">
          <img src="/google.png" alt="Google" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-6 w-full">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Form Fields */}
        <form className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-rose-600">First name*</label>
            <input type="text" placeholder="Enter your first name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-rose-600">Email*</label>
            <input type="email" placeholder="Enter your email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-rose-600">Password*</label>
            <input type="password" placeholder="Create a password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black" />
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters.</p>
          </div>

          <button type="submit" className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition">
            Create account
          </button>
        </form>

        {/* Footer link */}
        <p className="text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-rose-600 font-medium hover:underline">Log in</a>
        </p>
      </div>

      {/* RIGHT: Image and Quote (Hidden on md and below) */}
      <div className="hidden lg:block w-[60%] h-full bg-[url('/signUp.png')] bg-cover bg-center relative">

        {/* Heading */}
        <div className="absolute bottom-24 xl:bottom-20 2xl:bottom-24 px-6 lg:px-10 text-white max-w-[80%]">
          <h1 className="font-oswald text-5xl xl:text-6xl 2xl:text-7xl mb-8 leading-tight">
            Transform your Creations into Inspiration
          </h1>
        </div>

        {/* Avatars and Rating */}
        <div className="flex items-center gap-4 absolute bottom-6 xl:bottom-4 px-6 lg:px-12">
          <div className="flex -space-x-3">
            <img className="w-10 h-10 rounded-full border-2 border-white" src="/u2.jpeg" alt="User 1" />
            <img className="w-10 h-10 rounded-full border-2 border-white" src="/u3.jpeg" alt="User 2" />
            <img className="w-10 h-10 rounded-full border-2 border-white" src="/u4.jpeg" alt="User 3" />
            <img className="w-10 h-10 rounded-full border-2 border-white" src="/u6.jpeg" alt="User 4" />
            <img className="w-10 h-10 rounded-full border-2 border-white" src="/u10.jpeg" alt="User 5" />
          </div>

          <div className="text-white">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </span>
              <span className="text-sm font-semibold">5.0</span>
            </div>
            <p className="text-sm">Trusted by professionals throughout the globe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
