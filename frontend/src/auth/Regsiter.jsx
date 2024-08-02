import React from 'react'

const Regsiter = () => {
  return (
    <div className='w-screen h-screen bg-red-200 '>
    <form >
        <label>Email:</label>
        <input type="text" name="email" required/>
        <label>Username:</label>
        <input type="text" name="name" required/>
        <label>Password:</label>
        <input type="password" name="password" required/>
    </form>

</div>
  )
}

export default Regsiter
