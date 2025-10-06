import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import BentoGrid from '../components/BentoGrid';

const categories = [
  'logos',
  'card-designs',
  'branding',
  'graphics',
  'iconography',
  'ui-ux-design',
  'mocups',
  'print-design',
  'packaging',
  'news-letter',
];

function ExploreCreations({cat=''}) {
  const { user, checkAuth } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(cat);
  const [creation, setCreation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [featuredCreator, setFeaturedCreator] = useState(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/top-creators');
        setFeaturedCreator(response.data?.topCreators?.[0] || null);
      } catch (error) {
        console.error('Error fetching top creator:', error);
      }
    };

    fetchCreator();
  }, []);

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/api/creation/search`, {
          params: { q: searchTerm }
        });
        setCreation(res.data.Allcreations);
      } catch (err) {
        console.error('Error fetching creations:', err);
        setCreation([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchByCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/api/creation/categorycreations/${selectedCategory}`);
        setCreation(res.data.creations);
      } catch (err) {
        console.error('Error fetching by category:', err);
        setCreation([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/api/creation/thumbnail`);
        setCreation(res.data.thumbnails);
      } catch (err) {
        console.error('Error fetching thumbnails:', err);
        setCreation([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== '') {
      const timeout = setTimeout(fetchFiltered, 300);
      return () => clearTimeout(timeout);
    } else if (selectedCategory !== '') {
      fetchByCategory();
    } else {
      fetchAll();
    }
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar username={user?.username} isOwner={!!user} />
      <main className="flex-1 ml-14 md:ml-52 p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-4 w-full md:max-w-3xl">
            <div>
              <h2 className="text-4xl font-lato font-bold text-slate-900">
                Explore <span className="text-rose-500">Creations</span>
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Browse unique designs from creators around the world.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-60 py-2.5 px-4 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search creations, tags, or designers..."
                  className="w-full py-2.5 pl-4 pr-10 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-3 h-5 w-5 text-gray-400"
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
          </div>

          {featuredCreator && (
            <div className="hidden md:flex rounded-xl w-full md:w-96 bg-white p-6 flex-col gap-4 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold border-b border-gray-200 pb-2 text-gray-800">
                Featured Creator
              </h3>
              <Link to={`/profile/${featuredCreator.username}`}>
                <div className="flex items-center gap-4">
                  <img
                    src={featuredCreator.avatar || '/male.png'}
                    alt={featuredCreator.username || "Creator"}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <div className="overflow-hidden">
                    <p className="font-semibold text-gray-900 truncate">{featuredCreator.username}</p>
                    <p className="text-sm text-gray-500 truncate">{featuredCreator.email || 'N/A'}</p>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <ScaleLoader color="#f43f5e" />
          </div>
        ) : creation.length === 0 ? (
          <div className="flex justify-center items-center py-20 text-gray-500 text-lg">
            No creations found.
          </div>
        ) : (
          <BentoGrid creations={creation} />
        )}
      </main>
    </div>
  );
}

export default ExploreCreations;
