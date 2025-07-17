import React from 'react'
import {FaEdit,FaTrash} from 'react-icons/fa'

const NoteCard = ({note,onEdit, deleteNote} ) => {
  return (
    <div className='relative bg-gradient-to-br from-white via-gray-50 to-teal-50 p-5 rounded-xl shadow-lg border-l-4 border-teal-500 hover:scale-105 hover:shadow-2xl transition-transform duration-200 group'>
      <h2 className='text-xl font-bold text-teal-700 mb-2 truncate group-hover:text-teal-900 transition-colors duration-200'>{note.title}</h2>
      <p className='text-gray-700 mb-4 line-clamp-3'>{note.description}</p>
      <div className='flex justify-end gap-2'>
        <button title="Edit" className='text-blue-500 hover:text-blue-700 bg-blue-50 rounded-full p-2 transition-colors duration-150' onClick={() =>  onEdit(note)}>
          <FaEdit />
        </button>
        <button title="Delete" className='text-red-500 hover:text-red-700 bg-red-50 rounded-full p-2 transition-colors duration-150' onClick={() => deleteNote(note._id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default NoteCard