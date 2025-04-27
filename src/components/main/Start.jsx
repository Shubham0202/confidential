import React from 'react'
import Input from './Input'

const Start = () => {
  return (
    <div className='min-w-mobile-prompt-size sm:min-w-promptSize'>
        <h2 className="hidden sm:block font-bold text-3xl text-center my-2">What can I help with ?</h2>
       <Input/>
    </div>
  )
}

export default Start