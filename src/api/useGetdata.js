import axios from 'axios';
import { useContext, useState } from 'react';
import { context } from '../context/ChatbotContext';

const useGetData = () => {

    const { data, error, loading, setData, setError, setLoading } = useContext(context)
    const fetchData = async (userInput) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/chat`,
                { query: userInput }
            );
            setData(response.data);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};

export default useGetData;
