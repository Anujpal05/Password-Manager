import React from 'react'

export default function Navbar() {
  return (
       <nav className=' bg-black flex justify-between text-white px-10 py-3'>
        <div className='text-xl font-bold'>
          <span className='text-green-700'>&lt;</span>
          <span>Pass</span>
          <span className=' text-green-700'>OP/&gt;</span>
        </div>
        <ul className='flex gap-14 px-24'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
  )
}
