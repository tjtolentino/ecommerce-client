import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../api/productsApi.js";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ProductList from "../components/ProductList.jsx";
import LoadingMessage from "../components/LoadingMessage.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { Plus, Package, SlidersHorizontal, RefreshCw } from "lucide-react";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync state if URL query params change (e.g. from homepage search)
  useEffect(() => {
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    if (q !== null) setSearchTerm(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  async function loadProducts() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getProducts();

      // Supports:
      // 1. [ ...products ]
      // 2. { result: { data: [ ...products ] } }
      // 3. { data: [ ...products ] }
      const productArray = Array.isArray(data)
        ? data
        : data.result?.data || data.result || data.data || [];
      setProducts(productArray);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleSearchChange(term) {
    setSearchTerm(term);
    if (!term && selectedCategory === "All") {
      setSearchParams({});
    } else {
      const nextParams = {};
      if (term) nextParams.q = term;
      if (selectedCategory !== "All") nextParams.category = selectedCategory;
      setSearchParams(nextParams);
    }
  }

  function handleCategoryChange(cat) {
    setSelectedCategory(cat);
    const nextParams = {};
    if (searchTerm) nextParams.q = searchTerm;
    if (cat !== "All") nextParams.category = cat;
    setSearchParams(nextParams);
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Electronics", "Accessories", "Books"];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Product Catalog
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Browse, search, and manage products in the store
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadProducts}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            title="Refresh product list"
            aria-label="Refresh product list"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-amber-400" : ""}`} />
          </button>

          <Link
            to="/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-200 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <section className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Quick Category Filter Pills */}
        <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-neutral-400 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-white text-neutral-950 font-semibold shadow-sm"
                  : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Result Counter & Active Filter Indicators */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-400 mb-6 px-1">
        <p className="flex items-center gap-1.5 font-medium">
          <Package className="w-4 h-4 text-amber-400" />
          <span>
            Showing <strong className="text-white">{filteredProducts.length}</strong> of{" "}
            <strong className="text-white">{products.length}</strong> product(s)
          </span>
        </p>

        {(searchTerm || selectedCategory !== "All") && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSearchParams({});
            }}
            className="text-xs font-medium text-neutral-300 hover:text-white underline underline-offset-4"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Content Rendering */}
      {isLoading ? (
        <LoadingMessage message="Fetching products catalog..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          message="No products match your current search terms or selected category."
          onReset={() => {
            setSearchTerm("");
            setSelectedCategory("All");
            setSearchParams({});
          }}
        />
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </main>
  );
}

export default ProductsPage;
