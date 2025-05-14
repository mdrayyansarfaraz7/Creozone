

const StashCard = ({ thumb, title, desc, noCrea, StyleChain }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white border rounded-lg overflow-hidden max-w-4xl mx-auto p-4 font-lato">
      <img
        src={thumb}
        alt="Death Book Cover"
        className="w-full md:w-1/3 h-auto object-cover"
      />
      <div className="flex flex-col justify-between p-4 space-y-2">
        <div>
          <h2 className="text-4xl font-bold font-lato">{title}</h2>
          <p className="text-gray-700 mt-2 text-sm">
            {desc}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-2 sm:space-y-0">
          <p className="text-lg font-lato font-normal text-slate-600">
            Creations: <span className="text-2xl font-oswald font-bold text-slate-800">{noCrea}</span>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <p className="text-lg font-lato font-normal text-slate-600 mb-1 sm:mb-0">Style Chain:</p>
            <div className="flex items-center space-x-[-10px]">
              {StyleChain.map((item, i) => (
                <img
                  key={i}
                  src={item?.designer?.avatar}
                  alt={item?.designer?.username || "Designer"}
                  title={item?.designer?.username}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StashCard;
