import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

const Login = () => {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const navigate = useNavigate()
const {login} = useAuth()

const handleSubmit =  async (e) => {
   e.preventDefault()
   try{
    const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {email,password}
    );

    if(response.data.success){
      login(response.data.user)
        localStorage.setItem("token",response.data.token)
       navigate('/')
    }
   }catch(error){
     console.log(error)
   }
};

  return ( 
        
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-teal-100">
      <div className="border-0 shadow-2xl p-8 w-96 bg-white rounded-2xl flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-6 text-teal-700 tracking-wide drop-shadow">Login</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-5">
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition' placeholder="Enter your email" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition' placeholder="******" required />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className='w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-semibold shadow transition-all duration-150 active:scale-95'
            >
              Login
            </button>
            <p className='text-center mt-3 text-gray-600'>
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;