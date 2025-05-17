import React, { useContext } from 'react'
import RatImage from '../assets/rat.png'
import useGetData from '../api/useGetdata';
import { context } from '../context/ChatbotContext';
const Offline = ({APIMessage,Error}) => {
    const { fetchData } = useGetData();
    const { input, setInput, setUserInputs,setAPIError, setModelAnswers } = useContext(context);
      
    const handleError = async()=>{
        try {
            const result = await fetchData(input);
            if (result?.response) {
              setAPIError(null);
      
           } else {
              console.warn("No valid response received");

            }
          } catch (err) {
            console.error("Error fetching data:", err);
            APIError(err);
          }
          setInput('');
    }
  return (
    <div className='absolute w-full h-screen bg-amber-50 grid place-items-center'>
            <div className='shaodw rounded-xl m-2'>
                <img src={RatImage} alt="" className='w-96 h-96 object-contain' />
                
            <h2 className="font-bold text-xl sm:text-3xl text-center">{APIMessage || 'No Internet Connection'}</h2>
                <p className='text-center mt-2'>Blame the rat! {Error}</p>
                
                <button onClick={handleError} className='bg-black w-full rounded-full px-10 py-2 text-lg text-white'>Retry</button>
                
            </div>
    </div>
  )
}

export default Offline