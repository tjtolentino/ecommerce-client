import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../api/productsApi.js";
import ProductForm from "../components/ProductForm.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { ArrowLeft } from "lucide-react";

function CreateProductPage() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function handleCreateProduct(productData) {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await createProduct(productData);
      navigate("/products");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Add Product
        </h1>
        <p className="text-sm text-neutral-400 mt-2">
          Provide product details, pricing, stock quantity, and category classification.
        </p>
      </div>

      {submitError && <ErrorMessage message={submitError} />}

      <ProductForm
        onSubmit={handleCreateProduct}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}

export default CreateProductPage;
