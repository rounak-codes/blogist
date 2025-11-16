// src/components/Navbar.jsx
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching:", search);
    // Add search functionality later
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 bg:white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      {/* Left */}
      <div>
        <a href="/" className="font-bold text-lg dark:hover:text-gray-200 dark:text-white">Home</a>
      </div>

      {/* Center */}
      <ul className="flex space-x-6">
        <li><a href="/blogs" className="dark:hover:text-gray-200 dark:text-white">Blogs</a></li>
        <li><a href="/about" className="dark:hover:text-gray-200 dark:text-white">About</a></li>
        <li><a href="/tierlist" className="dark:hover:text-gray-200 dark:text-white">Tier List</a></li>
        <li><a href="/contact" className="dark:hover:text-gray-200 dark:text-white">Contact</a></li>
      </ul>

      {/* Right */}
      <div>
        <form onSubmit={handleSearch} className="flex border rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-1 outline-none text-white"
          />
          <button type="submit" className="px-2 bg-blue-500 text-white">Go</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
