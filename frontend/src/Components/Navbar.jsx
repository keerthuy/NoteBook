import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

export const Navbar = ({setQuery}) => {
    const { user } = useAuth();
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <div className="text-xl font-bold">
                <Link to="/">NoteApp</Link>
            </div>
            <input
                type="text"
                placeholder="search notes...."
                className="bg-gray-600 px-4 py-2 rounded"
                onChange={(e) => setQuery(e.target.value)}
            />
            <div>
                {!user ? (
                    <>
                        <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
                            Login
                        </Link>
                        <Link to="/register" className="bg-blue-500 px-4 py-2 rounded mr-4">
                            Signup
                        </Link>
                    </>
                ) : (
                    <>
                        <span className='mr-4'>{user ? user.name : "Guest"}</span>
                        <button className='bg-red-500 px-4 py-2 rounded'>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}