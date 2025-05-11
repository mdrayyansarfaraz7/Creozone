function ProfileUserCard({ username, email, avatarURL = "/male.png", designerType, isOwner }) {
  return (
    <div className="w-full md:w-[340px] h-[450px] rounded-md bg-gray-100 shadow-md p-5 flex flex-col items-center">
      <div className="h-56 w-56 p-3 rounded-full border border-rose-500 flex items-center justify-center">
        <img src={avatarURL} alt="Profile" className="h-48 w-48 rounded-full object-cover" />
      </div>

      <h1 className="text-xl font-lato font-bold mt-2">{username}</h1>
      <p className="text-sm text-gray-500 font-lato">{email}</p>
      <p className="text-sm text-gray-700 mt-1 font-lato">{designerType}</p>

      {isOwner ? (<>
        <button className="mt-3 px-6 py-1 w-full text-sm bg-rose-500 text-white rounded-md hover:bg-rose-700 transition" onClick={() => document.getElementById('my_modal_1').showModal()}>
          Edit Profile
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-lato text-3xl mb-4">Update Profile</h3>
            <form method="dialog" className="space-y-4">

              <div>
                <label className="label">Username</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="username"
                  value={username}
                />
              </div>

              <div>
                <label className="label">Sex</label>
                <select className="select select-bordered w-full" name="sex">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="label">Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  name="avatar"
                />
              </div>

              <div>
                <label className="label">Designer Type</label>
                <select className="select select-bordered w-full" name="designerType">
                  {[
                    "Graphic Designer", "UI/UX Designer", "Product Designer", "Web Designer",
                    "Visual Designer", "Interaction Designer", "Motion Designer", "Brand Designer",
                    "Logo Designer", "Print Designer", "Illustrator", "2D Animator", "3D Designer",
                    "3D Animator", "Typographer", "Design Strategist", "Creative Director",
                    "Art Director", "Mobile App Designer"
                  ].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow">Update</button>
              </div>
            </form>
          </div>
        </dialog>

      </>

      ) : (
        <button className="mt-3 px-6 py-1 w-full text-sm border border-rose-500 text-rose-500 rounded-md hover:bg-rose-500 hover:text-white transition">
          Follow
        </button>
      )}

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
  );
}

export default ProfileUserCard;
