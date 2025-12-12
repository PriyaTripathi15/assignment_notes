const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// create
router.post('/', auth, async (req,res)=>{
  try{
    const {title, content, tags} = req.body;
    if(!title) return res.status(400).json({msg:'Title required'});
    const note = new Note({user:req.user.id, title, content, tags});
    await note.save();
    res.json(note);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// read all (with search)
router.get('/', auth, async (req,res)=>{
  try{
    const q = req.query.q || '';
    const notes = await Note.find({user:req.user.id, $or:[{title: {$regex: q, $options:'i'}},{content: {$regex: q, $options:'i'}}]}).sort({createdAt:-1});
    res.json(notes);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// get by id
router.get('/', auth, async (req, res) => {
  try {
    const { q } = req.query;
    let query = { user: req.user.id };

    if (q) {
      // Case-insensitive regex search for title or content
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ];
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// update
router.put('/:id', auth, async (req,res)=>{
  try{
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({msg:'Not found'});
    if(note.user.toString() !== req.user.id) return res.status(401).json({msg:'Not authorized'});
    const {title, content, tags} = req.body;
    note.title = title ?? note.title;
    note.content = content ?? note.content;
    note.tags = tags ?? note.tags;
    await note.save();
    res.json(note);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Not found' });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await Note.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
