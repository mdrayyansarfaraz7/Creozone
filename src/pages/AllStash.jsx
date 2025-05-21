import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import StashCard from '../components/StashCard';

function AllStash() {
const { user, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

    const [stash, setStash] = useState([]);
    const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const isOwner = username === user?.username;
  console.log(isOwner);
  useEffect(() => {
    const fetchStashDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stash/all-stashes/${username}`);
        console.log(response);
        setStash(response.data.allStashes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStashDetails();

  }, [username]);

  console.log(loading);
  console.log(stash);
  return (
    <div className="flex gap-2">
      <Sidebar username={user?user.username:username} isOwner={isOwner} />
      <div className='flex-1 ml-14 md:ml-52 p-3 overflow-y-auto h-screen flex flex-col gap-6'>
        
        {
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
              ))}
      </div>
    </div>
  )
}

export default AllStash