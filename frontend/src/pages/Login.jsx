import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setErr('');
    if (!form.email || !form.password) {
      setErr('All fields required');
      return;
    }
    try {
      const res = await API.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    } catch (e) {
      setErr(e.response?.data?.msg || 'Failed');
    }
  };

  return (
    <div  className="min-h-screen flex items-start justify-center pt-30 bg-cover bg-center"
      style={{ backgroundImage: "url('https://thumbs.dreamstime.com/b/music-book-illustration-open-gold-gray-notes-radiating-pages-sparkles-stars-golden-31009939.jpg')" }}
    >
     
      <div className="max-w-md w-full bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Welcome Back</h2>
        
        <form onSubmit={submit} className="space-y-4">
          {/* Email input */}
          <input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="input w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />

          {/* Password input */}
          <input
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            type="password"
            placeholder="Password"
            className="input w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />

          {err && <div className="text-red-600 text-center">{err}</div>}

          <button
            type="submit"
            className="btn w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
