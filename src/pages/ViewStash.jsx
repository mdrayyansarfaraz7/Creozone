import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ScaleLoader } from 'react-spinners';
import SleekFooter from '../components/SleekFooter';
import { BrushIcon, ImagePlus, LucideBrush, PenTool, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function ViewStash() {
  const { id } = useParams();
  const [stash, setStash] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allCreations, setAllCreations] = useState(false);
  const [currentImg, setCurrentImage] = useState('');
  const navigate = useNavigate();

  const handelCreations = () => {
    setAllCreations(!allCreations);
  }

  useEffect(() => {
    const fetchStashDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stash/${id}`);
        setStash(response.data.stashDetails);
        setCurrentImage(response.data.stashDetails.thumbnail);
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
      <div className=" p-2 font-sans text-gray-700">
        <div className="px-2 py-1">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-100 hover:text-slate-800 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="flex flex-col md:flex-row bg-white rounded-lg  overflow-hidden">

          <div className="md:w-3/5 w-full h-auto flex justify-center items-center bg-gray-100">
            <img
              src={currentImg}
              alt="Thumbnail"
              className="max-w-[90%] max-h-screen md:max-h-[90vh] rounded-lg object-contain scale-95 transition-transform duration-300"
            />
          </div>
          {
            !allCreations ?
              (<>
                <div className="md:w-2/5 w-full p-8 flex flex-col justify-between bg-white shadow-md rounded-r-lg">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h1 className="text-3xl font-lato text-gray-900 tracking-tight">
                        {stash.title}
                      </h1>
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
                    <div className="text-right mt-2">
                      <button className="text-xs text-rose-500 hover:underline font-medium" onClick={handelCreations}>
                        See All Creations →
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200 cursor-pointer">
                      <PenTool className="text-rose-600" />
                      <div>
                        <p className="font-semibold text-gray-800">View Refinement Request</p>
                        <p className="text-xs text-gray-500">Submit this design for collaborative improvement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>) : (
                <>
                  <div className="p-4 md:w-2/4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {stash.creations.map((c, i) => (
                        <img
                          key={i}
                          src={c.url}
                          alt={`creation-${i}`}
                          onClick={() => setCurrentImage(c.url)}
                          className="w-full max-h-[30vh] object-contain rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      ))}

                    </div>
                    <div className="text-right mt-3">
                      <button
                        className="text-xs text-rose-500 hover:underline font-medium"
                        onClick={handelCreations}
                      >
                        See Less ↑
                      </button>
                    </div>
                  </div>
                </>)
          }

        </div>
      </div>
      <SleekFooter />
    </>

  );
}

export default ViewStash;
