import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="max-w-md text-center">
                <img src="/Logo.png" alt="Creozone" className="h-12 mx-auto mb-6" />

                <h1 className="text-6xl font-bold text-zinc-800">404</h1>
                <p className="mt-4 text-lg text-zinc-600">Oops! The page you're looking for doesn’t exist.</p>
                <p className="text-sm text-zinc-500 mt-1">It might have been moved, renamed, or deleted.</p>

                <Link to="/" className="inline-block mt-6 px-6 py-2 text-sm font-medium text-white bg-rose-600 rounded-full hover:bg-rose-700 transition">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
