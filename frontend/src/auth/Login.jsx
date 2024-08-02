import React from 'react'

const Login = () => {
    
  return (
    <div className='w-screen h-screen '>
        <form >
            <label>Email:</label>
            <input type="text" name="email" required/>
            <label>Password:</label>
            <input type="password" name="password" required/>
        </form>
    </div>
  )
}

export default Login