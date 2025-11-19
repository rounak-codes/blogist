// client/src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 text-white shadow sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-gray-500 hover:text-gray-400">
            Fuwari
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
          <Link to="/patch-notes" className="hover:text-gray-400 transition-colors">Patch Notes</Link>
          <Link to="/story-thoughts" className="hover:text-gray-400 transition-colors">Story Thoughts</Link>
          <Link to="/tier-list" className="hover:text-gray-400 transition-colors">Tier List</Link>
        </nav>

        {/* Right-side search */}
        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 rounded bg-white dark:bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded hover:bg-gray-800 transition-colors"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 px-4 py-2 space-y-2 shadow-md">
          <Link to="/" className="block text-white hover:text-gray-400 transition-colors">Home</Link>
          <Link to="/patch-notes" className="block text-white hover:text-gray-400 transition-colors">Patch Notes</Link>
          <Link to="/story-thoughts" className="block text-white hover:text-gray-400 transition-colors">Story Thoughts</Link>
          <Link to="/tier-list" className="block text-white hover:text-gray-400 transition-colors">Tier List</Link>

          {/* Mobile search */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
