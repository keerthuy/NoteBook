import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { name, email, password }
      );
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
      console.error('Signup error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-teal-100">
      <div className="border-0 shadow-2xl p-8 w-96 bg-white rounded-2xl flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-6 text-teal-700 tracking-wide drop-shadow">Signup</h2>
        <form onSubmit={handleSubmit} className="w-full">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="mb-5">
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              placeholder="******"
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-semibold shadow transition-all duration-150 active:scale-95">
              Signup
            </button>
            <p className="text-center mt-3 text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
