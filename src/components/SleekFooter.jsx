import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 text-sm border-t border-gray-200 py-6 mb-1">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center space-x-4">
        
        {/* Logo + Copyright */}
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <img src="/Logo Icon.png" alt="Creozone" className="h-5" />
          <span className="text-sm text-gray-600">
            © {new Date().getFullYear()} Creozone, Inc.
          </span>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center space-x-4 text-gray-600">
          <Link to="/" className="hover:text-black transition">Terms</Link>
          <Link to="/" className="hover:text-black transition">Privacy</Link>
          <Link to="/" className="hover:text-black transition">Design Safety</Link>
          <Link to="/" className="hover:text-black transition">Status</Link>
          <Link to="/" className="hover:text-black transition">Creator Guide</Link>
          <Link to="/" className="hover:text-black transition">Contact</Link>
          <Link to="/" className="hover:text-black transition">Cookie Preferences</Link>
          <Link to="/" className="hover:text-black transition">Do not share my designs</Link>
        </div>
      </div>
    </footer>
  );
}
