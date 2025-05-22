import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import StashCard from '../components/StashCard';
import { ScaleLoader } from 'react-spinners';

function AllStash() {
  const { user, checkAuth } = useAuthStore();
  const [stash, setStash] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { username } = useParams();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(user);
  const isOwner = user?true:false;

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

  return (
    <div className="flex gap-2">
      <Sidebar username={user?.username || username} isOwner={isOwner} />

      <div className="flex-1 ml-14 md:ml-52 p-4 overflow-y-auto h-screen flex flex-col gap-6">
        <div className="mt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-lato">
            {isOwner ? (
              'Your Stashes'
            ) : (
              <>
                Stashes <span className="text-lg font-medium text-gray-500 align-middle">/ {username}</span>
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
          <div className="text-gray-400 text-lg mt-10 italic">
            {isOwner ? "You haven't created any stashes yet." : "No stashes to show."}
          </div>
        ) : (
          stash.map((s) => (
            <Link to={`/stash/${s._id}`} key={s._id}>
              <StashCard
                thumb={s.thumbnail}
                title={s.title}
                desc={s.desc}
                StyleChain={s.styleChain}
                noCrea={s.creations?.length}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default AllStash;
