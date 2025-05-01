import React from 'react'

const UserRquest = ({message='show me the chipest room in this apratment ?'}) => {
    return (
        <div className="user-response flex flex-col items-end">
            <div className="rounded-full bg-blue-400 w-fit px-4 py-2 my-2">{message}</div>
        </div>
    )
}

export default UserRquest