
import { useAuthStore } from "../store/useAuthStore";
import ProfileUserCard from "../components/ProfileUserCard";
import Sidebar from "../components/Sidebar";
import { Boxes } from "lucide-react";
import StashCard from "../components/StashCard";
import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Masonry from 'react-masonry-css';
import { useEffect, useState } from "react";
import axios from "axios";
import BentoGrid from "../components/BentoGrid";
import { formatDistanceToNow } from "date-fns";

function Profile() {
  const { user, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log(user);
  const { username } = useParams();
  const isOwner = username === user?.username;

  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Details = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/api/user/${username}`);
        setProfileData(res.data.userDetails);
        console.log(res.data.userDetails);
      } catch (e) {
        console.log(e);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };
    Details();
  }, [username]);

  console.log("Users stash Array:", profileData.stash);
  console.log("Users creations Array:", profileData.creations);

  const acceptedRefinements = profileData?.refinements?.filter((u) => u.id.status === 'accepted') || [];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <ScaleLoader color="#f43f5e" />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar username={user?user.username:profileData.username} isOwner={user?true:false} />

      <div className="flex-1 ml-14 md:ml-52 p-3 overflow-y-auto h-screen flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <ProfileUserCard profileData={profileData} isOwner={isOwner} />

          <div className="flex-1 w-full h-auto bg-gray-100 rounded-md shadow p-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow w-full h-[170px] transition-transform  duration-200 ease-in-out cursor-pointer">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Stashs</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <Boxes size={20} />
                  </div>
                </div>
                <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">{profileData.stash.length}</h2>
                <p className="text-xs text-gray-500 mt-1">Total stash items saved</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow w-full h-[170px] transition-transform  duration-200 ease-in-out cursor-pointer">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Outlooks</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">{profileData.outlooks.length}</h2>
                <p className="text-xs text-gray-500 mt-1">User feedback entries</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow w-full h-[170px] transition-transform  duration-200 ease-in-out cursor-pointer">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Refinements</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">{profileData.refinements.length}</h2>
                <p className="text-xs text-gray-500 mt-1">Total refinement requests</p>
              </div>

              {/* Creations */}
              <div className="bg-white p-4 rounded-xl shadow w-full h-[170px] transition-transform duration-200 ease-in-out cursor-pointer">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Creations</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 7v13h18V7H3z" />
                      <path d="M16 3H8v4h8V3z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">{profileData.creations.length}</h2>
                <p className="text-xs text-gray-500 mt-1">Designs published</p>
              </div>
            </div>

          </div>
        </div>
        <div className="mt-5 flex flex-col-reverse md:flex-row justify-center items-stretch gap-5 bg-gray-100 rounded-md px-3 py-8">

          <div className="bg-white shadow rounded-xl p-4 h-auto w-full md:w-72 flex-1">
            {
              profileData.stash.length === 0 ? (
                <div className="bg-gray-100 rounded-lg flex flex-col justify-center items-start p-4 h-full">
                  <h2 className="text-lg font-semibold text-gray-400">No Stash Created Yet</h2>

                  {
                    isOwner ? (<>
                      <p className="text-sm text-gray-600 mt-1">Create your first stash to get started organizing your ideas.</p>
                      <Link to={'/create-stash'}>
                        <button className="mt-4 px-5 py-2 text-sm bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow transition-all duration-200">
                          + Create New Stash
                        </button>
                      </Link>

                    </>) : (<></>)
                  }

                </div>
              ) : (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 h-full">
                  <div>
                    <h3 className="text-sm text-gray-500">Last Updated Stash</h3>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-1">{profileData.stash[profileData.stash.length - 1].title}</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(profileData.stash[profileData.stash.length - 1].updatedAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div>
                    {isOwner ? (<>
                      <Link to={'/create-stash'}>
                        <button className="mt-4 px-5 py-2 text-sm bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow transition-all duration-200">
                          + Create New Stash
                        </button>
                      </Link>
                      <p className="text-sm text-gray-600 mt-2">Start organizing your next design idea.</p> </>) : (<></>)}
                  </div>
                </div>
              )
            }
          </div>
          <div className="bg-white shadow rounded-xl px-4 py-6 h-auto w-full md:w-72 flex-1">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm text-gray-500">Refinements Summary</h3>
                <h2 className="text-lg font-semibold text-gray-800 mt-1">Total: {profileData.refinements.length}</h2>
                <p className="text-xs text-gray-600 mt-1">
                  Accepted: {acceptedRefinements.length} • Pending: {profileData.refinements.length - acceptedRefinements.length}
                </p>
              </div>
              <div className="bg-gray-300 h-1.5 rounded-full relative mt-1">
                <div
                  className="bg-green-500 h-full rounded-full"
                  style={{
                    width: acceptedRefinements.length > 0
                      ? `${(acceptedRefinements.length / profileData.refinements.length) * 100}%`
                      : '0%',
                  }}
                ></div>
                <p className=" text-xs text-center text-gray-500 mt-1">
                  {acceptedRefinements.length > 0
                    ? `${((acceptedRefinements.length / profileData.refinements.length) * 100).toFixed(2)}% Acceptance`
                    : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-5xl font-lato text-center md:text-left font-semibold text-gray-800 my-5">
            Popular <span className="text-rose-500">Stashes</span>
          </h2>

          {profileData.stash.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-10 bg-gray-100 rounded-xl shadow-lg">


              <p className="text-2xl font-lato text-gray-800 mb-4">Looks like you haven't created any stashes yet.</p>
              {
                isOwner ? (<>
                  <p className="text-sm text-gray-500 mb-6">Start organizing your design ideas by creating a stash.</p>

                  <Link to={'/create-stash'}>
                    <button className="mt-4 px-5 py-2 text-sm bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow transition-all duration-200">
                      + Create New Stash
                    </button>
                  </Link>

                </>) : (<></>)
              }

            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              {profileData.stash.slice(0, 4).map((s) => (
                <Link to={`/stash/${s._id}`} key={s._id}>
                  <StashCard
                    thumb={s.thumbnail}
                    title={s.title}
                    desc={s.desc}
                    StyleChain={s.styleChain}
                    noCrea={s.creations?.length}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-5xl text-center md:text-left  font-lato font-semibold text-gray-800 my-5">
            Top <span className="text-rose-500">Creations</span>
          </h2>
          <div className="mt-3 bg-gray-100 w-full rounded-md h-auto">
            {profileData.creations.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-12 bg-gray-100 rounded-xl shadow-inner text-center">
                <p className="text-2xl font-lato text-gray-800 mb-4">No Creations Created!</p>
                <p className="text-sm text-gray-500 ">
                  It seems like nothing has been crafted so far.
                </p>
              </div>
            ) : (
              <BentoGrid creations={profileData.creations} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
