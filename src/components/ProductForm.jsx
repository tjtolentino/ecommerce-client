import { useState } from "react";
import { Tag, FileText, Layers, Boxes, AlertCircle, Save, Loader2 } from "lucide-react";

function validateProduct(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Product name is required.";
  }

  if (!formData.price || Number(formData.price) <= 0) {
    errors.price = "Price must be greater than zero.";
  }

  if (!formData.category) {
    errors.category = "Category is required.";
  }

  if (
    formData.stock === "" ||
    Number.isNaN(Number(formData.stock)) ||
    Number(formData.stock) < 0
  ) {
    errors.stock = "Stock must be zero or greater.";
  }

  return errors;
}

function ProductForm({ onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    // Clear error for this field if user starts correcting it
    if (errors[name]) {
      setErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateProduct(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  }

  return (
    <form
      className="space-y-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Product Name */}
      <div>
        <label
          htmlFor="product-name"
          className="block text-sm font-semibold text-neutral-200 mb-2"
        >
          Product Name <span className="text-rose-400">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
            <Tag className="w-4 h-4" />
          </div>
          <input
            id="product-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Mechanical Keyboard"
            className={`w-full pl-10 pr-4 py-2.5 bg-neutral-950 text-neutral-100 placeholder-neutral-500 text-sm rounded-xl border transition-all duration-200 focus:outline-none ${
              errors.name
                ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500"
                : "border-neutral-800 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
            }`}
          />
        </div>
        {errors.name && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="product-description"
          className="block text-sm font-semibold text-neutral-200 mb-2"
        >
          Description <span className="text-xs font-normal text-neutral-500">(Optional)</span>
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3.5 pointer-events-none text-neutral-500">
            <FileText className="w-4 h-4" />
          </div>
          <textarea
            id="product-description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Key features, specifications, or warranty details..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 text-neutral-100 placeholder-neutral-500 text-sm rounded-xl border border-neutral-800 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition-all duration-200 resize-none"
          />
        </div>
      </div>

      {/* Price & Stock in a 2-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Price */}
        <div>
          <label
            htmlFor="product-price"
            className="block text-sm font-semibold text-neutral-200 mb-2"
          >
            Price (PHP) <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <span className="text-sm font-bold">₱</span>
            </div>
            <input
              id="product-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 2500"
              className={`w-full pl-9 pr-4 py-2.5 bg-neutral-950 text-neutral-100 placeholder-neutral-500 text-sm rounded-xl border transition-all duration-200 focus:outline-none ${
                errors.price
                  ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500"
                  : "border-neutral-800 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
              }`}
            />
          </div>
          {errors.price && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.price}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="product-stock"
            className="block text-sm font-semibold text-neutral-200 mb-2"
          >
            Inventory Stock <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Boxes className="w-4 h-4" />
            </div>
            <input
              id="product-stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="e.g., 10"
              className={`w-full pl-10 pr-4 py-2.5 bg-neutral-950 text-neutral-100 placeholder-neutral-500 text-sm rounded-xl border transition-all duration-200 focus:outline-none ${
                errors.stock
                  ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500"
                  : "border-neutral-800 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
              }`}
            />
          </div>
          {errors.stock && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.stock}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="product-category"
          className="block text-sm font-semibold text-neutral-200 mb-2"
        >
          Category <span className="text-rose-400">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
            <Layers className="w-4 h-4" />
          </div>
          <select
            id="product-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full pl-10 pr-8 py-2.5 bg-neutral-950 text-neutral-100 text-sm rounded-xl border appearance-none cursor-pointer transition-all duration-200 focus:outline-none ${
              errors.category
                ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500"
                : "border-neutral-800 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
            }`}
          >
            <option value="" className="bg-neutral-950 text-neutral-400">
              Select category
            </option>
            <option value="Electronics" className="bg-neutral-950 text-neutral-100">
              Electronics
            </option>
            <option value="Accessories" className="bg-neutral-950 text-neutral-100">
              Accessories
            </option>
            <option value="Books" className="bg-neutral-950 text-neutral-100">
              Books
            </option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.category && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.category}
          </p>
        )}
      </div>

      {/* Form Action Buttons */}
      <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-200 active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-neutral-700" />
              <span>Saving Product...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Product</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
