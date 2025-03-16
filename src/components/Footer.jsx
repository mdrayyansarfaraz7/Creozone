import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <img src='/Logo.png' alt="Creozone Logo" className="h-12 mb-4" />
          <p className="text-sm text-gray-600 font-lato">
            A collaborative design platform that brings together creators worldwide to collaborate, refine, and innovate together.
          </p>
          <div className="flex space-x-4 mt-4">
            {[FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map((Icon, index) => (
              <Icon
                key={index}
                className="text-slate-500 hover:text-rose-500 text-2xl cursor-pointer transition-all duration-300"
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-black ">Product</h3>
          <ul className="space-y-2 text-gray-600 font-lato">
            <li className="hover:text-black cursor-pointer">Features</li>
            <li className="hover:text-black cursor-pointer">Pricing</li>
            <li className="hover:text-black cursor-pointer">Integrations</li>
            <li className="hover:text-black cursor-pointer">Case Studies</li>
            <li className="hover:text-black cursor-pointer">Updates</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-black">Resources</h3>
          <ul className="space-y-2 text-gray-600 font-lato">
            <li className="hover:text-black cursor-pointer">Documentation</li>
            <li className="hover:text-black cursor-pointer">Tutorials</li>
            <li className="hover:text-black cursor-pointer">Blog</li>
            <li className="hover:text-black cursor-pointer">Community</li>
            <li className="hover:text-black cursor-pointer">Design Resources</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-black">Company</h3>
          <ul className="space-y-2 text-gray-600 font-lato">
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Careers</li>
            <li className="hover:text-black cursor-pointer">Press</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
            <li className="hover:text-black cursor-pointer">Partners</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-5 text-center">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Creozone. All rights reserved.</p>
        <div className="flex justify-center space-x-6 text-sm mt-3 text-gray-600 font-lato">
          <span className="hover:text-black cursor-pointer">Privacy Policy</span>
          <span className="hover:text-black cursor-pointer">Terms of Service</span>
          <span className="hover:text-black cursor-pointer">Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
