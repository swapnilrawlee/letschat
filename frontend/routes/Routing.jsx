import React, { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Regsiter from '../src/auth/Regsiter'
import Login from '../src/auth/Login'
import Homepage from '../page/Homepage'
import { UserContext } from '../src/utils/context'
const Routing = () => {
  const [data, setData] = useState("");
  return (
    <UserContext.Provider value={{data, setData}}>
   <Routes>
    <Route path='/' element={<Regsiter/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Homepage/>}/>
   </Routes>
    </UserContext.Provider>
  )
}

export default Routing
