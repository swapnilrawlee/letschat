import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/context';

const Login = () => {
  const { setData } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3030/api/login', { email, password });
      setData(response.data);
      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
      <div className="dark:bg-red-900 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome to ChatConnection</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="Enter your Email"
              className="w-full px-3 py-2 mt-1 text-input placeholder-input border-primary focus:outline-none focus:ring focus:ring-primary dark:border-zinc-600 dark:focus:ring-zinc-600 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 mt-1 text-input placeholder-input border-primary focus:outline-none focus:ring focus:ring-primary dark:border-zinc-600 dark:focus:ring-zinc-600 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-400 text-white hover:bg-red-400/80 hover:text-white p-3 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
