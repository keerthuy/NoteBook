import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components/Navbar';
import Modal from '../Components/Modal';
import axios from 'axios';
import NoteCard from '../Components/NoteCard';

  const Home = () => {
     const [isModalOpen,setModalopen ] = useState(false);  
    const [notes,setNotes] = useState([]);



    useEffect(() =>{
     const fetchNotes = async () => {
       try{
       
       const {data} = await axios.get("http://localhost:5000/api/note")
       setNotes(data.notes)
       }catch{
         console.log(error);
       }
     }
     fetchNotes()
    }, [])


     const closeModal = () => {
      setModalopen(false)
     }

     const addNote = async (title,description) => {
      try {
      const response = await axios.post (
        'http://localhost:5000/api/note/add',
        { title, description },{
        headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
        }  
      } 
      )
      console.log(response.data); // 👈 Add this before the if-statement

      if (response.data.success) {
        closeModal()
      }
    } catch (error) {
      console.log(error);
        alert("Failed to add note. Please try again.");
    } 
    };

     return (
      <div className='bg-gray-100 min-h-screen'>
        <Navbar/>
       

      <div>
         {notes.map(note => (
          <NoteCard
          
          note= {note}
          
          />
         )

         )

         }
      </div>




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