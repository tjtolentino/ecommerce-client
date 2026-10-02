import { PackageOpen } from "lucide-react";

function EmptyState({ message = "No products found.", onReset = null }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl bg-neutral-900/40 border border-dashed border-neutral-800 my-8">
      <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 mb-4 shadow-inner">
        <PackageOpen className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">No items found</h3>
      <p className="text-sm text-neutral-400 max-w-sm mb-5">{message}</p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 text-xs font-medium text-neutral-200 hover:text-neutral-950 bg-neutral-800 hover:bg-white rounded-xl border border-neutral-700 transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}

export default EmptyState;
