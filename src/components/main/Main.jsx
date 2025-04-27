import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import Start from './Start'
import Output from './Output';

const Main = () => {
    const [isOutputComponentActive,setIsOutputComponentActive] = useState(false);
    return (
        <div className='w-full min-h-dvh items-center flex justify-between flex-col'>
            <Navbar />
           {
            isOutputComponentActive?<Output/>:<h2 className="sm:hidden font-bold text-3xl text-center my-2">What can I help with ?</h2>
           } 
            <Start />
            <p className="hidden sm:block m-2">By messaging ChatGPT, you agree to our Terms and have read our Privacy Policy.</p>
        </div>
    )
}

export default Main