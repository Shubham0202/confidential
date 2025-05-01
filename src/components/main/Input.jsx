import { PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React, { useContext, useRef, useEffect } from 'react';
import { context } from '../../context/ChatbotContext';
import useGetData from '../../api/useGetdata';

const Input = ({ className }) => {
  const { input, setInput,userInputs,setUserInputs } = useContext(context);
  const inputRef = useRef(null);
  const { data, error, loading, fetchData } = useGetData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log('Input submitted:', input);
    setUserInputs(prev =>[...prev, input]);
    fetchData(input); // 🔥 Call the API manually here
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    inputRef.current?.focus();
    console.log(data);
    console.log(userInputs)
  }, [data]);

  return (
    <div className={`shadow border rounded-2xl p-4 ${className}`}>
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
