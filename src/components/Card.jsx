import React from 'react';
import { Eye } from 'lucide-react';

function Card({ stashName, imgUrl, designerName, impressions, category }) {
  return (
    <div className="w-full sm:w-[300px] md:w-[360px] lg:w-[440px] h-[460px] rounded-lg bg-slate-100 overflow-hidden relative group">
      {/* Image Section */}
      <div
        className="h-[85%] bg-cover bg-center group-hover:blur-sm transition-all duration-300"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>

      {/* Overlay with Details */}
      <div className="absolute top-0 left-0 w-full h-[85%] bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-center transition-all duration-300">
        <h2 className="text-lg md:text-2xl font-lato">{stashName}</h2>
        <p className="text-sm font-lato">{category}</p>
      </div>

      {/* Owner & Impressions Section */}
      <div className="h-[15%] p-3 flex justify-between items-center text-black">
        <div>
          <p className="text-sm ">{designerName}</p>
          <p className="text-xs text-gray-400">{impressions} Impressions</p>
        </div>
        <Eye className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}

export default Card;
