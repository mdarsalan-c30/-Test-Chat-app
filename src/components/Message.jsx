// import React, { useContext, useEffect, useRef } from 'react'

// import { AuthContext } from '../context/AuthContext';
// import { ChatContext } from '../context/ChatContext';
// export default function Message({message}) {
//   const {currentUser}=useContext(AuthContext);
//   const {data}=useContext(ChatContext);
//   const ref = useRef();
//   useEffect(()=>{
//     ref.current?.scrollIntoView({
//       behaviour:"smooth"
//     });
//   },[message]);
// console.log(message);
//   return (
//     <div  ref ={ref}className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      
//       <div className="messageinfo">
//       <img src={message.senderId === currentUser.uid? currentUser.photoURL:data.user.photoURL} alt="" />
//           <span>just now</span>
// </div>
//         <div className="messagecontent">
//         <p>{message.text}</p>
//         {message.img &&
//         <img src={message.img} alt="" />
// }
//         </div>

import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  // Function to format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", timestamp);
      return "Invalid date";
    }

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageinfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>{formatTime(message.timestamp)}</span>
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}

        
      
//     </div>
//   )
// }
