import { PaperClipIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Input = () => {
  return (
    <div className="shadow border rounded-2xl p-4">
    <input type="text" className='px-2 py-2 outline-none w-full' placeholder='Ask anything...'/>
    <div className="actions flex itmes-center justify-between mt-2">
        <div className="attach-file flex items-center sm:cursor-pointer">
            <PaperClipIcon className='w-5 h-5'/>
            <p className=''>Attach</p>
        </div>
        <div className="send-prompt sm:cursor-pointer rounded-full bg-black p-2">
            <PaperAirplaneIcon className='w-6 h-6 text-white'/>
        </div>
    </div>

</div>
  )
}

export default Input