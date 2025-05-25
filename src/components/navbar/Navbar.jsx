import { ChevronDownIcon } from '@heroicons/react/16/solid'
import React, { useContext } from 'react'
import NotLogin from './NotLogin'
import LoggedIn from './LoggedIn'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { context } from '../../context/ChatbotContext'

const Navbar = () => {
    const { inputRef,setModelAnswers, setUserInputs,setIsOutputComponentActive} = useContext(context);
    // clear output
    const handleClearOutput =()=>{
        setModelAnswers([]);
        setUserInputs([]);
        setIsOutputComponentActive(false);
        inputRef.current?.focus();
    }
    return (
        <div className='w-full'>
            <div className="flex items-center justify-between px-4 py-1 border w-full">
                <div onClick={handleClearOutput} className="sm:cursor-pointer p-3 hover:bg-slate-100 transition-all rounded-full">
                <PencilSquareIcon className='w-7 h-7'/>
                </div>
                <div className="flex items-center cursor-default">
                    <h3 className="font-semibold text-xl">{import.meta.env.VITE_API_NAME}</h3>
                    <ChevronDownIcon className='w-8 h-8'/>
                </div>
                {/* <NotLogin/> */}
                <LoggedIn/>
            </div>
        </div>
    )
}

export default Navbar