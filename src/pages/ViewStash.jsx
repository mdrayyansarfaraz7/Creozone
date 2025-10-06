import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ScaleLoader } from 'react-spinners';
import SleekFooter from '../components/SleekFooter';
import { BrushIcon, ImagePlus, LucideBrush, PenTool, ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import { useAuthStore } from '../store/useAuthStore';
import { useRef } from 'react';

function ViewStash() {

  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const { id } = useParams();
  const [stash, setStash] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImage] = useState('');
  const [currentCreation, setCurentCreation] = useState([]);
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [preview, setPreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCreationSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('creation', fileRef.current.files[0]);
    formData.append('tags', tags);
    formData.append('category', category);
    formData.append('userId', user._id);
    console.log(selectedFile);
    try {
      setSubmitting(true);
      await axios.post(`https://creozone-backend.onrender.com/api/creation/create/${id}`, formData, { withCredentials: true }, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitting(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to upload creation:', error);
    }
  };
  useEffect(() => {
    const fetchStashDetails = async () => {
      try {
        const response = await axios.get(`https://creozone-backend.onrender.com/api/stash/${id}`);
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
              className="max-h-[50vh] max-w-full object-contain"
            />

            {currentCreation?.author && (
              <div className="mt-4 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-3 px-2">
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 text-sm font-semibold">Designer:</p>
                  <Link to={`/profile/${currentCreation.author.username}`}>
                    <div className="flex items-center gap-1">
                      <img
                        src={currentCreation.author.avatar ? currentCreation.author.avatar :( currentCreation.author.sex==='male'?'/male.png':'/female.png')}
                        alt="Author Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <p className="text-gray-700 text-sm max-w-[100px] sm:max-w-none">
                        {currentCreation.author.username}
                      </p>
                    </div>
                  </Link>

                </div>
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

          <div className="w-full lg:w-[60%] p-2 lg:p-4 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold font-lato text-gray-900 mt-2">{stash.title}</h1>
            <Link to={`/profile/${stash.owner.username}`}>
              <div className="flex items-center gap-3">

                <img src={stash.owner.avatar ? stash.owner.avatar : (stash.owner.sex==='male'?'/male.png':'/female.png')} alt="owner" className="w-9 h-9 rounded-full object-cover" />

                <div>
                  <p className="font-semibold">{stash.owner.username}</p>
                  <p className="text-sm text-gray-500">{stash.owner.email}</p>
                </div>


              </div>
            </Link>

            <p className="text-xs text-gray-500">
              Created {formatDistanceToNow(new Date(stash.createdAt), { addSuffix: true })}
            </p>

            <p className="text-sm text-gray-700 border-l-2 border-gray-500 pl-3 font-lato">
              {stash.desc}
            </p>
            {<div className="flex flex-wrap gap-3 font-sans">
              {stash.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-50 text-slate-500 px-4 py-1 rounded-full text-sm font-normal select-none"
                >
                  #{tag}
                </span>
              ))}
            </div>}
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center'>
              <h2 className="text-base font-lato font-semibold">Style Chain:</h2>
              <div className="flex items-center space-x-[-10px]">
                {stash.styleChain.map((m, idx) => (
                  <img
                    key={idx}
                    src={m.designer.avatar? m.designer.avatar : ( m.designer.sex==='male'?'/male.png':'/female.png')}
                    alt={`designer-${idx}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white -ml-2"
                    title={`${m.designer.username} (${m.role})`}
                  />
                ))}
              </div>
            </div>

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
        <div className="mt-6 px-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold font-lato text-gray-800">All Creations</h2>

            {user && stash.owner.username === user.username && (

              <label htmlFor="add-creation-modal" className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow cursor-pointer">
                + Add Creation
              </label>
            )}
            <input type="checkbox" id="add-creation-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box max-w-md bg-base-100 shadow-lg rounded-xl">
                <h3 className="text-2xl font-semibold mb-4">Add a New <span className='text-rose-500'>Creation</span> </h3>

                <form className="space-y-4" onSubmit={handleCreationSubmit} encType="multipart/form-data">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Upload Image</span>
                    </label>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPreview(reader.result);
                          };
                          reader.readAsDataURL(file);
                          setSelectedFile(file);
                        }
                      }}
                      className="file-input file-input-bordered w-full"
                    />
                    {preview && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-1">Preview:</p>
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-auto rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </div>

                  {/* Tags Input */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Tags</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., minimal, vector, dark"
                      className="input input-bordered w-full"
                      value={tags}
                      required
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Category</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={category}
                      required
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">select category</option>
                      <option value="logos">logos</option>
                      <option value="card-designs">card-designs</option>
                      <option value="branding">branding</option>
                      <option value="graphics">graphics</option>
                      <option value="iconography">iconography</option>
                      <option value="ui-ux-design">ui-ux-design</option>
                      <option value="mocups">mocups</option>
                      <option value="print-design">print-design</option>
                      <option value="packaging">packaging</option>
                      <option value="news-letter">news-letter</option>
                    </select>
                  </div>


                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
                    >
                      {submitting ? (<>Submitting...</>) : (<>Submit Creation</>)}
                    </button>
                  </div>
                </form>

              </div>
              <label className="modal-backdrop" htmlFor="add-creation-modal"></label>
            </div>

          </div>
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
