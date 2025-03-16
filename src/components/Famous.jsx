import React from 'react';
import Card from './Card';

const cardData = [
    {
      stashName: "Rift Riders.pvt.ltd",
      imgUrl: "/4.png",
      designerName: "Alex Johnson",
      impressions: 1200,
      category: "Business-Cards"
    },
    {
      stashName: "Death:The Final Destination",
      imgUrl: "/death.png",
      designerName: "Maria Lopez",
      impressions: 980,
      category: "Magazine"
    },
    {
      stashName: "Two:Penguin Publishers",
      imgUrl: "/story.png",
      designerName: "Chris Taylor",
      impressions: 1400,
      category: "Book-Cover"
    }
  ];

function Famous() {
  return (
    <div className='p-6 my-8'>
      <h1 className='text-7xl  text-center mb-8 font-oswald'>View <span className='text-rose-600'> Famous  </span> Stash</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center'>
        {cardData.map((card, index) => (
          <Card 
            key={index}
            stashName={card.stashName}
            imgUrl={card.imgUrl}
            designerName={card.designerName}
            impressions={card.impressions}
            category={card.category}
          />
        ))}
      </div>
      <div className='flex justify-center mt-6'>
        <button className='px-12 py-2 bg-rose-600 text-white rounded-sm hover:bg-rose-700 transition font-lato'>View All</button>
      </div>
    </div>
  );
}

export default Famous;
