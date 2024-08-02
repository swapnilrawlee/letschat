import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Regsiter from '../src/auth/Regsiter'
import Login from '../src/auth/Login'
import Homepage from '../page/Homepage'
const Routing = () => {
  return (
   <Routes>
    <Route path='/register' element={<Regsiter/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Homepage/>}/>
   </Routes>
  )
}

export default Routing
