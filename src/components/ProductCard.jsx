import { Link } from "react-router-dom";
import { ArrowRight, Tag, AlertTriangle, XCircle } from "lucide-react";

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

function ProductCard({ product }) {
  // Support both direct product object and nested { result: { data: product } } or { result: product }
  const item = product?.result?.data || product?.result || product;
  const productId = item?._id || item?.id;
  const stock = Number(item?.stock ?? 0);
  const price = Number(item?.price ?? 0);

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-5 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Top Header: Category badge & Stock status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
              item?.category
            )}`}
          >
            <Tag className="w-3 h-3" />
            {item?.category || "General"}
          </span>

          {stock > 5 ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              In stock ({stock})
            </span>
          ) : stock > 0 ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-3 h-3" />
              Low stock ({stock})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <XCircle className="w-3 h-3" />
              Out of stock
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition-colors line-clamp-1 mb-1">
          {item?.name}
        </h3>

        {/* Description preview if exists */}
        {item?.description && (
          <p className="text-sm text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      {/* Footer: Price & Action */}
      <div className="pt-4 mt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-neutral-400 block font-medium">Price</span>
          <span className="text-xl font-bold text-white tracking-tight">
            ₱{price.toLocaleString()}
          </span>
        </div>

        <Link
          to={`/products/${productId}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-neutral-800/80 hover:bg-white hover:text-neutral-950 border border-neutral-700/80 transition-all duration-200 group/btn"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
