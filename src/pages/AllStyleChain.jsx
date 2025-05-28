import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import StashCard from '../components/StashCard';
import { ScaleLoader } from 'react-spinners';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';


function AllStyleChain() {
  const { user, checkAuth } = useAuthStore();
  const [stash, setStash] = useState([]);
  const [loading, setLoading] = useState(true);

  const { username } = useParams();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(user);
  const isOwner = user ? true : false;

  console.log(isOwner);
  useEffect(() => {
    const fetchStashDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stash/all-stashes/${username}`);
        setStash(response.data.allStashes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStashDetails();
  }, [username]);
  console.log(stash);
  return (
    <div className="flex gap-2">
      <Sidebar username={user?.username || username} isOwner={isOwner} />

      <div className="flex-1 ml-14 md:ml-52 p-4 overflow-y-auto h-screen flex flex-col gap-6">
        <div className="mt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-lato">
            {isOwner ? (
              'Style-Chains'
            ) : (
              <>
                Style Chain <span className="text-lg font-medium text-gray-500 align-middle">/ {username}</span>
              </>
            )}
          </h1>


          <p className="text-gray-500 mt-1 text-sm">Browse through all the stashes in one place</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <ScaleLoader color="#f43f5e" />
          </div>
        ) : stash.length === 0 ? (
          <div className="text-gray-400 font-lato text-lg mt-10 italic">
            No stash Created
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stash.map((s) => {
              const creatorId = s.styleChain.find((entry) => entry.role === 'creator')?.designer?._id;
              console.log(creatorId);
              const creatorCreations = s.creations?.filter(c => c.author === creatorId) || [];
              const contributorCreations = s.creations?.filter(c => c.author !== creatorId) || [];

              return (
                <div
                  key={s._id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 truncate">
                    {s.title}
                  </h2>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Style Chain:</p>
                    <div className="flex items-center -space-x-4">
                      {s.styleChain?.map((entry) => (
                        <div key={entry._id} className="relative group">
                          <img
                            src={entry.designer.avatar}
                            alt={entry.role}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:z-10 transition"
                          />
                          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] bg-gray-700 text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                            {entry.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-36 mt-auto pt-4 border-t">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { label: 'Total', value: s.creations?.length || 0 },
                          { label: 'Creator', value: creatorCreations.length },
                          { label: 'Contributors', value: contributorCreations.length },
                        ]}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                      >
                        <XAxis dataKey="label" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                    
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          <Cell fill="#f43f5e" /> 
                          <Cell fill="#3b82f6" /> 
                          <Cell fill="#fbbf24" /> 
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                </div>
              );
            })}
          </div>

        )}
      </div>
    </div>
  );
}

export default AllStyleChain