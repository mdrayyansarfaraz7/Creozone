import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ScaleLoader } from 'react-spinners';
import SleekFooter from '../components/SleekFooter';
import { BrushIcon, ImagePlus,LucideBrush,PenTool } from "lucide-react";

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
    <>
      <div className=" p-10 font-sans text-gray-700">
        
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
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-3xl font-lato text-gray-900 tracking-tight">
                  {stash.title}
                </h1>
                <a
                  href={`/creations/${stash._id}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-rose-500 transition-colors font-lato text-sm sm:text-base"
                >
                  <span className="hidden sm:inline text-xs">All Creations</span>
                  <ImagePlus size={20} />
                </a>
              </div>


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

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200 cursor-pointer">
                <BrushIcon className="text-rose-600" />
                <div>
                  <p className="font-semibold text-gray-800">View Result Stashes</p>
                  <p className="text-xs text-gray-500">Explore refined versions and iterations</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200 cursor-pointer">
                <PenTool className="text-rose-600" />
                <div>
                  <p className="font-semibold text-gray-800">View Refinement Request</p>
                  <p className="text-xs text-gray-500">Submit this design for collaborative improvement</p>
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>
      <SleekFooter />
    </>

  );
}

export default ViewStash;
