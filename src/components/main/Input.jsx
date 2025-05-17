import { PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React, { useContext, useRef, useEffect, useState } from 'react';
import { context } from '../../context/ChatbotContext';
import useGetData from '../../api/useGetdata';

const Input = ({ className }) => {
  const { input, setInput, userInputs, setUserInputs, setModelAnswers } = useContext(context);
  const inputRef = useRef(null);
  const { fetchData } = useGetData();

  const [cache, setCache] = useState(new Map());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmedInput = input.trim();

    if (cache.has(trimmedInput)) {
      // Use cached response
      const cachedResponse = cache.get(trimmedInput);
      setUserInputs((prev) => [...prev, trimmedInput]);
      setInput(''); // clear field immediately

      setModelAnswers((prev) => [...prev, cachedResponse]);
      console.log("Used cached response.");
      return;
    }

    // Otherwise, fetch from server
    try {
      const result = await fetchData(trimmedInput);
      if (result?.response) {
        setUserInputs((prev) => [...prev, trimmedInput]);
        setInput(''); // clear field immediately
        setModelAnswers((prev) => [...prev, result.response]);


        // Save to cache
        setCache((prevCache) => new Map(prevCache).set(trimmedInput, result.response));
      } else {
        console.warn("No valid response received");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={`shadow border rounded-2xl w-full sm:w-[600px] p-4 ${className}`}>
      <input
        ref={inputRef}
        onChange={handleChange}
        value={input}
        type="text"
        className="px-2 py-2 outline-none w-full"
        placeholder="Ask anything..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e);
          }
        }}
      />
      <div className="actions flex items-center justify-between mt-2">
        <div className="attach-file flex items-center sm:cursor-pointer">
          <PaperClipIcon className="w-5 h-5" />
          <p>Attach</p>
        </div>
        <div
          onClick={handleSubmit}
          className="send-prompt sm:cursor-pointer rounded-full bg-black p-2"
        >
          <PaperAirplaneIcon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Input;
