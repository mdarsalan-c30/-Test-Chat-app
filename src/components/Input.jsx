import React, { useContext, useState } from 'react';
import attach from "../assests/arrach.png";
import Img from "../assests/img.png";
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { arrayUnion, updateDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
export default function Input() {
  const [text, setText] = useState('')
  const [img, setImage] = useState(null)
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid())
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {    //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  }
  return (
    <div className='input'>
      <input type="text" placeholder='Type a message..' onChange={e => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" style={{ display: "none" }} id='file' onChange={e => setImage(e.target.files[0])} />
        <label htmlFor="file"><img src={Img} alt="" /></label>

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
