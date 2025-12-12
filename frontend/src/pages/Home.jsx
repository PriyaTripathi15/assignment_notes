import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-10">
      
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-10 border border-gray-200">

        {/* LEFT TEXT CONTENT */}
<div className="flex flex-col justify-center space-y-6">

  {/* Heading with fade-in and slide-up animation */}
  <h1 className="text-5xl font-bold text-gray-700 leading-tight font-serif mb-4
                 transform transition-all duration-700 ease-out
                 hover:translate-y-[-5px] hover:text-khaki-600">
    Organize Your Notes <br /> Easily & Smartly
  </h1>

  {/* Paragraph with fade-in animation */}
 <p className="text-gray-600 mb-6 text-lg fade-in">
  Capture your ideas, manage your thoughts and keep everything 
  structured in one clean and simple notes dashboard.
</p>


  {/* Button with hover scale and shadow */}
  <Link 
    to="/dashboard"
    className="px-6 py-3 bg-teal-200 text-cyan-950 text-lg rounded-lg w-fit 
               hover:bg-teal-400 hover:scale-105 hover:shadow-lg 
               transition transform duration-300 ease-in-out"
  >
    Create Note
  </Link>
</div>

        {/* RIGHT IMAGE BOX */}
        <div className="flex items-center justify-center">
          <div className="rounded-2xl overflow-hidden shadow-md bg-gray-100 p-3">
           <img 
  src="https://cdn.thewirecutter.com/wp-content/media/2020/11/notebooks-2048px-1981-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024&dpr=2"
  alt="Notes"
  className="rounded-xl w-[750px] h-[500px] object-cover"
/>

          </div>
        </div>

      </div>
    </div>
  );
}
