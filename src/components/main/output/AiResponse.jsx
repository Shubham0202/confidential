import React from 'react'

const AiResponse = ({message='hii how may i assist you ?'}) => {
  return (
    <div className="ai-resposnse rounded-full bg-slate-100 w-fit px-4 py-2">{message}</div>
  )
}

export default AiResponse