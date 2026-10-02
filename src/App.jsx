import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CreateProductPage from "./pages/CreateProductPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { ShoppingBag } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-neutral-200 selection:text-neutral-900">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<CreateProductPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <footer className="border-t border-neutral-800 bg-neutral-950/80 backdrop-blur-md py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-neutral-200">MSTCONNECT Store</span>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()} TJ Tolentino. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-neutral-700">•</span>
            <Link to="/products" className="hover:text-white transition-colors">
              Catalog
            </Link>
            <span className="text-neutral-700">•</span>
            <Link to="/products/new" className="hover:text-white transition-colors">
              Add Product
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
