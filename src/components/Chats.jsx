

import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
export default function Chats() {
  
    const [chats, setChats] = useState([]);
  
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
  console.log(currentUser)
    useEffect(() => {
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });
  
        return () => {
          unsub();
        };
        console.log(doc.data)

      };
      currentUser.uid && getChats();
    }, [currentUser.uid]);
  
    const handleSelect = (u) => {
      dispatch({ type: "CHANGE_USER", payload: u });
    }
  console.log(chats)
  return (
    <div className='chats'>
     {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(([chatId, chat]) => {
          const { userInfo, lastMessage } = chat;
          const { photoURL, displayName } = userInfo || {};

          return (
            <div
              className='userchat'
              key={chatId}
              onClick={() => handleSelect(userInfo)}
            >
              {photoURL && (
                <img
                  src={photoURL}
                  alt={`${displayName}'s photo`}
                  className='userchatphoto'
                />
              )}
              <div className='userchatinfo'>
                {displayName && <span>{displayName}</span>}
                <p>{lastMessage?.text}</p>
              </div>
            </div>
          );
        })}

        </div> 

  );
};

