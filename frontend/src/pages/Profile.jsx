import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user profile
  useEffect(() => {
    API.get('/api/auth/profile')
      .then(r => {
        setUser(r.data);
        setForm({ name: r.data.name, email: r.data.email, password: '' });
      })
      .catch(() => {});
  }, []);

  const handleUpdate = async e => {
    e.preventDefault();
    setErr('');
    setSuccess('');

    if (!form.name || !form.email) {
      setErr('Name and Email are required');
      return;
    }

    try {
      const payload = { name: form.name, email: form.email };
      if (form.password) payload.password = form.password;

      const res = await API.put('/api/auth/profile', payload);
      setUser(res.data);
      setForm({ name: res.data.name, email: res.data.email, password: '' });
      setSuccess('Profile updated successfully!');
    } catch (e) {
      setErr(e.response?.data?.msg || 'Update failed');
    }
  };

  const resetForm = () => {
    if (!user) return;
    setForm({ name: user.name, email: user.email, password: '' });
    setErr('');
    setSuccess('');
  };

  return (
    <div
      className="page-bg"
      style={{ backgroundImage: "url('http://thumbs.dreamstime.com/z/note-book-01-801545.jpg')" }}
    >
      <div className="form-container fade-in-up">
        <h2 className="text-center text-3xl font-semibold mb-6">Your Profile</h2>

        {user ? (
          <div className="space-y-4 text-gray-200">
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <p className="text-sm text-gray-200">
              Joined {new Date(user.createdAt).toLocaleString()}
            </p>

            <form onSubmit={handleUpdate} className="space-y-3 pt-2 border-t border-gray-700">
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="input"
              />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="input"
              />
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="New Password (optional)"
                className="input"
              />
              {err && <p className="text-red text-center">{err}</p>}
              {success && <p className="text-green-400 text-center">{success}</p>}

              <div className="flex gap-2">
                <button type="submit" className="btn flex-1">
                  Save Changes
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                  Reset
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-center text-gray-300">Loading...</p>
        )}
      </div>
    </div>
  );
}
