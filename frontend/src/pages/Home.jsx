import React, { useEffect, useState } from 'react';
import { Navbar } from '../Components/Navbar';
import Modal from '../Components/Modal';
import axios from 'axios';
import NoteCard from '../Components/NoteCard';
import { toast } from 'react-toastify';



const Home = () => {
  const [isModalOpen, setModalopen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]); // ❗ useState([]) not false
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) || // ❗ Fix: `note` not `notes`, and `includes` not `include`
        note.description.toLowerCase().includes(query.toLowerCase()) // ❗ Spelling: `description` not `discription`
      )
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/note',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModalopen(false);
    setCurrentNote(null);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalopen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
      alert('Failed to add note. Please try again.');
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);

      if (response.data.success) {
        toast.success("Note deleted successfully");
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
      alert('Failed to delete note. Please try again.');
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
      alert('Failed to update note. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} /> {/* ❗ Typo in prop name? Maybe should be setQuery */}

      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard key={note._id} 
            note={note} 
            onEdit={onEdit} 
            deleteNote={deleteNote} />
          ))
        ) : (
          <p>No notes</p> // ❗ `<P>` changed to valid lowercase `<p>`
        )}
      </div>

      <button
        onClick={() => setModalopen(true)}
        className="fixed right-6 bottom-6 w-14 h-14 flex items-center justify-center text-3xl bg-teal-500 text-white font-bold rounded-full shadow-lg hover:bg-teal-600 transition-all duration-200"
      >
        <span className="pb-1">+</span>
      </button>

      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote} // ❗ Fixed prop name to match corrected function
        />
      )}
    </div>
  );
};

export default Home;
