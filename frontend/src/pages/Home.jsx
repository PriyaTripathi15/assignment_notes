import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-5xl font-extrabold  font-serif mb-4 text-gray-600">
          Welcome to Your Notes App
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, update, and delete notes easily. Organize your thoughts with a clean and powerful UI.
        </p>

        {/* Illustration / Banner */}
        <div className="overflow-hidden rounded-2xl shadow-lg mb-10">
          <img
            src="https://cdn.thewirecutter.com/wp-content/media/2020/11/notebooks-2048px-1981-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024&dpr=2" // place notes-banner.jpg inside public/
            alt="Notes Banner"
            className="w-full h-[300px] object-cover"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700" to="/add-note">
            Add New Note
          </Link>

          <Link className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-black" to="/notes">
            View Notes
          </Link>
        </div>

      </div>
    </div>
  );
}
