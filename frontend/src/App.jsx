import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
    <nav className="bg-blue-200 shadow p-4 flex justify-between items-center">
  
  {/* Logo + Name */}
  <Link to="/" className="flex items-center gap-2 group">
    
    {/* Book Logo */}
    <img src='../public/logo.png' alt='Logo' className="w-22 h-22 object-contain group-hover:rotate-12 transition-transform" />

    {/* Text */}
     </Link>

  <div className="space-x-6 text-white font-semibold">

    {/* IF LOGGED IN */}
    {token ? (
      <>
        <Link className=" text-black hover:text-gray-300 transition" to="/dashboard">Dashboard</Link>
        <Link className="hover:text-gray-300 transition" to="/profile">Profile</Link>

        <button 
          onClick={handleLogout} 
          className="text-red-300 hover:text-red-400 font-semibold"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        {/* IF NOT LOGGED IN */}
        <Link className="hover:text-gray-300 text-2xl transition" to="/login">Login</Link>
        <Link className="hover:text-gray-300   text-2xl transition" to="/register">Register</Link>
      </>
    )}

  </div>
</nav>


      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        </Routes>
      </div>
      
    </div>
  )
}

