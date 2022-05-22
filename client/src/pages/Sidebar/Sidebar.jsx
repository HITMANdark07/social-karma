import React from 'react'
import { useSelector } from 'react-redux';
import {BsShieldFillCheck} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import "../Sidebar/Sidebar.css"

const Sidebar = ({active}) => {
    const subRole = useSelector(state => state.user?.user?.subRole);
    const navigate = useNavigate();
    return (
    <div className="sidebar">
      <div className="logo d-flex justify-content-between">
        <div className="flex flex-row logo-name text-md">
          <BsShieldFillCheck size={25} style={{marginRight:10}} />
          <span>{subRole?.toUpperCase()}</span>
        </div>
      </div>
      <div className="vertical-menu pt-2">    
          {
            subRole==='donator' 
            ?
            <ul>
              <li style={{backgroundColor: active==='dashboard' ? 'rgba(256,256,256,0.3)': 'transparent'}} onClick={() => {
                navigate('/dashboard')
              }}>
                <span style={{color:active==='dashboard' ? 'white':''}}>DONATE</span>
              </li>
              <li style={{backgroundColor: active==='donations' ? 'rgba(256,256,256,0.3)': 'transparent'}} onClick={() => {
                navigate('/donations')
              }}>
                <span style={{color:active==='donations' ? 'white':''}}>DONATIONS</span>
              </li>
            </ul>
            :
            <ul>
              <li style={{backgroundColor: active==='volunteer' ? 'rgba(256,256,256,0.3)': 'transparent'}} onClick={() => {
                navigate('/volunteer')
              }}>
                <span style={{color:active==='volunteer' ? 'white':''}}>VOLUNTEER</span>
              </li>
              <li style={{backgroundColor: active==='pending' ? 'rgba(256,256,256,0.3)': 'transparent'}} onClick={() => {
                navigate('/pending')
              }}>
                <span style={{color:active==='pending' ? 'white':''}}>PENDING</span>
              </li>
              <li style={{backgroundColor: active==='completed' ? 'rgba(256,256,256,0.3)': 'transparent'}} onClick={() => {
                navigate('/completed')
              }}>
                <span style={{color:active==='completed' ? 'white':''}}>COMPLETED</span>
              </li>
            </ul>
          }
      </div>
    </div>
  );
}

export default Sidebar;