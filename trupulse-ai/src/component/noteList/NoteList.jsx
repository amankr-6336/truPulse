import React, { useState } from "react";
import SingleNote from "../singleNote/SingleNote";
import { addNote, deleteNote, updateNote } from "../../services/NoteIndexedDb";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = async () => {
    const newNote = {
      id: crypto.randomUUID(),
      title,
      content,
      updatedAt: new Date().toISOString(),
      synced: false,
    };

    await addNote(newNote);
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = async (id) => {
    const updatedContent = prompt("Enter new content:");
    const updatedNote = {
      ...notes.find((note) => note.id === id),
      content: updatedContent,
      updatedAt: new Date().toISOString(),
      synced: false,
    };

    await updateNote(updatedNote);
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      noteList
      <div>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p>Status: {note.synced ? "Synced" : "Unsynced"}</p>
          <button onClick={() => handleUpdateNote(note.id)}>Update</button>
          <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
        </li>
      ))}
      <SingleNote />
    </div>
  );
}

export default NoteList;
