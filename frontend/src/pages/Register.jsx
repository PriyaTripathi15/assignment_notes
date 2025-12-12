import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setErr('');
    if (!form.name || !form.email || !form.password) {
      setErr('All fields required');
      return;
    }
    try {
      const res = await API.post('/api/auth/register', form);
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
        <h2 className="text-center text-3xl font-semibold mb-6">Create Account</h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
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
          <button type="submit" className="btn">Register</button>
        </form>

        <p className="text-center mt-4 text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="link">Login</Link>
        </p>
      </div>
    </div>
  );
}
