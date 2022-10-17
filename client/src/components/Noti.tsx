import React, { useState } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { IconNotiBell } from './Icon';

// const socket = io("http://localhost:4000");
// console.log("Connecting to", socket);

const Noti = ({ socket }) => {

  const [notiList, setNotiList] = useState([]);

  useEffect(() => {
    socket.on("pushNoti", (data) => setNotiList(prev => [...prev, data]));
  }, [socket]);

  return (
    <div className='noti__bell'>
      {notiList.length > 0 && <label>{notiList.length}</label>}
      <div className='noti__bellIcon'>
        <IconNotiBell />
      </div>
    </div>
  )
}

export default Noti;