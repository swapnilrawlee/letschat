import React, { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Regsiter from '../src/auth/Regsiter'
import Login from '../src/auth/Login'
import { UserContext } from '../src/utils/context'
import Homepage from '../src/page/Homepage'
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
