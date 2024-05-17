import { useState } from 'react'
import './App.css'
import { findDOMNode } from 'react-dom'
import "./index.css"
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'

function App() {

  return (
    <><div className='bg-green-50 h-screen min-w-fit'>
      <Navbar />
      <Manager />
    </div>

    </>
  )
}

export default App
