import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1c]">
      <Navbar />

      {/* HERO SECTION — same as Blogs */}
      <div className="relative w-full h-[380px] md:h-[360px] mt-0">
        <img
          src="/images/bg.jpg"
          alt="About Banner"
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
            style={{ color: "var(--accent)" }}
          >
            About This Project
          </h1>

          <p className="text-white/80 mt-3 text-lg max-w-2xl">
            A complete blogging platform built with React, Node.js, MongoDB, and Cloudinary.
          </p>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div
        className="
          max-w-7xl mx-auto px-4 -mt-24 pb-10 flex gap-6 relative z-10
          opacity-0 animate-[slideDownFade_0.6s_ease-out_forwards]
        "
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 text-white leading-relaxed space-y-6">

          {/* INTRO SECTION */}
          <div
            className="
              bg-[#0d1525]/70 p-8 rounded-xl shadow 
              border border-white/5 backdrop-blur
            "
          >
            <h2 className="text-3xl font-bold mb-4 text-[var(--accent)]">
              Overview
            </h2>

            <p className="text-white/70 text-lg">
              This project is a fully functional blogging platform consisting of  
              <span className="text-[var(--accent)] font-semibold"> three main parts</span>:  
              the public client, the admin dashboard, and the backend server.
            </p>
          </div>

          {/* CLIENT DESCRIPTION */}
          <div
            className="
              bg-[#0d1525]/70 p-8 rounded-xl shadow 
              border border-white/5 backdrop-blur
            "
          >
            <h3 className="text-2xl font-semibold mb-3 text-[var(--accent)]">
              🖥️ Client (User Interface)
            </h3>

            <p className="text-white/70">
              The <strong>client</strong> is built with React and provides a clean, fast,  
              and responsive UI for visitors to browse blog posts.  
              It includes:
            </p>

            <ul className="list-disc ml-6 mt-3 text-white/60 space-y-2">
              <li>Homepage with post grid and featured hero section</li>
              <li>Sidebar with categories and tags</li>
              <li>Filtering system (category, tag, search)</li>
              <li>Single post page with full content</li>
              <li>Smooth animations and dynamic accent color</li>
            </ul>
          </div>

          {/* ADMIN DESCRIPTION */}
          <div
            className="
              bg-[#0d1525]/70 p-8 rounded-xl shadow 
              border border-white/5 backdrop-blur
            "
          >
            <h3 className="text-2xl font-semibold mb-3 text-[var(--accent)]">
              🔐 Client-Admin (Dashboard)
            </h3>

            <p className="text-white/70">
              The <strong>admin panel</strong> is a separate React application used to manage all content.  
              It includes:
            </p>

            <ul className="list-disc ml-6 mt-3 text-white/60 space-y-2">
              <li>Admin login protected with a secret key</li>
              <li>Create / edit / delete blog posts</li>
              <li>Rich-text editor (TipTap)</li>
              <li>Cloudinary integration for image uploads</li>
              <li>Category and tag management</li>
              <li>Gallery picker for cover images</li>
            </ul>
          </div>

          {/* SERVER DESCRIPTION */}
          <div
            className="
              bg-[#0d1525]/70 p-8 rounded-xl shadow 
              border border-white/5 backdrop-blur
            "
          >
            <h3 className="text-2xl font-semibold mb-3 text-[var(--accent)]">
              🚀 Server (Backend API)
            </h3>

            <p className="text-white/70">
              The backend is powered by <strong>Node.js (Express)</strong> and stores all content in 
              <strong> MongoDB</strong>.  
              It handles:
            </p>

            <ul className="list-disc ml-6 mt-3 text-white/60 space-y-2">
              <li>CRUD operations for posts</li>
              <li>Filtering by category, tag, and search</li>
              <li>Cloudinary image upload handling</li>
              <li>Post metadata (word count, excerpt, reading time)</li>
              <li>Slug generation & sorting</li>
            </ul>
          </div>

          {/* TECH SECTION */}
          <div
            className="
              bg-[#0d1525]/70 p-8 rounded-xl shadow 
              border border-white/5 backdrop-blur
            "
          >
            <h3 className="text-2xl font-semibold mb-3 text-[var(--accent)]">
              🛠️ Technology Stack
            </h3>

            <ul className="list-disc ml-6 text-white/60 space-y-2">
              <li>React (client + admin panel)</li>
              <li>React Router for navigation</li>
              <li>Node.js + Express for backend</li>
              <li>MongoDB + Mongoose for database</li>
              <li>Cloudinary for image hosting</li>
              <li>TipTap editor for content creation</li>
            </ul>
          </div>

          {/* FINAL SECTION */}
          <div
            className="
              bg-[#0d1525]/70 p-8 rounded-xl shadow 
              border border-white/5 backdrop-blur
            "
          >
            <h3 className="text-2xl font-semibold mb-3 text-[var(--accent)]">
              🎯 Purpose of This Project
            </h3>

            <p className="text-white/70">
              This blog platform was designed to be fast, customizable, and fully functional.  
              It serves as both a personal publishing tool and a demonstration of:
            </p>

            <ul className="list-disc ml-6 mt-3 text-white/60 space-y-2">
              <li>Full-stack development skills</li>
              <li>Modern React UI design</li>
              <li>Backend API and database architecture</li>
              <li>Clean animations and UX workflow</li>
              <li>Reusable component structure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
