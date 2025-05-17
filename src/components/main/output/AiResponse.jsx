import React from 'react'
import ReactMarkdown from 'react-markdown';

const AiResponse = ({message='hii how may i assist you ?'}) => {
  return (
    <div className="ai-resposnse prose rounded-3xl bg-slate-100 w-fit px-6 py-2" >
      <ReactMarkdown>
        {message}
      </ReactMarkdown>
    </div>
  )
}

export default AiResponse