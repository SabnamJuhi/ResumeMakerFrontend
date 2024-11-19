import React from 'react'
import Navbar from './Navbar/navbar';
import Body from './Body/index';
import './index.css';


const index = () => {
  return (
    <div className='home-div'>
      <div className='left-div'> <Navbar /> </div>
      <div className='right-div'><Body /></div>
    </div>
  )
}

export default index