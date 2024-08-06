import React, { useContext } from 'react'
import Messages from './Messages'
import Input from "./Input"
import vc from "../assests/vc.png"
import add from "../assests/add.png"
import more from"../assests/more.png"
import { ChatContext } from '../context/ChatContext'
export default function Chat() {
  const{data} =useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatinfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={vc} alt="" />
          <img src={add}alt="" />
          <img src={more}alt="" />
        </div>
       </div>
      
      
  <Messages />

  <Input />
  
    </div>
  )
}
