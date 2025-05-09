import React from 'react';

function Card({ url, category }) {
  return (
    <div className="w-[200px] mx-2">
      <div
        className="h-[200px] w-full bg-cover bg-center rounded-md overflow-hidden"
        style={{ backgroundImage: `url(${url})` }}
      />
      <p className="text-lg font-lato font-semibold py-2 text-center">
        {category}
      </p>
    </div>
  );
}

export default Card;
