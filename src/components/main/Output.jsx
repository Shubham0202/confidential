import React, { useContext, useEffect, useRef } from 'react';
import AiResponse from './output/AiResponse';
import UserRquest from './output/UserRquest';
import { context } from '../../context/ChatbotContext';
import ResponseAnimation from '../ResponseAnimation';
import PropertyListingCard from './output/PropertyListingCard';

const Output = () => {
  const { userInputs, modelAnswers, loading } = useContext(context);
  const messagesEndRef = useRef(null);

  const interleavedMessages = [];
  const maxLength = Math.max(userInputs.length, modelAnswers.length);
  // combine the user request and bot response in one array to show the result one after another
  for (let i = 0; i < maxLength; i++) {
    if (userInputs[i]) {
      interleavedMessages.push({ type: 'user', message: userInputs[i] });
    }

    if (modelAnswers[i]?.message) {
      const summaries = modelAnswers[i].message
      interleavedMessages.push({ type: 'bot', message: summaries });
    }
    if (modelAnswers[i]?.results) {
      const summaries = [...modelAnswers[i].results]
      interleavedMessages.push({ type: 'bot', response: summaries });
    }
  }

  useEffect(() => {
    const scrollEl = messagesEndRef.current;
    scrollEl.scrollTop = scrollEl.scrollHeight;
    // console.log("ModelAnswers:",modelAnswers);
    // console.log(interleavedMessages);
    // console.log("rendered");
  }, [userInputs, modelAnswers]);

  return (
    <div ref={messagesEndRef} className="w-full scroll-smooth output-screen overflow-scroll p-4">
      {interleavedMessages.map((item, index) =>
        item.type === 'user' ? (

          <UserRquest key={`user-${index}`} message={item.message} />
        )
          // if bot returns response then we will wrap the info in PropertyListingCard
          : (item.type === 'bot' && item.response) ? (<div key={"bot-"+index} className='auto-grid gap-4'>
            {item.response.map(apartment => <PropertyListingCard key={"bot-" + apartment._id} apartment={apartment} />)}
          </div>)
            // else return plain message
            : (
              <AiResponse key={`bot-${index}`} message={item.message} />
            )
      )}
      {
        (loading) ? <ResponseAnimation /> : null
      }
    </div>
  );
};

export default Output;
