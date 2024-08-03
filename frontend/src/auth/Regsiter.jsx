import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const Regsiter = () => {
const Navigate = useNavigate()
const [name , setName ]= useState("");
const [email , setEmail ]= useState("");
const [password , setPassword ]= useState("");

const submitHandler = async(e) => {
  e.preventDefault();
  const response =await axios.post('http://localhost:3030/api/register' ,{name ,email,password});
  console.log(response);
  if(response.status === 201 ){
    Navigate('/login')
  }
}


  return (
    <div className='w-screen h-screen flex flex-col  justify-center items-center gap-4'>
      <h1 className='text-2xl font-bold p-2'>Registration</h1>
    <form className='flex flex-col gap-4 border-2 border-black p-4 rounded-md' onSubmit={submitHandler}>
        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className='border border-black rounded'/>
        <label>Username:</label>
        <input type="text" name="name"  value={name} onChange={(e)=>setName(e.target.value)}required className='border border-black rounded'/>
        <label>Password:</label>
        <input type="password" name="password"  value={password} onChange={(e)=>setPassword(e.target.value)}required className='border border-black rounded'/>
        <button type='submit' className='bg-blue-700 text-white p-2 rounded'>Register</button>
    </form>

</div>
  )
}

export default Regsiter
