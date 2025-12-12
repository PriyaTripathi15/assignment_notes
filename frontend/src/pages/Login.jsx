import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

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
    <div
      className="page-bg"
      style={{ backgroundImage: "url('http://thumbs.dreamstime.com/z/note-book-01-801545.jpg')" }}
    >
      <div className="form-container fade-in-up">
        <h2 className="text-center text-3xl font-semibold mb-6">Welcome Back</h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          {err && <div className="text-red">{err}</div>}
          <button type="submit" className="btn">Login</button>
        </form>

        <p className="text-center mt-4 text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="link">Register</Link>
        </p>
      </div>
    </div>
  );
}
