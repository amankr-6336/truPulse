import Dexie from 'dexie';

const indDb=new Dexie('NoteAppDb');

indDb.version(1).stores({
    notes:'&id, title, content, updatedAt, synced',
    //to store the id of note which was deleted while the app was offline , so that once app is only we can sync server data accordingly.
    deletedNotesQueue: "++id, noteId"  

});

// to add note to db
export const addNote = async (note) => {
  try {
    await indDb.notes.add(note);
    console.log('Note added to IndexedDB:', note);
  } catch (error) {
    console.error('Error adding note to IndexedDB:', error);
  }
};

// fetch all notes from db
export const getAllNotes = async () => {
  try {
    return await indDb.notes.toArray();
  } catch (error) {
    console.error('Error fetching notes from IndexedDB:', error);
    return [];
  }
};

// sync API data to db
export const syncNotesFromAPI = async (apiNotes) => {
  try {
    await indDb.notes.bulkPut(apiNotes);
    console.log('API notes synced to IndexedDB');
  } catch (error) {
    console.error('Error syncing API notes to IndexedDB:', error);
  }
};

// to update the note 
export const updateNote = async (note) => {
  try {
    await indDb.notes.put(note); // put will add or update based on note.id
    console.log('Note updated in IndexedDB:', note);
  } catch (error) {
    console.error('Error updating note in IndexedDB:', error);
  }
};


// delete the node and queue the id of note to be deleted ,to sync with server
export const deleteNote = async (noteId) => {
  try {
    // Add to deletion queue
    await indDb.deletedNotesQueue.add({ noteId });
    // Remove from notes store
    await indDb.notes.delete(noteId);
    console.log('Note deleted and queued for sync:', noteId);
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

// fetch deleted notes queue
export const getDeletedNotesQueue = async () => {
  try {
    return await indDb.deletedNotesQueue.toArray();
  } catch (error) {
    console.error('Error fetching deleted notes queue:', error);
    return [];
  }
};

// remove a note from deletion queue after successful sync
export const removeFromDeletionQueue = async (id) => {
  try {
    await indDb.deletedNotesQueue.delete(id);
    console.log('Deleted note removed from queue:', id);
  } catch (error) {
    console.error('Error removing note from queue:', error);
  }
};