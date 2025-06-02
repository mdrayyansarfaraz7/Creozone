import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StashCard from '../components/StashCard';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

function ExploreStashes() {
  const { user, checkAuth } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [stashes, setStashes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topCreators, setTopCreators] = useState([]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/top-creators');
        setTopCreators(response.data.topCreators);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/api/stash/search`, {
          params: { q: searchTerm }
        });
        setStashes(res.data.stashes);
      } catch (err) {
        console.error('Error fetching stashes:', err);
      }
      setLoading(false);
    };

    if (searchTerm.trim() !== "") {
      const timeout = setTimeout(fetchFiltered, 300);
      return () => clearTimeout(timeout);
    } else {
      const fetchAll = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`http://localhost:8080/api/stash/all`);
          setStashes(res.data.stashes);
        } catch (err) {
          console.error('Error fetching all stashes:', err);
        }
        setLoading(false);
      };
      fetchAll();
    }
  }, [searchTerm]);

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stashes, creators, or tags..."
                className="w-full py-2.5 pl-4 pr-10 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent transition-all"
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
                <Link to={`/profile/${creator.username}`}>
                  <div
                    key={creator._id}
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-300"
                  >
                    <img
                      src={creator.avatar}
                      alt={creator.username}
                      className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-300"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{creator.username}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{creator.email}</p>
                    </div>
                  </div>
                </Link>

              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 mt-8 grid-cols-1 lg:grid-cols-2">
          {loading ? (
            <div className="flex justify-center items-center col-span-full py-12">
              <ScaleLoader color="#f43f5e" />
            </div>
          ) : stashes?.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-lg font-semibold text-slate-700">No stashes found </p>
              <p className="text-sm text-slate-500 mt-1">Try checking back later or create your own stash!</p>
            </div>
          ) : (
            stashes.map((stash) => (
              <Link to={`/stash/${stash._id}`}>
                <StashCard
                  key={stash._id}
                  thumb={stash.thumbnail}
                  title={stash.title}
                  desc={stash.desc}
                  noCrea={stash.creations.length}
                  StyleChain={stash.styleChain}
                />
              </Link>

            ))
          )}
        </div>

      </main>
    </div>
  );
}

export default ExploreStashes;
