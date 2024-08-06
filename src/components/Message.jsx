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


//     </div>
//   )
// }

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
    let date;

    // If the timestamp is a number, assume it's a Unix timestamp in milliseconds
    if (typeof timestamp === 'number') {
      date = new Date(timestamp);
    } 
    // If the timestamp is a string, assume it's an ISO string
    else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } 
    // Handle any other cases (e.g., invalid formats)
    else {
      console.error("Invalid timestamp format:", timestamp);
      return "Invalid date";
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", timestamp);
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
        <span>{formatTime(message.timestamp)}</span> {/* Use the formatTime function here */}
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}

