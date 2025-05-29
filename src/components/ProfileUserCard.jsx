import axios from "axios";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ProfileUserCard({ profileData, isOwner }) {
  const {
    _id: id,
    username,
    email,
    avatar,
    sex,
    designerType,
    tools,
    followers,
    following
  } = profileData;

  const { user } = useAuthStore();
  const avatarURL = avatar ? avatar : sex === "Male" ? "/male.png" : "/female.png";

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(followers.includes(user._id));
  const [followLoading, setFollowLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    sex,
    designerType,
    tools,
    avatar
  });

  const dialogRef = useRef(null);

  const toolOptions = [
    "Adobe Photoshop", "Adobe Illustrator", "Figma", "Adobe XD", "Canva",
    "Sketch", "InVision", "CorelDRAW", "Affinity Designer", "Blender",
    "Cinema 4D", "Adobe After Effects", "Framer", "Glyphs"
  ];

  const handleFollowToggle = async () => {
    setFollowLoading(true);
    try {
      const url = isFollowing
        ? `http://localhost:8080/api/user/unfollow/${username}`
        : `http://localhost:8080/api/user/follow/${username}`;

      await axios.post(url, { userId: user._id }, { withCredentials: true });
      setIsFollowing(!isFollowing);
      window.location.reload();
    } catch (error) {
      console.error("Follow toggle error:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "tools") {
      setFormData((prev) => {
        const updatedTools = checked
          ? [...prev.tools, value]
          : prev.tools.filter((tool) => tool !== value);
        return { ...prev, tools: updatedTools };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("sex", formData.sex || "Male");
      form.append("designerType", formData.designerType);
      formData.tools.forEach((tool) => form.append("tools[]", tool));
      if (selectedFile) form.append("image", selectedFile);

      await axios.put(`http://localhost:8080/api/user/${id}`, form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      dialogRef.current.close();
      window.location.reload();
    } catch (error) {
      console.error(error);
      dialogRef.current.close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[340px] h-[450px] rounded-md bg-gray-100 shadow-md p-5 flex flex-col items-center">
      <div className="h-56 w-56 p-3 rounded-full border border-rose-500 flex items-center justify-center">
        <img src={avatarURL} alt="Profile" className="h-48 w-48 rounded-full object-cover" />
      </div>

      <h1 className="text-xl font-lato font-bold mt-2">{username}</h1>
      <p className="text-sm text-gray-500 font-lato">{email}</p>
      <p className="text-sm text-gray-700 mt-1 font-lato">{designerType}</p>

      {isOwner ? (
        <>
          <button
            className="mt-3 px-6 py-1 w-full text-sm bg-rose-500 text-white rounded-md hover:bg-rose-700 transition"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Edit Profile
          </button>

          <dialog ref={dialogRef} id="my_modal_1" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>

              <div className="pb-5 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 font-lato">Update Profile</h3>
                    <p className="text-sm text-gray-700">{username}</p>
                    <p className="text-sm text-gray-400">{email}</p>
                  </div>
                  <img
                    src={avatarURL}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm ml-auto"
                  />
                </div>
              </div>

              <form
                method="dialog"
                encType="multipart/form-data"
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="label">Sex</label>
                  <select
                    className="select select-bordered w-full"
                    name="sex"
                    defaultValue={formData.sex}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="label">Upload New Avatar</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>

                <div>
                  <label className="label">Designer Type</label>
                  <select
                    className="select select-bordered w-full"
                    name="designerType"
                    defaultValue={formData.designerType}
                    onChange={handleChange}
                  >
                    {[
                      "Graphic Designer", "UI/UX Designer", "Product Designer", "Web Designer",
                      "Visual Designer", "Interaction Designer", "Motion Designer", "Brand Designer",
                      "Logo Designer", "Print Designer", "Illustrator", "2D Animator", "3D Designer",
                      "3D Animator", "Typographer", "Design Strategist", "Creative Director",
                      "Art Director", "Mobile App Designer"
                    ].map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Tools You Use</label>
                  <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto bg-white">
                    <div className="grid grid-cols-2 gap-3">
                      {toolOptions.map((tool) => (
                        <label
                          key={tool}
                          className="flex items-center gap-2 text-xs text-gray-700 hover:text-rose-500 transition"
                        >
                          <input
                            type="checkbox"
                            name="tools"
                            value={tool}
                            checked={formData.tools.includes(tool)}
                            onChange={handleChange}
                            className="accent-rose-500 h-4 w-4"
                          />
                          <span>{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow"
                  >
                    {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </>
      ) : (
        <button
          onClick={handleFollowToggle}
          disabled={followLoading}
          className={`mt-3 px-6 py-1 w-full text-sm border rounded-md transition ${
            isFollowing
              ? "bg-white border-gray-400 text-gray-700 hover:bg-gray-100"
              : "border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white"
          }`}
        >
          {followLoading ? (
            <Loader className="w-4 h-4 animate-spin mx-auto" />
          ) : isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}

      <div className="flex justify-between gap-6 mt-4 font-lato text-sm">
        <div className="text-center">
          <p className="text-gray-700 font-bold">{followers.length}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-gray-700 font-bold">{following.length}</p>
          <p className="text-gray-500">Following</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileUserCard;
