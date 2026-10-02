import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/products");
    }
  }

  function handleCategoryClick(category) {
    if (category === "All") {
      navigate("/products");
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`);
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
      <div className="space-y-6">
        {/* Welcome Headline */}
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag className="w-8 h-8 text-amber-400" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Welcome to MSTCONNECT Store
          </h1>
        </div>

        {/* Central Search Box */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-8">
          <div className="relative flex items-center shadow-lg rounded-2xl bg-neutral-900/90 border border-neutral-800 focus-within:border-neutral-500 focus-within:ring-1 focus-within:ring-neutral-500 transition-all p-1.5">
            <div className="pl-3.5 pr-2 text-neutral-400 pointer-events-none">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="search"
              id="home-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by name or category..."
              className="w-full py-2.5 px-2 bg-transparent text-neutral-100 placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
            />

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-200 active:scale-95 transition-all shrink-0 shadow-sm"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category shortcuts */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-neutral-400 mr-1">Popular categories:</span>
          {["All", "Electronics", "Accessories", "Books"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className="px-3 py-1 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Direct link to catalog */}
        <div className="pt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors group"
          >
            <span>Or browse the full catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
