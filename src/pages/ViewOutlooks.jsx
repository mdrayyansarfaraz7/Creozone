import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ScaleLoader } from 'react-spinners';
import { useAuthStore } from '../store/useAuthStore';
import { Loader, PenTool } from 'lucide-react';
import ScrollToTop from '../utils/ScrollToTop';

function ViewOutlooks() {
  const { user, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  const navigate = useNavigate();

  const { id } = useParams();
  const [creation, setCreation] = useState(null);
  const [outlooks, setOutlooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayImg, setDisplayImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ feedback: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showRefineModal, setShowRefineModal] = useState(false);
  const [selectedOutlookId, setSelectedOutlookId] = useState(null);
  const [refineFile, setRefineFile] = useState(null);
  const [refining, setRefining] = useState(false);
  const [clickedRefinement, setClickedRefinement] = useState({});
  const [accepting, setAccepting] = useState(false);

  const handleRefineSubmit = async (e) => {
    e.preventDefault();
    if (!refineFile || !selectedOutlookId) return;

    const data = new FormData();
    data.append('userId', user._id);
    data.append("refinement", refineFile);

    try {
      setRefining(true);
      await axios.post(`http://localhost:8080/api/outlook/${selectedOutlookId}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRefining(false);
      setShowRefineModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Error submitting refinement:", err);
      setRefining(false);
    }
  };

  const handelAccept = async () => {
    try {
      const data = {
        url: displayImg,
        proposer: clickedRefinement.proposer,
        creationId: id
      };
      setAccepting(true);
      await axios.post(`http://localhost:8080/api/refinement/accept/${clickedRefinement._id}`, data, { withCredentials: true });
      setAccepting(false);
      navigate(`/profile/${user.username}`);
    } catch (error) {
      setAccepting(false);
      alert("something went wrong while accepting");
      console.log(error);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('author', user.username);
    data.append('feedback', formData.feedback);
    if (selectedFile) {
      data.append('refinement', selectedFile);
    }

    try {
      setSubmitting(true);
      await axios.post(`http://localhost:8080/api/outlook/create-outlook/${id}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setSubmitting(false);
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error('Error submitting outlook:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creationRes = await axios.get(`http://localhost:8080/api/creation/${id}`);
        setCreation(creationRes.data.creationDetails);
        setDisplayImg(creationRes.data.creationDetails.url);
        const outlookRes = await axios.get(`http://localhost:8080/api/outlook/${id}`);
        setOutlooks(outlookRes.data.outlooks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ScaleLoader color="#f43f5e" height={35} margin={3} />
      </div>
    );
  }
  console.log(outlooks);
  console.log(clickedRefinement);
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-6 gap-6">
      <ScrollToTop />
      {user && showModal && (
        <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="modal-box rounded-xl shadow-xl border border-gray-200 bg-white max-w-lg w-full mx-4">
            <h3 className="font-bold text-2xl font-lato text-gray-800 mb-5 text-center">
              Share Your <span className="text-rose-500">Outlook</span>
            </h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Username</label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full bg-gray-100 text-gray-500"
                  value={user?.username}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="textarea textarea-bordered textarea-md w-full bg-white"
                  placeholder="Share your thoughts, ideas, or suggestions..."
                  required
                  value={formData.feedback}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      feedback: e.target.value
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Optional File</label>
                <input
                  type="file"
                  className="file-input file-input-sm file-input-bordered w-full"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
              <div className="modal-action mt-6 flex justify-between">
                <button
                  type="submit"
                  className="bg-rose-500 text-white btn-sm py-1 px-3 rounded-md text-sm"
                  disabled={submitting}
                >
                  {submitting ? (<Loader className="w-5 h-5 animate-spin" />) : (
                    "Submit"
                  )}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-sm btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="lg:w-1/4 w-full ">
        <div className="sticky top-6 bg-white h-full rounded-2xl shadow p-4 flex flex-col justify-center items-center">
          <img
            src={displayImg}
            alt="Creation"
            className="w-full h-auto rounded-xl object-cover mb-4"
          />
          <div className="flex justify-center items-center">
            {user &&
              user.username === creation.author?.username &&
              displayImg !== creation.url && (
                <button
                  className="bg-rose-500 text-white text-sm rounded-md font-lato w-full px-2 py-1 lg:px-5 lg:py-2 disabled:opacity-50"
                  onClick={handelAccept}
                  disabled={accepting}
                >
                  {accepting ? "Accepting..." : "Accept"}
                </button>

              )}
          </div>
        </div>

      </div>
      <div className="lg:w-3/4 w-full overflow-y-auto max-h-[calc(100vh-4rem)] pr-1">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">

          <span className="text-xl text-gray-500 font-normal">Outlooks / Stash:</span>
          <Link to={`/stash/${creation.stash._id}`}>
            {creation.stash?.title}
          </Link>
        </h2>
        <div className="flex items-center gap-3 mt-4 mb-6 justify-between">
          <Link to={`/profile/${creation.author?.username}`} className="flex items-center gap-3">
            <img
              src={creation.author?.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800">{creation.author?.username}</p>
              <p className="text-sm text-gray-500">{creation.author?.email}</p>
            </div>
          </Link>

          {user && user.username !== creation.author?.username && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-rose-500 text-white text-sm rounded-md font-lato px-3 py-1 lg:px-5 lg:py-2 flex gap-2 items-center"
            >
              <PenTool size={16} className="block lg:hidden" />
              <PenTool size={20} className="hidden lg:block" />
              <span className="hidden sm:inline">Add Outlook</span>
            </button>
          )}
        </div>

        <hr className='mb-4' />
        {outlooks.length > 0 ? (
          outlooks.map((outlook) => (
            <div
              key={outlook._id}
              className="bg-white rounded-2xl p-4 mb-4 shadow border border-gray-200"
            >
              <div className="flex items-start justify-between mb-2">
                {outlook.author ? (
                  <>
                    <Link to={`/profile/${outlook.author.username}`}>
                      <div className="flex items-center gap-3">
                        <img
                          src={outlook.author.avatar}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{outlook.author.username}</p>
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(outlook.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </Link>

                    {user && user.username != creation.author?.username ? (<><button
                      className="bg-rose-500 text-white text-sm px-3 py-1 rounded hover:bg-rose-600 transition"
                      onClick={() => {
                        setSelectedOutlookId(outlook._id);
                        setShowRefineModal(true);
                      }}
                    >
                      Refine
                    </button></>) : (<> </>)}

                  </>
                ) : (
                  <p className="text-red-500 text-sm">Author info missing</p>
                )}
              </div>
              {user && showRefineModal && (
                <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                  <div className="modal-box rounded-xl shadow-xl border border-gray-200 bg-white max-w-lg w-full mx-4">
                    <h3 className="font-bold text-2xl font-lato text-gray-800 mb-5 text-center">
                      Upload <span className="text-rose-500">Refinement</span>
                    </h3>
                    <form className="flex flex-col gap-4" onSubmit={handleRefineSubmit} encType="multipart/form-data">
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Upload Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          required
                          className="file-input file-input-sm file-input-bordered w-full"
                          onChange={(e) => setRefineFile(e.target.files[0])}
                        />
                      </div>
                      <div className="modal-action mt-6 flex justify-between">
                        <button
                          type="submit"
                          className="bg-rose-500 text-white btn-sm py-1 px-3 rounded-md text-sm"
                          disabled={refining}
                        >
                          {refining ? (<Loader className="w-5 h-5 animate-spin" />) : (
                            "Upload"
                          )}
                        </button>
                        <button type="button" onClick={() => setShowRefineModal(false)} className="btn btn-sm btn-outline">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}



              <p className="text-gray-700 mb-3">{outlook.feedback}</p>

              {outlook.refinementRequest?.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                  {outlook.refinementRequest.map((refine) => (

                    <div key={refine._id} className="flex flex-col items-center">
                      <img
                        src={refine.ImgUrl}
                        alt="refinement"
                        className="w-24 h-24 object-cover rounded-xl border cursor-pointer hover:scale-105 transition"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setClickedRefinement(refine);
                          setTimeout(() => {
                            setDisplayImg(refine.ImgUrl);
                          }, 400);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No outlooks"
              className="w-24 h-24 mb-4 opacity-70"
            />
            <h3 className="text-lg font-semibold">No Outlooks Yet</h3>
            <p className="text-sm">Be the first to share your thoughts or suggestions!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewOutlooks;
