import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';

function ExploreStashes() {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const topCreators = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      avatarUrl: '/u2.jpeg',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      avatarUrl: '/u3.jpeg',
    },
    {
      id: 3,
      name: 'Carol White',
      email: 'carol.white@example.com',
      avatarUrl: '/u10.jpeg',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/75">
      <Sidebar username={user?.username} isOwner={!!user} />

      <main className="flex-1 ml-14 md:ml-52 p-8 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-2 gap-8">
          <div className="flex flex-col gap-4 w-full max-w-3xl">
            <div>
              <h2 className="text-4xl font-lato font-bold tracking-tight text-slate-900">
                Explore <span className="text-rose-500">Stashes</span>
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Dive into curated collections of inspiring design work by top creators
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search stashes, creators, or tags..."
                className="w-full py-2.5 pl-4 pr-10 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
          </div>
         <div className="hidden md:flex rounded-xl w-full md:w-96 bg-white p-6 flex-col gap-6">
            <h3 className="text-xl font-semibold mb-5 border-b border-gray-300 pb-2 text-gray-800">
              Top Creators
            </h3>
            <div className="flex flex-col gap-4 max-h-72 overflow-y-auto">
              {topCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 rounded-lg  transition-all duration-300"
                >
                  <img
                    src={creator.avatarUrl}
                    alt={creator.name}
                    className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-300"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{creator.name}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">{creator.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ExploreStashes;
