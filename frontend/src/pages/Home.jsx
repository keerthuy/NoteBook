import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components/Navbar';
import Modal from '../Components/Modal';
import axios from 'axios';
import NoteCard from '../Components/NoteCard';

  const Home = () => {
     const [isModalOpen,setModalopen ] = useState(false);  
     const [filterNotes,setFilterNote] = useState([]);
     const [currentNote,setCurrentNote] = useState(null);
     const [query,setQuery] = useState("");

    useEffect(() =>{
     fetchNotes()
    }, [])

    useEffect(() =>{
         setFilterNote(
          notes.filter((note) => 
            note.title.toLowerCase().include(query.toLowerCase())
            note.discription.toLowerCase().include(query.toLowerCase())
        )
      );
    },[query,notes]);


      const fetchNotes = async () => {
       try{
       
       const {data} = await axios.get("http://localhost:5000/api/note")
       setNotes(data.notes)
       }catch(error){
         console.log(error);  
       }
     }


     const closeModal = () => {
      setModalopen(false)
     }

  const onEdit = (note) => {
    setCurrentNote(note)
    setModalopen(true)
  }


     const addNote = async (id) => {
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
        fetchNotes()
        closeModal()
      }
    } catch (error) {
      console.log(error);
        alert("Failed to add note. Please try again.");
    } 
   
  
  };
  

  const deleteNote = async (id)  =>{
         try {
      const response = await axios.delete (
        `http://localhost:5000/api/note/${id}`,
       {
        headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
        }  
      } 
      )
      console.log(response.data); // 👈 Add this before the if-statement

      if (response.data.success) {
        fetchNotes()
      }
    } catch (error) {
      console.log(error);
        alert("Failed to add note. Please try again.");
    } 
    };
  }


    const eidtNote = async (id, title, description) => {
       try {
      const response = await axios.put (
        `http://localhost:5000/api/note/${id}`,
        { title, description },{
        headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
        }  
      } 
      )
      console.log(response.data); // 👈 Add this before the if-statement

      if (response.data.success) {
        fetchNotes()
        closeModal()
      }
    } catch (error) {
      console.log(error);
        alert("Failed to add note. Please try again.");
    } 
    };
    

     return (
      <div className='bg-gray-100 min-h-screen'>
        <Navbar setQuerY={setQuery}/>

       

      <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
         { filterNotes.length > 0 ? filterNotes.map(note => (
          <NoteCard
          note = {note}
          onEdit ={onEdit}

           />
         )) :
        <P> 
           no notes
         </P>
        
        
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
    currentNote={currentNote}
    eidtNote={eidtNote}
    />}
      </div>
    )
  }
  
  export default Home;