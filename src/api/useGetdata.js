import axios from 'axios';
import { useContext, useState } from 'react';
import { context } from '../context/ChatbotContext';

const useGetData = () => {

    const [data, setData] = useState(null);
    const {loading, setLoading} = useContext(context);
    const [error, setError] = useState(null);
    const {setAPIError} = useContext(context);
    const fetchData = async (userInput) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/chat`,
                { prompt: userInput }
            );
            setData(response.data);
            // console.log(response.data);
            return response.data;
        } catch (err) {
            console.error(err);
            setAPIError(err);
            setError(err);
        } finally {
            setLoading(false);
        }
       
    };
    
    return { data, loading, error, fetchData };
};

export default useGetData;
