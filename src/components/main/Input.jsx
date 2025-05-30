import { PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React, { useContext, useRef, useEffect, useState } from 'react';
import { context } from '../../context/ChatbotContext';
import useGetData from '../../api/useGetdata';
import { TableCellsIcon } from '@heroicons/react/24/solid';

const Input = ({ className }) => {
  const { inputRef, input, setInput, modelAnswers, setUserInputs, setModelAnswers, setIsTableActive,setIsOutputComponentActive } = useContext(context);
  const { fetchData } = useGetData();

  const [cache, setCache] = useState(new Map());

  const handleSubmit = async (e) => {
    e.preventDefault();
    // show output component
    setIsOutputComponentActive(true);
    // add readonly mode
    inputRef.current.setAttribute('readonly',true);
    if (!input.trim()) return;

    const trimmedInput = input.trim();

    if (cache.has(trimmedInput)) {
      // Use cached response
      const cachedResponse = cache.get(trimmedInput);
      // console.log("cachedInput:"+cachedResponse);


      setUserInputs((prev) => [...prev, trimmedInput]);
      setInput(''); // clear field immediately

      setModelAnswers((prev) => [...prev, cachedResponse]);
      console.log("Used cached response.");
      inputRef.current.removeAttribute('readonly');
      return;
    }

    // Otherwise, fetch from server
    try {
      const result = await fetchData(trimmedInput);
      if (result?.message || result?.results) {
        setUserInputs((prev) => [...prev, trimmedInput]);
        setInput(''); // clear field immediately
        setModelAnswers((prev) => [...prev, result]);


        // Save to cache
        setCache((prevCache) => new Map(prevCache).set(trimmedInput, result))
      } else {
        console.warn("No valid response received");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    finally{
      inputRef.current.removeAttribute('readonly');
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  function SelectCurrentButton() {
    setIsTableActive(true);
  }
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
        <div className="flex items-center gap-2">

          <div className="attach-file px-4 py-1.5 flex items-center sm:cursor-pointer rounded-full hover:bg-gray-100">
            <PaperClipIcon className="w-5 h-5" />
            <p>Attach</p>
          </div>
          <div onClick={(modelAnswers.length!=0 && modelAnswers[modelAnswers.length-1]?.results)?SelectCurrentButton:null} className={`table-format flex items-center sm:cursor-pointer px-4 py-1.5 transition-colors duration-300 rounded-full hover:bg-gray-100 ${( modelAnswers[modelAnswers.length-1]?.results == undefined || modelAnswers.length ==0)?'hover:cursor-not-allowed':null }`}>
            <TableCellsIcon className="w-5 h-5 mr-2" />
            <p>Show Table</p>
          </div>
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
