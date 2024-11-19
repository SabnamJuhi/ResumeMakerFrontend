import React from 'react';
import './navbar.css';
import {HomeFilled, ReconciliationFilled, LeftOutlined} from '@ant-design/icons'

const index = () => {

  function redirectToHomePage() {
    window.location.href = '/home';
  }

  return (
    <div>
    <div className='nav-div'>
        <div className='nav-div-box nav1'>
            <button className='nav-div-box-1'>
                <div><HomeFilled style={{color: "grey"}}/></div>
                <div>VSigmaa</div>
            </button>
            <button className='nav-div-box-1-btn'><LeftOutlined /></button>
        </div>
        <div className='nav-div-box nav2'>
            <button  className="nav-button" onClick={redirectToHomePage} >
            
                <div><ReconciliationFilled /></div>
                <div style={{marginLeft: "40px"}}>Resume</div>
               
            </button>
        </div>
    </div>
    </div>
  )
}

export default index