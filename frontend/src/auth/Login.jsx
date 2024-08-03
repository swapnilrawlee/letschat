import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../utils/context'

const Login = () => {
  const { data } = useContext(UserContext)
  const Navigate =useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setData} = useContext(UserContext)
  

  const submitHandler = async(e) => {
    e.preventDefault()
    const response =await axios.post('http://localhost:3030/api/login',{email, password})    
    setData(response.data)
    if(response.status==200) {
      Navigate(`/home`)
      
    }
  }
    
  return (
    <div className='w-screen h-screen flex flex-col  justify-center items-center gap-4'>
    <h1 className='text-2xl font-bold p-2'>Login</h1>
  <form className='flex flex-col gap-4 border-2 border-black p-4 rounded-md' onSubmit={submitHandler}>
      <label>Email:</label>
      <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className='border border-black rounded'/>
      <label>Password:</label>
      <input type="password" name="password"  value={password} onChange={(e)=>setPassword(e.target.value)}required className='border border-black rounded'/>
      <button type='submit' className='bg-blue-700 text-white p-2 rounded'>Login</button>
  </form>
</div>
  )
}

export default Login