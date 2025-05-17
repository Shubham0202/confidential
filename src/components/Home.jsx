import React, { useContext, useEffect, useState } from 'react'
import Aside from './aside/Aside'
import Main from './main/Main'
import Offline from '../components/Offline';
import { context } from '../context/ChatbotContext';

const Home = () => {
  const [isOnline,setIsOnline] = useState(navigator.onLine);
   const {APIError} = useContext(context);
      
  useEffect(()=>{
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };

  },[])
  return ((!isOnline)?<Offline/>:
    <div className='flex items-start'>
        {/* <Aside/> */}
        {(APIError)?<Offline APIMessage={APIError.message} Error={APIError.code}/>:<Main/>}
        {/* <Main/> */}
    </div>
  )
}

export default Home