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
  <div className="bg-blue-100 min-h-screen pb-10">
    <Navbar setQuery={setQuery} />

    <div className="text-center pt-6">
      <h1 className="text-3xl font-bold text-gray-800">Your Notes</h1>
      <p className="text-gray-500 text-sm mt-1">Manage and organize your thoughts efficiently</p>
    </div>

    <div className="px-8 pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300 ease-in-out">
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={onEdit}
            deleteNote={deleteNote}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 mt-12">
          <img
            src="https://www.svgrepo.com/show/452030/empty-box.svg"
            alt="No Notes"
            className="w-24 mx-auto opacity-70 mb-4"
          />
          <p className="text-lg font-medium">No notes found. Try adding one!</p>
        </div>
      )}
    </div>

    <button
      onClick={() => setModalopen(true)}
      className="fixed right-6 bottom-6 w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-3xl shadow-xl hover:bg-teal-600 active:scale-95 transition-all duration-200"
    >
      <span className="pb-1">+</span>
    </button>

    {isModalOpen && (
      <Modal
        closeModal={closeModal}
        addNote={addNote}
        currentNote={currentNote}
        editNote={editNote}
      />
    )}
  </div>
);

};

export default Home;
