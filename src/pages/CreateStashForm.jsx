
import { useState } from 'react';


function CreateStashForm() {


  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [extraPreviews, setExtraPreviews] = useState([]);

  console.log(thumbnail);
  console.log(extraImages);

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
    <form className="max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-lg shadow-md rounded-xl border border-gray-200 font-lato mt-5">
      <h2 className="text-3xl font-lato font-bold text-gray-800 mb-6">Create a New Stash</h2>

      {/* Title */}
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Thumbnail <span className="text-rose-400">*</span></label>
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
        className="w-full py-2.5 text-rose-500 border-2 border-rose-500 bg-white hover:bg-rose-500 hover:text-white hover:border-white rounded-lg font-medium tracking-wide transition duration-200"
      >
        Create Stash
      </button>
    </form>
  );
}

export default CreateStashForm;
