import React from 'react'

const ResponseAnimation = () => {
  return (
    <div className='mt-4 p-3 bg-slate-200 flex items-center gap-1 rounded-full w-fit'>
        <div className='rounded-full bg-gray-500 w-3 h-3 animate-bounce'></div>
        <div className='rounded-full bg-gray-500 w-3 h-3 animate-bounce'></div>
        <div className='rounded-full bg-gray-500 w-3 h-3 animate-bounce'></div>
    </div>
  )
}

export default ResponseAnimation