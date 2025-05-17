import React, { useRef } from 'react'
import Profile from '../../assets/chatbot.png'
import { ArrowRightEndOnRectangleIcon, CubeTransparentIcon } from '@heroicons/react/16/solid'
import { UserPlusIcon } from '@heroicons/react/24/outline'
const LoggedIn = () => {
    const popup = useRef(null);
    const isProfileActive = ()=>{
        (popup.current.classList.contains('hidden'))?popup.current.classList.remove('hidden'):popup.current.classList.add('hidden')
    }
  return (
    <>
    <div onClick={isProfileActive} className='sm:cursor-pointer rounded-full border-4 border-transparent transition-all hover:border-gray-100 w-12 h-12'>
        <img src={Profile} className='w-full h-full' alt="" />
    </div>
    <div ref={popup} className="profile-info bg-white hidden absolute right-3 top-16 w-48 sm:w-72 min-h-40 shadow border-2 border-gray-100 rounded-lg p-2 transition-all duration-200">
        <div className="cursor-default sm:cursor-pointer flex items-center gap-2 px-2 py-3 hover:bg-gray-100 rounded-lg transition-all duration-500">
            <UserPlusIcon className='w-5 h-5'/>
            <p>Profile</p>
        </div>
        <div className="cursor-default sm:cursor-pointer flex items-center gap-2 px-2 py-3 hover:bg-gray-100 rounded-lg transition-all duration-500">
            <CubeTransparentIcon className='w-5 h-5'/>
            <p>Upgrade Plan</p>
        </div>
        <div className="cursor-default sm:cursor-pointer flex items-center gap-2 px-2 py-3 hover:bg-gray-100 rounded-lg transition-all duration-500">
            <ArrowRightEndOnRectangleIcon className='w-5 h-5'/>
            <p>Logout</p>
        </div>
       
    </div>
    </>
  )
}

export default LoggedIn