import React, { useContext, useEffect, useRef } from 'react';
import AiResponse from './output/AiResponse';
import UserRquest from './output/UserRquest';
import { context } from '../../context/ChatbotContext';
import ResponseAnimation from '../ResponseAnimation';

const Output = () => {
  const { userInputs, modelAnswers,loading } = useContext(context);
  const messagesEndRef = useRef(null);

  const interleavedMessages = [];
  const maxLength = Math.max(userInputs.length, modelAnswers.length);

  for (let i = 0; i < maxLength; i++) {
    if (userInputs[i]) {
      interleavedMessages.push({ type: 'user', message: userInputs[i] });
    }

    if (modelAnswers[i]?.results?.length) {
      const summaries = modelAnswers[i].results
        .map((res) => res.summary)
        .filter(Boolean) // removes any undefined/null
        .join('\n\n'); // add new line
      interleavedMessages.push({ type: 'bot', message: summaries });
    }
    if (modelAnswers[i]?.results?.length ==0 && modelAnswers[i]?.status =="greeting") {
      const summaries = modelAnswers[i].message;
      interleavedMessages.push({ type: 'bot', message: summaries });
    }
  }

  useEffect(() => {
    const scrollEl = messagesEndRef.current;
    scrollEl.scrollTop = scrollEl.scrollHeight;
  }, [userInputs, modelAnswers]);

  return (
    <div ref={messagesEndRef} className="w-full scroll-smooth output-screen overflow-scroll p-4">
      {interleavedMessages.map((item, index) =>
        item.type === 'user' ? (
          <UserRquest key={`user-${index}`} message={item.message} />
        ) : (
          <AiResponse key={`bot-${index}`} message={item.message} />
        )
      )}
      {
        (loading)?<ResponseAnimation />:null
      }
    </div>
  );
};

export default Output;
