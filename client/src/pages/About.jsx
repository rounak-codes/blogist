import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1c] overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <div className="relative w-full h-[300px] sm:h-[360px] md:h-[380px] mt-0">
        <img
          src="/images/bg.jpg"
          alt="About Banner"
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg"
            style={{ color: "var(--accent)" }}
          >
            About This Project
          </h1>

          <p className="text-white/80 mt-3 text-base sm:text-lg max-w-2xl">
            A full blogging platform built with modern web tools.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          max-w-7xl mx-auto px-3 sm:px-4 -mt-20 md:-mt-24 
          pb-10 flex flex-col md:flex-row gap-6 
          relative z-10
          opacity-0 animate-[slideDownFade_0.6s_ease-out_forwards]
        "
      >
        <Sidebar />

        <div className="flex-1 text-white leading-relaxed space-y-6">

          <section className="bg-[#0d1525]/70 p-6 sm:p-8 rounded-xl shadow border border-white/5">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--accent)]">Overview</h2>
            <p className="text-white/70 text-base sm:text-lg">
              This project includes a public client, admin dashboard, and backend API.
            </p>
          </section>

          <section className="bg-[#0d1525]/70 p-6 sm:p-8 rounded-xl shadow border border-white/5">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[var(--accent)]">🖥️ Client</h3>
            <ul className="list-disc ml-6 text-white/60 space-y-2">
              <li>Homepage + post grid</li>
              <li>Sidebar with categories & tags</li>
              <li>Filtering & search</li>
            </ul>
          </section>

          <section className="bg-[#0d1525]/70 p-6 sm:p-8 rounded-xl shadow border border-white/5">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[var(--accent)]">🔐 Admin Panel</h3>
            <ul className="list-disc ml-6 text-white/60 space-y-2">
              <li>Rich text editor (TipTap)</li>
              <li>Cloudinary uploads</li>
              <li>Full CRUD management</li>
            </ul>
          </section>

          <section className="bg-[#0d1525]/70 p-6 sm:p-8 rounded-xl shadow border border-white/5">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[var(--accent)]">🚀 Backend API</h3>
            <ul className="list-disc ml-6 text-white/60 space-y-2">
              <li>Express + MongoDB</li>
              <li>Filtering, pagination & metadata</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
