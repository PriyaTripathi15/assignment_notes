import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState('');
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [err, setErr] = useState('');
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  // Fetch notes
  const fetchNotes = async (query = '') => {
    try {
      const res = await API.get('/api/notes', { params: { q: query } });
      setNotes(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create / Update note
  const createOrUpdate = async e => {
    e.preventDefault();
    setErr('');

    if (!form.title || !form.content) {
      setErr('Title and content are required');
      return;
    }

    const payload = {
      title: form.title,
      content: form.content,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()) : []
    };

    try {
      if (editingId) {
        await API.put(`/api/notes/${editingId}`, payload);
        setEditingId(null);
      } else {
        await API.post('/api/notes', payload);
      }
      setForm({ title: '', content: '', tags: '' });
      fetchNotes(q);
    } catch (e) {
      setErr(e.response?.data?.msg || 'Failed');
    }
  };

  // Delete note
  const del = async id => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await API.delete(`/api/notes/${id}`);
      fetchNotes(q);
    } catch (e) {
      console.error(e);
    }
  };

  // Edit note
  const edit = note => {
    setEditingId(note._id);
    setForm({ title: note.title, content: note.content, tags: note.tags.join(', ') });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-200 shadow p-4 flex justify-between items-center font-mono">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="../public/logo.png" 
            alt="Logo" 
            className="w-22 h-22 object-contain group-hover:rotate-12 transition-transform" 
          />
        </Link>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link 
                to="/dashboard"
                className="px-4 py-1 bg-white border border-black rounded-xl hover:bg-blue-100 transition"
              >
                Dashboard
              </Link>
              <Link 
                to="/profile"
                className="px-4 py-1 bg-white border border-black rounded-xl hover:bg-blue-100 transition"
              >
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="px-4 py-1 bg-red-500 text-white border border-black rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="px-4 py-1 bg-white border border-black rounded-xl hover:bg-blue-100 transition"
              >
                Log In
              </Link>
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

      {/* Dashboard content */}
      <div className="p-4 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Notes</h1>
          {/* Add Note button with Plus icon */}
          <button 
            onClick={() => setForm({ title: '', content: '', tags: '' })} 
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition flex items-center gap-2"
          >
            <Plus size={18} /> Add Note
          </button>
        </div>

        {/* Add/Edit form */}
        <form onSubmit={createOrUpdate} className="bg-white p-4 rounded shadow mb-6">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="input w-full mb-2"
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="input w-full mb-2"
            rows={4}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={e => setForm({ ...form, tags: e.target.value })}
            className="input w-full mb-2"
          />
          {err && <div className="text-red-600 mb-2">{err}</div>}
          <button className="btn">{editingId ? 'Update Note' : 'Add Note'}</button>
        </form>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search notes..."
            value={q}
            onChange={e => { setQ(e.target.value); fetchNotes(e.target.value); }}
            className="input w-full"
          />
        </div>

        {/* Notes list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map(note => (
            <div key={note._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => edit(note)} className="text-blue-600 flex items-center gap-1">
                    <Edit2 size={16} /> Edit
                  </button>
                  <button onClick={() => del(note._id)} className="text-red-600 flex items-center gap-1">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{note.content}</p>
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((t, i) => (
                    <span key={i} className="bg-gray-200 px-2 py-1 rounded text-xs">{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
