import React, { useEffect, useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import API from '../services/api';

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
    <div
      className="min-h-screen p-4"
      style={{
        backgroundImage: "url('https://thumbs.dreamstime.com/b/music-book-illustration-open-gold-gray-notes-radiating-pages-sparkles-stars-golden-31009939.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-6xl mx-auto bg-black bg-opacity-80 p-6 rounded-2xl shadow-lg text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Notes</h1>
          <button
            onClick={() => setForm({ title: '', content: '', tags: '' })}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded flex items-center gap-2 transition"
          >
            <Plus size={18} /> Add Note
          </button>
        </div>

        {/* Add/Edit form */}
        <form onSubmit={createOrUpdate} className="bg-gray-900 p-4 rounded mb-6 animate-fadeInUp">
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
          {err && <div className="text-red mb-2">{err}</div>}
          <button className="btn">{editingId ? 'Update Note' : 'Add Note'}</button>
        </form>

        {/* Search */}
        <input
          type="text"
          placeholder="Search notes..."
          value={q}
          onChange={e => { setQ(e.target.value); fetchNotes(e.target.value); }}
          className="input w-full mb-4"
        />

        {/* Notes list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map(note => (
            <div key={note._id} className="bg-gray-900 p-4 rounded shadow animate-fadeInUp">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => edit(note)} className="text-blue-400 flex items-center gap-1">
                    <Edit2 size={16} /> Edit
                  </button>
                  <button onClick={() => del(note._id)} className="text-red-500 flex items-center gap-1">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mb-2">{note.content}</p>
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((t, i) => (
                    <span key={i} className="bg-gray-700 px-2 py-1 rounded text-xs">{t}</span>
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
