import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/productsApi.js";
import LoadingMessage from "../components/LoadingMessage.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import {
  ArrowLeft,
  Tag,
  Boxes,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Info,
} from "lucide-react";

function getCategoryColor(category) {
  switch (category?.toLowerCase()) {
    case "electronics":
      return "bg-sky-500/10 text-sky-400 border-sky-500/25";
    case "accessories":
      return "bg-amber-500/10 text-amber-400 border-amber-500/25";
    case "books":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
    default:
      return "bg-neutral-800 text-neutral-300 border-neutral-700";
  }
}

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductById(id);
        // Extracts data from API response schema: { success: true, result: { data: { ... } } }
        setProduct(data.result?.data || data.result || data.data || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function copyProductId() {
    const rawId = product?._id || product?.id || id;
    if (rawId) {
      navigator.clipboard.writeText(String(rawId));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <LoadingMessage message="Loading product details..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to products
        </Link>
        <ErrorMessage message={error} />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-neutral-400 mb-4">Product not found.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Return to products
        </Link>
      </main>
    );
  }

  const stock = Number(product.stock ?? 0);
  const price = Number(product.price ?? 0);
  const rawId = product._id || product.id || id;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to catalog</span>
        </Link>
      </div>

      {/* Main Product Card */}
      <article className="overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 shadow-md">
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 border-b border-neutral-800 bg-neutral-950/40">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                product.category
              )}`}
            >
              <Tag className="w-3.5 h-3.5" />
              {product.category || "Uncategorized"}
            </span>

            {/* Product ID Pill with Copy button */}
            <button
              type="button"
              onClick={copyProductId}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-400 hover:text-neutral-200 bg-neutral-900 border border-neutral-800 transition-colors"
              title="Click to copy product ID"
            >
              <span>ID: {String(rawId).slice(-8)}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-white">
              ₱{price.toLocaleString()}
            </span>

            {stock > 5 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                In Stock ({stock} units)
              </span>
            ) : stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5" />
                Low Stock ({stock} units remaining)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <XCircle className="w-3.5 h-3.5" />
                Currently Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Product Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Description Section */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" /> Product Overview
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed bg-neutral-950/60 p-5 rounded-2xl border border-neutral-800">
              {product.description || "No additional description provided for this item."}
            </p>
          </div>

          {/* Specifications Grid */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-emerald-400" /> Specifications &amp; Stock
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <span className="text-xs text-neutral-500 block mb-1">Category</span>
                <span className="text-sm font-semibold text-white">
                  {product.category || "General"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <span className="text-xs text-neutral-500 block mb-1">Unit Price</span>
                <span className="text-sm font-semibold text-white">
                  ₱{price.toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <span className="text-xs text-neutral-500 block mb-1">Available Quantity</span>
                <span className="text-sm font-semibold text-white">
                  {stock} units
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default ProductDetailsPage;
