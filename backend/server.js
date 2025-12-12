const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req,res)=> res.send({status: 'OK'}));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_app')
  .then(()=> {
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log('Server started on', PORT));
  }).catch(err=> {
    console.error('DB err', err);
    app.listen(PORT, ()=> console.log('Server started without DB on', PORT));
  });
