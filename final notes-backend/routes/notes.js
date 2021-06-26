const express = require("express")
const router = express.Router();
const auth = require('../middleware/authentication')

const { getNotes, createNote, updateNote, getNote, deleteNote } =require("../controllers/notes.js")

router.post("/",auth ,createNote);
router.get("/",auth, getNotes);
router.get("/:noteId",auth, getNote);
router.post("/:noteId",auth, updateNote);
router.delete("/:noteId",auth, deleteNote);

module.exports = router