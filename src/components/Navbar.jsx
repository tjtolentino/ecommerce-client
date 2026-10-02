import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Home, Grid, Menu, X } from "lucide-react";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-white bg-neutral-900 border border-neutral-700/80 shadow-sm"
        : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
      isActive
        ? "text-white bg-neutral-900 border border-neutral-700"
        : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/85 border-b border-neutral-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand with Amber Accent Splash */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-neutral-400 rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-sm group-hover:border-neutral-700 transition-colors">
              <ShoppingBag className="w-5 h-5 text-amber-400 transition-transform group-hover:scale-110" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                MSTCONNECT
              </span>
              <span className="ml-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800">
                Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <NavLink to="/" end className={navLinkClass}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              <Grid className="w-4 h-4" />
              <span>Catalog</span>
            </NavLink>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            <Home className="w-5 h-5 text-neutral-400" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            <Grid className="w-5 h-5 text-neutral-400" />
            <span>Products Catalog</span>
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Navbar;
