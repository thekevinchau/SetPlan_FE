import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6 rounded-lg bg-gradient-to-b from-gray-900 to-slate-900 border border-gray-700/20 p-8">
        <div className="space-y-2">
          <p className="text-8xl animate-bounce">🎪</p>
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-yellow-500 via-red-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              404
            </span>
          </h1>
          <p className="text-gray-400">Looks like this festival got cancelled...</p>
          <p className="text-sm text-gray-500">Time to find another party! 🎉</p>
        </div>
        
        <Link to="/" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-gray-800 to-slate-800 hover:from-gray-700 hover:to-slate-700 border border-gray-700/20 transition-colors text-white font-medium group">
          <span>Back to Festivals</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
