import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

function AllCreatedOutlooks() {
  const { user } = useAuthStore();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/${username}`);
        setUserDetails(response.data.userDetails);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [username]);

  const myOutlooks = userDetails.outlooks || [];

  return (
    <div className="flex font-lato text-gray-800">
      <Sidebar username={user?.username || username} isOwner={!!user} />

      <div className="flex-1 ml-14 md:ml-52 p-6 space-y-6 overflow-y-auto h-screen">
        <h1 className="text-2xl font-semibold border-b pb-2">Created Outlooks</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          myOutlooks.map((outlook, idx) => (
            <div key={idx} className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={outlook.author?.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{outlook.author?.username}</p>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(outlook.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-700">
                <p className="mb-2">{outlook.feedback}</p>

                <a
                  href={`/creation/${outlook.creation}`} 
                  className="inline-block text-rose-600 text-sm font-medium hover:underline mt-1"
                >
                  View Creation →
                </a>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Your Refinements</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {outlook.refinementRequest
                    ?.filter(ref => ref?.proposer?._id === user?._id)
                    .map((ref, refIdx) => (
                      <div
                        key={refIdx}
                        className="border p-2 rounded shadow-sm hover:shadow transition"
                      >
                        <img
                          src={ref.ImgUrl}
                          alt="Refinement"
                          className="rounded-md object-cover w-full h-auto"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Status: {ref.status}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(ref.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    ))}
                  {outlook.refinementRequest?.filter(ref => ref?.proposer?._id === user?._id).length === 0 && (
                    <p className="text-sm text-gray-500 italic">No refinements from you.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllCreatedOutlooks;
