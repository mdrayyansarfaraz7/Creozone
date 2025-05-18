import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ScaleLoader } from 'react-spinners';

function ViewStash() {
  const { id } = useParams();
  const [stash, setStash] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStashDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stash/${id}`);
        setStash(response.data.stashDetails);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStashDetails();

  }, [id]);
  console.log(stash);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ScaleLoader color="#f43f5e" height={35} margin={3} />
      </div>
    );
  }

  const creator = stash.styleChain.find(m => m.role === 'creator')?.designer;
  const collaborators = stash.styleChain
    .filter(m => m.role === 'collaborator')
    .map(m => m.designer);

  return (

    <div className="h-screen  p-10 font-sans text-gray-700">

      <div className="flex flex-col md:flex-row bg-white rounded-lg  overflow-hidden">
        <div className="md:w-2/5 w-full h-auto flex justify-center items-center bg-gray-100">
          <img
            src={stash.thumbnail}
            alt="Thumbnail"
            className="max-w-[90%] max-h-screen md:max-h-[90vh] rounded-lg object-contain scale-95 transition-transform duration-300"
          />
        </div>
        <div className="md:w-3/5 w-full p-8 flex flex-col justify-between bg-white shadow-md rounded-r-lg">
          <div>
            <h1 className="text-4xl font-extrabold font-lato text-gray-900 mb-1 tracking-tight">
              {stash.title}
            </h1>

            `<p className="text-sm text-gray-400">
              {formatDistanceToNow(new Date(stash.createdAt), { addSuffix: true })}
            </p>

            <p className="text-gray-600  font-light font-lato mb-8 text-xs md:text-sm lg:text-lg text-justify">
              {stash.desc}
            </p>

            <div className="flex flex-wrap items-center gap-6 border-t border-gray-200 pt-5">
              {creator && (
                <div className="flex items-center gap-3">
                  <p className="font-lato font-medium  text-gray-700">Creator:</p>
                  <img
                    src={creator.avatar}
                    alt="creator"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              )}

              {collaborators.length > 0 && (
                <div className="flex items-center gap-3">
                  <p className="font-semibold font-oswald text-gray-700 tracking-wide">Collaborators:</p>
                  {collaborators.map((c, idx) => (
                    <img
                      key={idx}
                      src={c.avatar}
                      alt={`collaborator-${idx}`}
                      className="w-10 h-10 rounded-full border border-gray-300 object-cover hover:scale-110 transition-transform duration-300"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {
                stash.creations.slice(0, 4).map((c, i) => {
                  const commonClass = "w-full max-h-[30vh] object-contain transition-transform duration-300 cursor-pointer";

                  if (i < 3) {
                    return (
                      <img
                        key={i}
                        src={c.url}
                        alt={`img-${i}`}
                        className={`${commonClass} scale-95`}
                      />
                    );
                  }

                  if (i === 3 && stash.creations.length > 4) {
                    return (
                      <div
                        key={i}
                        className="relative w-full max-h-[30vh] cursor-pointer"
                      >
                        <img
                          src={c.url}
                          alt="extra"
                          className="w-full h-full object-contain opacity-40"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold font-oswald ">
                          +{stash.creations.length - 4}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })
              }
            </div>





          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
            <button className="w-full sm:flex-1 bg-rose-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-rose-700 transition-colors duration-300">
              View Resuplt Stashes
            </button>
            <button className="w-full sm:flex-1 bg-white text-rose-600 py-3 rounded-lg font-semibold border border-rose-600 hover:scale-105 transition-transform  duration-200">
              Refinement Request
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ViewStash;
