const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const dotenv = require('dotenv')

const Notes = require("../models/notes.js")
dotenv.config();

exports.createNote = async (req, res) => {
  const { title, description, tags, color  } = req.body;
  try {
    const user = req.user
    const post = await Notes.create({title, description, tags, user: user.id, color})
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const user = req.user 
    const posts = await Notes.find({user: ObjectId(user.id)}).populate('user')

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.noteId).populate('user')
    res.status(200).json({ note });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Notes.find({_id: ObjectId(req.params.noteId) })
    const update = await Notes.update({_id: ObjectId(req.params.noteId) }, {$set: {...req.body}}).populate('user')
    res.status(200).json({ update });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Notes.remove({_id: ObjectId(req.params.noteId) })
    res.status(200).json({ mesage: 'Deleted sucessfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
