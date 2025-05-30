import React, { useContext, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Start from './Start'
import Output from './Output';
import Input from './Input';
import DataTable from './ShowResultTable';
import { context } from '../../context/ChatbotContext';

const Main = () => {
    const {isOutputComponentActive,isTableActive} = useContext(context);
    return (
        <div className={`w-full min-h-dvh items-center flex justify-between flex-col`}>
            {
                isTableActive?(
                    <div className='absolute top-0 left-0 w-full h-full min-h-dvh overflow-y-scroll bg-transparent-black'>
                        <DataTable/>
                    </div>
                ):null
            }
            <Navbar />
           {isOutputComponentActive?<Output/>:<h2 className="sm:hidden font-bold text-3xl text-center my-2">What can I help with ?</h2>}
            {!isOutputComponentActive?<Start/>:
            <div className="w-full grid place-items-center">
            <Input/>
            <p className="text-center text-sm sm:text-base sm:block m-2">By messaging {import.meta.env.VITE_API_NAME}, you agree to our Terms and have read our Privacy Policy.</p>
            </div>
            }
            {!isOutputComponentActive && <div className='hidden sm:block'></div>}

        </div>
    )
}

export default Main