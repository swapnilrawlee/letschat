import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3030/api/register', { name, email, password });
      console.log(response);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl text-white font-bold mb-4">Create an Account</h1>
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <label htmlFor="name" className="block text-sm font-medium">Username</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your username"
          className="w-full mt-2 p-2 border border-input rounded-md focus:outline-none focus:ring focus:ring-ring"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email" className="block text-sm font-medium mt-4">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          className="w-full mt-2 p-2 border border-input rounded-md focus:outline-none focus:ring focus:ring-ring"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="block text-sm font-medium mt-4">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full mt-2 p-2 border border-input rounded-md focus:outline-none focus:ring focus:ring-ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-black text-white w-full mt-6 p-2 rounded-md hover:bg-cyan-500 hover:text-black transition-colors">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
