import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-5xl mx-auto p-6 text-center">

        {/* Hero Image */}
        <div className="overflow-hidden rounded-2xl shadow-lg mb-10">
          <img
            src="../public\blog.jpg"   // put hero.jpg inside frontend/public/
            alt="Hero"
            className="w-full h-[350px] object-cover"
          />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
          Welcome to Your MERN Blog App
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Create notes like professional blog posts with title, content and tags.  
          Fast, clean, modern — built using MERN + Tailwind.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700" to="/register">
            Get Started
          </Link>

          <Link className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-black" to="/login">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

