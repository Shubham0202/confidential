import { React, createContext, useState } from 'react'

export const context = createContext();

const ChatbotContext = ({ children }) => {
  const [messages, setMessages] = useState('hello');
  const [input, setInput] = useState('');
  const [userInputs, setUserInputs] = useState([]);
  const [modelAnswers, setModelAnswers] = useState([]);
  const [APIError,setAPIError]= useState(null);
  const [loading,setLoading] = useState(false);
  const contextValue = {
    messages,
    setMessages,
    input,
    setInput,
    userInputs,
    setUserInputs,
    modelAnswers,
    setModelAnswers,
    APIError,
    setAPIError,
    loading,
    setLoading
  }
  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  )
}

export default ChatbotContext