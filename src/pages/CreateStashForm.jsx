
import axios from 'axios';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import ScrollToTop from '../utils/ScrollToTop';

function CreateStashForm() {

  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [extraPreviews, setExtraPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(thumbnail);
  console.log(extraImages);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(loading);
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('desc', desc);
      form.append('category', category);
      form.append('thumbnail', thumbnail);

      if (extraImages.length > 0) {
        extraImages.forEach((file) => {
          form.append('images', file);
        });
      }

      console.log(form.images);

      await axios.post(`http://localhost:8080/api/stash/create-stash/${user._id}`, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setLoading(false);
      navigate(`/profile/${user.username}`);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setExtraImages(files);
    setExtraPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <>
    <ScrollToTop/>
        <form className="max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-lg shadow-md rounded-xl border border-gray-200 font-lato mt-5" onSubmit={handleSubmit} encType='multipart/form-data'>
      <h2 className="text-3xl font-lato font-bold text-gray-800 mb-6">Create a New Stash</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Title <span className="text-rose-400">*</span></label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter stash title"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 transition duration-200"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Description <span className="text-rose-400">*</span></label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="What's in this stash?"
          rows={4}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 transition duration-200 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Category <span className="text-rose-400">*</span></label>
        <select className="w-full px-4 py-4 rounded-lg text-gray-500 border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 transition duration-200" name="category" defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
          {[
            'logos',
            'card-designs',
            'branding',
            'graphics',
            'iconography',
            'ui-ux-design',
            'mocups',
            'print-design',
            'packaging',
            'news-letter'
          ].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2 mt-2">Thumbnail <span className="text-rose-400">*</span></label>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-rose-100 file:text-rose-500 hover:file:bg-rose-200 transition"
        />
        {thumbnailPreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Thumbnail Preview:</p>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-auto object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Extra Images Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Further Creations </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleExtraImagesChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-rose-100 file:text-rose-500 hover:file:bg-rose-200 transition"
        />
        {extraPreviews.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Image Previews:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {extraPreviews.map((src, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <img src={src} alt={`Extra ${idx}`} className="w-full h-32 object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <button
        type="submit"
        className="w-full py-2.5 text-rose-500 border border-rose-500 bg-white hover:bg-rose-500 hover:text-white hover:border-white rounded-lg font-medium tracking-wide transition duration-200 flex items-center justify-center"
      >
        {loading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <>Create Stash</>
        )}
      </button>
    </form>
    </>

  );
}

export default CreateStashForm;
