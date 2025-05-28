import {
    Home,
    User,
    Compass,
    Boxes,
    PenTool,
    BarChart2,
    Layers,
    Eye,
    ChevronDown,
    LogOut,
    Settings,
    EllipsisVertical,
    ChevronUp,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Sidebar = ({ isOwner, username }) => {
    const { user } = useAuthStore();
    const navItems = [
        { icon: <Home size={20} />, label: "Home", url: "/" },
        { icon: <Compass size={20} />, label: "Explore", url: "/" },
        { icon: <User size={20} />, label: "Profile", url: `/profile/${username}` },
        { icon: <Boxes size={20} />, label: "Stashs", url: `/all-stash/${username}` },
        { icon: <Layers size={20} />, label: "StyleChains", url: `/your-style-chain/${username}` },
        { icon: <Eye size={20} />, label: "Outlooks", url: `/your-outlooks/${username}` },
    ];

    const filteredItems = isOwner ? navItems : navItems.slice(0, 3);

    return (
        <aside className="fixed top-0 left-0 h-screen w-14 md:w-52 bg-base-200 shadow-md flex flex-col justify-between p-3 z-10">
            <div>
                <img src="/Logo Icon.png" alt="Logo" className="h-10 mb-8" />
                <ul className="space-y-2">
                    {filteredItems.map((item, i) => (
                        <Link to={item.url}>
                            <li
                                key={i}
                                className="rounded-md hover:bg-transparent border border-base-100 hover:border-rose-500 transition-all duration-200"
                            >
                                <a className="flex items-center gap-3 font-lato text-sm px-2 py-2 text-black cursor-pointer">
                                    <span className="text-gray-800">{item.icon}</span>
                                    <span className="hidden md:inline">{item.label}</span>
                                </a>
                            </li>
                        </Link>

                    ))}
                </ul>
            </div>
            {isOwner && (
                <div className="dropdown dropdown-top">
                    <label tabIndex={0} className="btn btn-ghost w-full justify-between p-2">
                        <div className="flex items-center gap-2">
                            <EllipsisVertical className="text-4xl md:hidden" />
                            <img
                                src={user.avatar ? user.avatar : (user.sex === "Male" ? '/male.png' : '/female.png')}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-xs font-lato hidden md:inline">{user.username}</span>
                            <ChevronUp size={16} className="hidden md:inline" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu menu-sm p-2 shadow bg-base-100 rounded-box w-40 mb-2">
                        <li>
                            <a className="flex items-center gap-2 text-sm px-2 py-1 text-rose-500 hover:bg-transparent">
                                <LogOut size={16} /> Sign Out
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
