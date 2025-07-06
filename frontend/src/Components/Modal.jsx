import React, { useState } from 'react'

const Modal = ({closeModal,addNote}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

 
 const handleSubmit = async (e) => {
    e.preventDefault();
   addNote(title,description)

  };


  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50'>
      <div className='bg-white p-8 rounded shadow-lg w-full max-w-md relative'>
        <h2 className='text-xl font-bold mb-4 text-center'>Add New Note</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Note Title'
            className='border p-2 w-full mb-4 rounded'
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Note Description'
            className='border p-2 w-full mb-4 rounded'
            rows={4}
          />
          <div className='flex justify-between'>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>
              Add Note
            </button>
            <button type='button' className='text-red-500 px-4 py-2 rounded hover:bg-red-100 transition'
            onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal