const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }, // content required to act like blog
  tags: [{ type: String }],                  // tags array
  createdAt: { type: Date, default: Date.now }
});

// optional: add text index for search
NoteSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Note', NoteSchema);
