import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

function Login() {
  const { checkAuth, login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null); // <-- for showing error message

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // clear previous errors

    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      // Capture readable message
      const message =
        err?.response?.data?.message || err.message || 'Something went wrong!';
      setError(message);
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row-reverse relative">
      <img
        src="/Logo.png"
        alt="Logo"
        className="absolute top-4 right-4 h-10 z-10"
      />

      {/* LEFT: Login Form */}
      <div className="w-full lg:w-[40%] h-full bg-white flex flex-col justify-center items-center px-8 lg:px-16">
        <h2 className="text-3xl lg:text-4xl text-rose-600 font-semibold mb-6 mt-16 lg:mt-0">
          Login
        </h2>

        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-rose-600">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-rose-600">
              Password*
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-rose-100 border border-rose-300 text-rose-700 text-sm px-3 py-2 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition flex justify-center items-center"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>Login</>
            )}
          </button>
        </form>

        {/* Footer link */}
        <p className="text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-rose-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>

      {/* RIGHT: Image Section */}
      <div className="hidden lg:block w-[60%] h-full bg-[url('/Main.jpeg')] bg-cover bg-center relative">
        <div className="absolute bottom-24 xl:bottom-20 2xl:bottom-24 px-6 lg:px-10 text-white max-w-[80%]">
          <h1 className="font-oswald text-5xl xl:text-6xl 2xl:text-7xl mb-8 leading-tight">
            Designs don’t live in Silos. Neither should you.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
