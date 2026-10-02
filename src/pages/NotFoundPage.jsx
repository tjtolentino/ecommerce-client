import { Link } from "react-router-dom";
import { Home, ArrowLeft, HelpCircle } from "lucide-react";

function NotFoundPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-10 sm:p-14 shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700 text-amber-400 flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>

        <span className="text-6xl sm:text-7xl font-bold text-neutral-600 block mb-4">
          404
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Page Not Found
        </h1>

        <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-200 shadow-sm transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Catalog</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
