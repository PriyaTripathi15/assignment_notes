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
<nav className="bg-blue-200 shadow p-4 flex justify-between items-center font-mono">
  
  {/* Logo */}
  <Link to="/" className="flex items-center gap-2 group">
    <img 
      src="../public/logo.png" 
      alt="Logo" 
      className="w-22 h-22 object-contain group-hover:rotate-12 transition-transform" 
    />
  </Link>

  {/* Right Navigation */}
  <div className="flex items-center gap-4">

    {token ? (
      <>
        {/* Dashboard */}
        <Link 
          to="/dashboard"
          className="px-4 py-1 bg-white border border-black rounded-xl hover:bg-blue-100 transition"
        >
          Dashboard
        </Link>

        {/* Profile */}
        <Link 
          to="/profile"
          className="px-4 py-1 bg-white border border-black rounded-xl hover:bg-blue-100 transition"
        >
          Profile
        </Link>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="px-4 py-1 bg-red-500 text-white border border-black rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        {/* Sign In */}
        <Link 
          to="/login"
          className="px-4 py-1 bg-white border border-black rounded-xl hover:bg-blue-100 transition"
        >
          Log In
        </Link>

        {/* Sign Up */}
        <Link 
          to="/register"
          className="px-4 py-1 bg-white border border-black rounded-xl hover:bg-blue-100 transition"
        >
          Register
        </Link>
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

