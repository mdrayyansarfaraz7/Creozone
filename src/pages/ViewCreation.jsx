import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ColorThief from 'colorthief';
import { ScaleLoader } from 'react-spinners';
import { ThumbsUp, Share2, Info, Eye, Send, SidebarClose } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';

function ViewCreation() {
    const { id } = useParams();
    const [creation, setCreation] = useState(null);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [colors, setColors] = useState([]);
    const [suggested, setSuggested] = useState([]);
    const [loading, setLoading] = useState(true);
    const imgRef = useRef();

    const { user, checkAuth } = useAuthStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const isOwner = user ? true : false;

    useEffect(() => {
        const fetchCreationDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/creation/${id}`);
                const data = response.data.creationDetails;
                setCreation(data);
                setLoading(false);
                if (data && data.category) {
                    const suggestedRes = await axios.get(`http://localhost:8080/api/creation/categorycreations/${data.category}`);
                    const allCategoryCreations = suggestedRes.data.creations;
                    const related = allCategoryCreations
                        .filter((item) => item._id !== data._id)
                        .slice(0, 4);

                    setSuggested(related);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCreationDetails();
    }, [id]);


    const handleImageLoad = () => {
        if (!imgRef.current) return;

        const image = imgRef.current;
        setWidth(image.naturalWidth);
        setHeight(image.naturalHeight);

        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(image, 5);
        setColors(palette);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ScaleLoader color="#f43f5e" height={35} margin={3} />
            </div>
        );
    }

    return (
        <>
            <div className='hidden md:inline'>
                <Sidebar isOwner={isOwner} />
            </div>

            <div className="ml-1 md:ml-52 p-6 max-w-2xl lg:max-w-4xl xl:max-w-[90%] mx-auto">
                {creation ? (
                    <>
                        <div className="bg-base-200 rounded-xl p-4 shadow-md">

                            <div className="flex justify-between flex-wrap items-center gap-4 mx-4 mb-4">
                                <Link to={`/profile/${creation.author.username}`}>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={creation.author.avatar}
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h2 className="font-lato text-sm md:text-lg font-semibold">{creation.author.username}</h2>
                                        <p className="text-xs md:text-sm font-lato text-gray-500">{creation.author.email}</p>
                                    </div>
                                </div>
                                </Link>


                                <button className="bg-rose-500 text-white rounded-md font-lato px-2 py-1 lg:px-5 lg:py-2 flex gap-2 items-center sm:px-3 sm:py-2">
                                    <Eye size={16} className="block lg:hidden" />
                                    <Eye size={20} className="hidden lg:block" />
                                    <span className="hidden sm:inline">Outlooks</span>
                                </button>
                            </div>

                            <div className="flex justify-center ">
                                <img
                                    ref={imgRef}
                                    src={creation.url}
                                    alt="Creation"
                                    crossOrigin="anonymous"
                                    onLoad={handleImageLoad}
                                    className="max-w-[90%] max-h-screen md:max-h-[70vh] rounded-lg object-contain scale-95 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex items-center justify-between mx-3 flex-wrap gap-4 mt-6">
                            <Link to={`/stash/${creation.stash._id}`}>
                                <div>
                                    <p className="font-lato text-sm text-gray-500">category: {creation.category}</p>
                                    <p className="text-lg font-lato text-gray-600">Stash: {creation.stash.title}</p>
                                </div>
                            </Link>


                                <div className="flex gap-3 flex-wrap">
                                    <button className="btn btn-sm bg-rose-500 text-white hover:bg-rose-600 gap-2">
                                        <ThumbsUp size={16} /> {creation.likes.length}
                                    </button>
                                    <button className="btn btn-sm bg-gray-200 text-gray-500 hover:bg-gray-300 gap-2">
                                        <Send size={16} /> <span className="hidden sm:inline">Share</span>
                                    </button>
                                    <label htmlFor="more-info-modal" className="btn btn-sm bg-gray-200 text-gray-500 hover:bg-gray-300 gap-2">
                                        <Info size={16} /> <span className="hidden sm:inline">More Info</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {suggested.length > 0 && (
                            <div className="mt-10">
                                <h2 className="text-4xl text-center md:text-left font-bold mb-6 font-lato text-slate-800">
                                    Related <span className='text-rose-500'>Creations</span>
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 px-4 md:px-0 justify-items-center">
                                    {suggested.map((item) => (
                                        <Link to={`/creation/${item._id}`} key={item._id} className="w-full max-w-[200px]">
                                            <div className="bg-white rounded-sm shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
                                                <img
                                                    src={item.url}
                                                    alt="Suggested"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <input type="checkbox" id="more-info-modal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-2xl font-lato">Design Info</h3>
                                <p className="mt-2 font-lato">Dimensions: {width} x {height} px</p>
                                <div className="mt-4 font-lato flex gap-4 items-center">
                                    Color Palette:
                                    <div className="flex gap-2 mt-2">
                                        {colors.map((color, index) => (
                                            <div
                                                key={index}
                                                className="w-6 h-6 rounded-full border"
                                                style={{ backgroundColor: `rgb(${color.join(',')})` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="modal-action">
                                    <label htmlFor="more-info-modal" className="btn">Close</label>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500 mt-6"> No creation found.</p>
                )}
            </div>
        </>
    );
}

export default ViewCreation;
