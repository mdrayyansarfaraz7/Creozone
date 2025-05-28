import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ScaleLoader } from 'react-spinners';
import SleekFooter from '../components/SleekFooter';
import { BrushIcon, ImagePlus, LucideBrush, PenTool, ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';

function ViewStash() {
  const { id } = useParams();
  const [stash, setStash] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImage] = useState('');
  const [currentCreation, setCurentCreation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStashDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stash/${id}`);
        setStash(response.data.stashDetails);
        setCurrentImage(response.data.stashDetails.thumbnail);
        setCurentCreation(response.data.stashDetails.creations[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStashDetails();
  }, [id]);
  console.log(currentCreation);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ScaleLoader color="#f43f5e" height={35} margin={3} />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen font-sans text-gray-800 bg-white">
        <div className="px-4 py-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        <div className="flex flex-col lg:flex-row h-auto lg:h-[70vh] p-4 gap-6">
          <div className="w-full lg:w-[40%] bg-gray-100 rounded-md flex flex-col items-center justify-center p-4 max-h-[70vh] overflow-auto">
            <img
              src={currentImg}
              alt="Stash Main"
              className="max-h-[40vh] max-w-full object-contain"
            />

            {currentCreation?.author && (
              <div className="mt-4 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-3 px-2">
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 text-sm font-semibold">Designer:</p>
                  <div className="flex items-center gap-1">
                    <img
                      src={currentCreation.author.avatar}
                      alt="Author Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-gray-700 text-sm max-w-[100px] sm:max-w-none">
                      {currentCreation.author.username}
                    </p>
                  </div>
                </div>

                {/* View Outlooks Button with Badge */}
                <Link to={`/outlook/${currentCreation._id}`} className="w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <button className="btn btn-outline w-full sm:w-auto bg-rose-500 text-white hover:bg-rose-600 transition flex justify-center items-center gap-2 py-2 px-4">
                      <Eye size={16} className="block lg:hidden" />
                      <Eye size={20} className="hidden lg:block" />
                      <span>View Outlooks</span>
                    </button>

                    {currentCreation.outlooks?.length > 0 && (
                      <span className="badge badge-md badge-warning absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                        {currentCreation.outlooks.length}
                      </span>
                    )}
                  </div>
                </Link>
              </div>

            )}
          </div>

          <div className="w-full lg:w-1/2 p-2 lg:p-4 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold font-lato text-gray-900 mt-2">{stash.title}</h1>

            <div className="flex items-center gap-3">
              <img src={stash.owner.avatar} alt="owner" className="w-9 h-9 rounded-full object-cover" />

              <div>
                <p className="font-semibold">{stash.owner.username}</p>
                <p className="text-sm text-gray-500">{stash.owner.email}</p>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Created {formatDistanceToNow(new Date(stash.createdAt), { addSuffix: true })}
            </p>

            <p className="text-sm text-gray-700 border-l-2 border-gray-500 pl-3 font-lato">
              {stash.desc}
            </p>

            {/* Style Chain */}
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center'>
              <h2 className="text-base font-lato font-semibold">Style Chain:</h2>
              <div className="flex items-center space-x-[-10px]">
                {stash.styleChain.map((m, idx) => (
                  <img
                    key={idx}
                    src={m.designer.avatar}
                    alt={`designer-${idx}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white -ml-2"
                    title={`${m.designer.username} (${m.role})`}
                  />
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white p-4 rounded-xl shadow w-full h-[150px] sm:h-[170px] transition-transform">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Total Creations</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 7v13h18V7H3z" />
                      <path d="M16 3H8v4h8V3z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gray-800 font-oswald">{stash.creations.length}</h2>
                <p className="text-xs text-gray-500 mt-1">Designs published</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow w-full h-[150px] sm:h-[170px] transition-transform">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Total Outlooks</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gray-800 font-oswald">
                  {stash.creations.reduce((acc, curr) => acc + curr.outlooks.length, 0)}
                </h2>
                <p className="text-xs text-gray-500 mt-1">User feedback entries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Creations Section */}
        <div className="mt-6 px-4">
          <h2 className="text-2xl font-bold font-lato text-gray-800 mb-2">Creations</h2>
          <div className="h-[200px] sm:h-[250px] lg:h-[30vh] bg-gray-100 rounded-md p-3 overflow-x-auto flex gap-3 items-center">
            {stash.creations.map((c, i) => (
              <img
                key={i}
                src={c.url}
                alt={`creation-${i}`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setCurrentImage(c.url)
                  setCurentCreation(c);
                }}
                className="h-full max-w-[180px] sm:max-w-[200px] object-contain rounded-md cursor-pointer hover:opacity-80 transition"
              />
            ))}
          </div>
        </div>

        <SleekFooter />
      </div>
    </>
  );
}


export default ViewStash;
