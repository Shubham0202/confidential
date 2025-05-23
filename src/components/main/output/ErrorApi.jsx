import React from 'react'

const ErrorApi = ({errorMessage}) => {
  return (
    <div className=''>
       {errorMessage || "something went wrong in backend side"} 
    </div>
  )
}

export default ErrorApi