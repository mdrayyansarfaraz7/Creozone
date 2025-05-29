import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="w-full flex justify-center mt-4">
            <nav className="w-[90%] md:w-[80%] bg-white/80 backdrop-blur-md shadow-md border border-zinc-200 rounded-2xl px-6 py-3 flex items-center justify-between font-lato z-50">

                {/* Left: Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Logo.png" alt="Creozone" className="h-10" />
                </Link>
                <ul className="hidden lg:flex items-center gap-8 text-zinc-600 font-medium text-sm tracking-tight">
                    <li className="relative group">
                        <Link to="/stashes" className="transition-colors hover:text-slate-800">
                            Stashes
                            <span className="block h-[2px] w-0 group-hover:w-full transition-all bg-slate-800 mt-1"></span>
                        </Link>
                    </li>
                    <li className="relative group">
                        <Link to="/creations" className="transition-colors hover:text-slate-800">
                            Creations
                            <span className="block h-[2px] w-0 group-hover:w-full transition-all bg-slate-800 mt-1"></span>
                        </Link>
                    </li>
                    <li className="relative group">
                        <Link to="/discover" className="transition-colors hover:text-slate-800">
                            Discover
                            <span className="block h-[2px] w-0 group-hover:w-full transition-all bg-slate-800 mt-1"></span>
                        </Link>
                    </li>
                </ul>

                {/* Right: Auth */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to={`/profile/${user.username}`}>
                                <img
                                    src={user.avatar || (user.sex === "Male" ? "/male.png" : "/female.png")}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-zinc-300"
                                />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-rose-600 border border-rose-500 px-4 py-1.5 rounded-full hover:bg-rose-600 hover:text-white transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="text-sm bg-rose-600 text-white px-5 py-1.5 rounded-full hover:opacity-90 transition-all">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="text-xs md:text-sm text-rose-600 border border-rose-500 px-5 py-1.5 rounded-full hover:bg-rose-600 hover:text-white transition-all">
                                    SignUp
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
