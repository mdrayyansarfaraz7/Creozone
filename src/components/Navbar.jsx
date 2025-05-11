import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const handleLogout = async () => {
        try {
            await logout();

            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white backdrop-blur-xl shadow-[0_4px_15px_rgba(0,0,0,0.15)] border border-white/40 rounded-xl px-6 py-3 z-50 w-[90%] md:w-[70%] cursor-pointer">
            <div className="flex justify-between items-center">
                <img src="/Logo.png" alt="" className="h-10" />
                <ul className="hidden lg:flex gap-8 font-lato font-semibold">
                    <li className="text-gray-500 hover:text-gray-900 transition-all duration-300">Services</li>
                    <Link to={'/about'}>
                        <li className="text-gray-500 hover:text-gray-900 transition-all duration-300">About</li>
                    </Link>
                    <li className="text-gray-500 hover:text-gray-900 transition-all duration-300">Careers</li>
                    <li className="text-gray-500 hover:text-gray-900 transition-all duration-300">Contact</li>
                </ul>
                <div className="flex gap-4 font-lato">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to={`/profile/${user.username}`}>
                                <img
                                    src={user.avatar ? user.avatar : (user.sex === "Male" ? '/male.png' : '/female.png')}
                                    alt="User Avatar"
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-rose-600 border border-rose-600 px-3 py-1 rounded-sm hover:bg-rose-600 hover:text-white transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="bg-gradient-to-r from-rose-600 to-rose-500 text-white px-2 lg:px-8 py-1 rounded-sm hover:opacity-95 transition-all">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="bg-white text-rose-600 border border-rose-600 px-2 lg:px-4 py-1 rounded-sm hover:bg-rose-600 hover:text-white transition-all">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}


                </div>
            </div>
        </nav>
    );
}
