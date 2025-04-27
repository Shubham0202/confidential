import React from 'react'
import { Link } from 'react-router-dom'

const NotLogin = () => {
  return (
    <div className='flex items-center gap-2'>
        <Link className=' cursor-default sm:cursor-pointer block text-white bg-black px-5 md:px-7 py-2 font-semibold rounded-full'>Login</Link>
        <Link className=' cursor-default sm:cursor-pointer block text-white bg-black px-5 md:px-7 py-2 font-semibold rounded-full'>Sign up</Link>
    </div>
  )
}

export default NotLogin