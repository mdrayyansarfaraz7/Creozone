export default function Navbar() {
    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white backdrop-blur-xl shadow-[0_4px_15px_rgba(0,0,0,0.15)] border border-white/40 rounded-xl px-6 py-3 z-50 w-[90%] md:w-[70%] cursor-pointer">
            <div className="flex justify-between items-center">
                <img src="/Logo.png" alt="" className="h-10" />
                <ul className="hidden lg:flex gap-8 font-lato font-semibold">
                    <li className="text-gray-500 hover:text-gray-900 transition-all duration-300">Services</li>
                    <li className="text-gray-500 hover:text-gray-900 transition-all duration-300">Works</li>
                    <li className="text-gray-500 hover:text-gray-900 transition-all duration-300">Careers</li>
                    <li className="text-gray-500 hover:text-gray-900 transition-all duration-300">Contact</li>
                </ul>
                <div className="flex gap-4 font-lato">
                    <button className="bg-gradient-to-r from-rose-600 to-rose-500 text-white px-2 lg:px-8 py-1 rounded-sm hover:opacity-95 transition-all">Login</button>
                    <button className="bg-white text-rose-600 border border-rose-600 px-2 lg:px-4 py-1 rounded-sm hover:bg-rose-600 hover:text-white transition-all">Sign Up</button>
                </div>
            </div>
        </nav>
    );
}
