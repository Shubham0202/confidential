import React, { useContext, useEffect, useState } from 'react'
import Aside from './aside/Aside'
import Main from './main/Main'
import Offline from '../components/Offline';
import { context } from '../context/ChatbotContext';
import Table from '../components/main/Table'
const Home = () => {

  return (
    <div className='flex items-start'>
      {/* <Aside/> */}
      {/* <Main /> */}
      <Table/>
    </div>
  )
}

export default Home