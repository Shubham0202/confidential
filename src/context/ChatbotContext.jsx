import { React, createContext, useState } from 'react'

export const context = createContext();

const ChatbotContext = ({ children }) => {
  const [messages, setMessages] = useState('hello');
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInputs, setUserInputs] = useState([]);
  const contextValue = {
    messages,
    setMessages,
    input,
    setInput,
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    userInputs,
    setUserInputs
  }
  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  )
}

export default ChatbotContext