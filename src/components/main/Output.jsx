import React, { useContext, useEffect, useRef } from 'react'
import AiResponse from './output/AiResponse'
import UserRquest from './output/UserRquest'
import { context } from '../../context/ChatbotContext'

const Output = () => {

  const { messages,userInputs } = useContext(context);
  const messagesEndRef = useRef(null);

  useEffect(()=>{
    const scrollEl = messagesEndRef.current;
    console.log(scrollEl);
    messagesEndRef.current.scrollTop=scrollEl.scrollHeight;
  },[userInputs])
  return (
    <div ref={messagesEndRef} className='w-full scroll-smooth output-screen overflow-scroll p-4'>
      <AiResponse />
      {/* <UserRquest /> */}
      {
        userInputs.map(i=><UserRquest message={i}/>)
      }
    </div>
  )
}

export default Output