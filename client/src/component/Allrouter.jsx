import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Singup } from '../pages/Singup'


export const Allrouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Singup/>}/>
    </Routes>
  )
}
