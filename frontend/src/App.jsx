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
      
      <nav className="bg-white shadow p-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">MERN Tailwind</Link>

        <div className="space-x-4">

          {/* IF LOGGED IN → hide login/register and show dashboard/logout */}
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="text-red-600 font-semibold">
                Logout
              </button>
            </>
          ) : (
            <>
              {/* IF NOT LOGGED IN → show login/register */}
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
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

