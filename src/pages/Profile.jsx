import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import ProfileUserCard from "../components/ProfileUserCard";
import Sidebar from "../components/Sidebar";
import { Boxes } from "lucide-react";
import StashCard from "../components/StashCard";
import { FolderPlus } from 'lucide-react';
function Profile() {
  const { user } = useAuthStore();
  const Stash = [{
    thumb: '/death.png',
    title: 'Death:Book Cover',
    desc: '"Death: Book Cover" features a bold, haunting design that blends dark tones and eerie visuals, capturing the essence of suspense and mystery.',
    category: 'Print Design',
    noCrea: 17,
    StyleChain: ['/u10.jpeg', '/u4.jpeg', '/u6.jpeg']
  },
  {
    thumb: '/web1.png',
    title: `GardenUp's Website`,
    desc: 'Garden Up Store features a clean, earthy UI with intuitive navigation, showcasing plants and pots in an aesthetic, user-friendly layout.',
    category: 'UI/UX',
    noCrea: 5,
    StyleChain: ['/u10.jpeg', '/u3.jpeg', '/u6.jpeg']
  },
  {
    thumb: '/Larnan.png',
    title: 'Larnar Catering:Card Design',
    desc: '"Larnar Catering delivers exquisite, handcrafted meals for events, blending culinary expertise with personalized service to create unforgettable dining experiences.',
    category: 'Card Design',
    noCrea: 3,
    StyleChain: ['/u10.jpeg', '/u3.jpeg']
  },
  {
    thumb: '/Nebula.png',
    title: 'Nebula:Book Cover',
    desc: '"Nebula Journal offers a celestial-inspired platform for thoughts and creativity, merging cosmic aesthetics with space for introspection and expression.',
    category: 'Print Design',
    noCrea: 1,
    StyleChain: ['/u10.jpeg']
  }]

  const acceptedRefinements = user.refinements.filter((u) => u.status === 'accepted');
  return (
    <div className="flex">
      <Sidebar username={user.username} />

      <div className="flex-1 ml-14 md:ml-52 p-3 overflow-y-auto h-screen flex flex-col gap-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <ProfileUserCard username={user.username} email={user.email} avatarURL={user.avatar ? user.avatar : "/male.png"} />

          {/* Stats Section */}
          <div className="flex-1 w-full h-auto bg-gray-100 rounded-md shadow p-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stashs */}
              <div className="bg-white p-4 rounded-xl shadow w-full h-[170px] transition-transform hover:scale-105 duration-200 ease-in-out cursor-pointer">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Stashs</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <Boxes size={20} />
                  </div>
                </div>
                <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">{user.stash.length}</h2>
                <p className="text-xs text-gray-500 mt-1">Total stash items saved</p>
              </div>

              {/* Outlooks */}
              <div className="bg-white p-4 rounded-xl shadow w-full h-[170px] transition-transform hover:scale-105 duration-200 ease-in-out cursor-pointer">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Outlooks</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">{user.outlooks.length}</h2>
                <p className="text-xs text-gray-500 mt-1">User feedback entries</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow w-full h-[170px] transition-transform hover:scale-105 duration-200 ease-in-out cursor-pointer">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Refinements</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">{user.refinements.length}</h2>
                <p className="text-xs text-gray-500 mt-1">Total refinement requests</p>
              </div>

              {/* Creations */}
              <div className="bg-white p-4 rounded-xl shadow w-full h-[170px] transition-transform hover:scale-105 duration-200 ease-in-out cursor-pointer">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-medium text-gray-700">Creations</h1>
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 7v13h18V7H3z" />
                      <path d="M16 3H8v4h8V3z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">{user.creations.length}</h2>
                <p className="text-xs text-gray-500 mt-1">Designs published</p>
              </div>
            </div>

          </div>
        </div>
        <div className="mt-5 flex flex-col-reverse md:flex-row justify-center items-stretch gap-5 bg-gray-100 rounded-md px-3 py-8">

          <div className="bg-white shadow rounded-xl p-4 h-auto w-full md:w-72 flex-1">
            {
              user.stash.length === 0 ? (
                <div className="bg-gray-100 rounded-lg flex flex-col justify-center items-start p-4 h-full">
                  <h2 className="text-lg font-semibold text-gray-400">No Stash Created Yet</h2>
                  <p className="text-sm text-gray-600 mt-1">Create your first stash to get started organizing your ideas.</p>
                  <button className="mt-4 px-5 py-2 text-sm bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow transition-all duration-200">
                    + Create New Stash
                  </button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 h-full">
                  <div>
                    <h3 className="text-sm text-gray-500">Last Updated Stash</h3>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-1">Landing Page Concepts</h2>
                    <p className="text-xs text-gray-400 mt-1">Updated on May 8, 2025</p>
                  </div>
                  <div>
                    <button className="px-5 py-2 text-sm bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow transition-all duration-200">
                      + Create New Stash
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Start organizing your next design idea.</p>
                  </div>
                </div>
              )
            }
          </div>
          <div className="bg-white shadow rounded-xl p-4 h-auto w-full md:w-72 flex-1">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm text-gray-500">Refinements Summary</h3>
                <h2 className="text-lg font-semibold text-gray-800 mt-1">Total: {user.refinements.length}</h2>
                <p className="text-xs text-gray-600 mt-1">
                  Accepted: {acceptedRefinements.length} • Pending: {user.refinements.length - acceptedRefinements.length}
                </p>
              </div>
              <div className="bg-gray-300 h-1.5 rounded-full relative mt-1">
                <div
                  className="bg-green-500 h-full rounded-full"
                  style={{
                    width: acceptedRefinements.length > 0
                      ? `${(acceptedRefinements.length / user.refinements.length) * 100}%`
                      : '0%',
                  }}
                ></div>
                <p className="absolute inset-0 text-xs text-center text-gray-600">
                  {acceptedRefinements.length > 0
                    ? `${((acceptedRefinements.length / user.refinements.length) * 100).toFixed(2)}% Acceptance`
                    : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-5xl font-lato font-semibold text-gray-800 my-5">
            Popular <span className="text-rose-500">Stashes</span>
          </h2>

          {user.stash.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-10 bg-gray-100 rounded-xl shadow-lg">


              <p className="text-3xl font-lato text-gray-800 mb-4">Looks like you haven't created any stashes yet.</p>
              <p className="text-sm text-gray-500 mb-6">Start organizing your design ideas by creating a stash.</p>

              <button className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow transition-all duration-200">
                + Create New Stash
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              {Stash.map((s, i) => (
                <StashCard
                  key={i}
                  thumb={s.thumb}
                  title={s.title}
                  category={s.category}
                  desc={s.desc}
                  noCrea={s.noCrea}
                  StyleChain={s.StyleChain}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-5xl font-lato font-semibold text-gray-800 my-5">
            Creations
          </h2>
          <div className="mt-3 bg-gray-100 w-full rounded-md h-auto">
            {user.creations.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-12 bg-gray-100 rounded-xl shadow-inner text-center">
                <p className="text-3xl font-lato text-gray-800 mb-4">No Creations Created!</p>
                <p className="text-sm text-gray-500 ">
                  It seems like nothing has been crafted so far. Start expressing your ideas and your creations will appear here. Your canvas is ready whenever you are.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                {Stash.map((s, i) => (
                  <StashCard
                    key={i}
                    thumb={s.thumb}
                    title={s.title}
                    category={s.category}
                    desc={s.desc}
                    noCrea={s.noCrea}
                    StyleChain={s.StyleChain}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
