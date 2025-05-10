

function ProfileUserCard({username,email}) {
  return (
<div className="w-full md:w-[340px] h-[450px] rounded-md bg-gray-100 shadow-md p-5 flex flex-col items-center">
  <div className='h-56 w-56 p-3 rounded-full border border-rose-500 flex items-center justify-center'>
    <img src="/female.png" alt="Profile" className="h-48 w-48 rounded-full" />
  </div>

  <h1 className="text-xl font-lato font-bold">{username}</h1>
  <p className="text-sm text-gray-500 font-lato">{email}</p>
  <p className="text-sm text-gray-700 mt-1 font-lato">Visual Designer</p>

  <button className="mt-3 px-6 py-1 text-sm bg-rose-500 text-white rounded-full hover:bg-rose-700 transition">
    Edit Profile
  </button>

  <div className="flex justify-between gap-6 mt-4 font-lato text-sm">
    <div className="text-center">
      <p className="text-gray-700 font-bold">0</p>
      <p className="text-gray-500">Followers</p>
    </div>
    <div className="text-center">
      <p className="text-gray-700 font-bold">0</p>
      <p className="text-gray-500">Following</p>
    </div>
  </div>
</div>

  )
}

export default ProfileUserCard