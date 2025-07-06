import React, { useState } from 'react'
import { Navbar } from '../Components/Navbar';
import Modal from '../Components/modal';
  const Home = () => {
     const [isModalOpen,setModalopen ] = useState(false)  
     
     const closeModal = () => {
      setModalopen(false)
     }

     const addNote = async (title,description) => {
      try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',
        { title, description }
      );
      if (response.data.success) {
        closeModal();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
      console.error('Signup error:', error.response?.data || error.message);
    } 
    };

     return (
      <div className='bg-gray-100 min-h-screen'>
        <Navbar/>

        <button
        onClick = {() => setModalopen(true)}
        className='fixed right-6 bottom-6 w-14 h-14 flex items-center justify-center text-3xl bg-teal-500 text-white font-bold rounded-full shadow-lg hover:bg-teal-600 transition-all duration-200'>
          <span className="pb-1">+</span>
        </button>
    {isModalOpen && <Modal 
    closeModal={closeModal}
    addNote={addNote}
    />}
      </div>
    )
  }
  
  export default Home;