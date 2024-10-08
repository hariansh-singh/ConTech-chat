// import React, { useState, useRef, useEffect } from 'react'
// import './chat.css'
// import EmojiPicker from 'emoji-picker-react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Change to your backend URL

// function Chat() {

//   const [addEmoji, setAddEmoji] = useState(false);
//   const [text, setText] = useState('');
//   const [messages, setMessages] = useState([]);
//   const endRef = useRef(null);

//   useEffect( () => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" })

//     socket.on('receiveMessage', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, [endRef])

//   const handleEmoji = e => {
//     setText((prevText) => (prevText + e.emoji))
//     setAddEmoji(false);
//   }

//   const handleSendMessage = () => {
//     if (text.trim()) {
//       const message = {
//         sender: 'Hariansh Singh', // Replace with actual sender
//         recipient: 'Recipient Username', // Replace with actual recipient
//         content: text,
//         timestamp: new Date(),
//       };
//       socket.emit('sendMessage', message);
//       setMessages((prevMessages) => [...prevMessages, message]);
//       setText('');
//     }
//   };

// return (
//   <div className='chat'>
//     {/* Top Part */}
//     <div className="top">
//       <div className="user">
//         <img src="./avatar.png" alt="" />
//         <div className="texts">
//           <span>Hariansh Singh</span>
//           <p>Lorem ipsum dolor, sit amet consectetur adipisicing</p>
//         </div>
//       </div>
//       <div className="icons">
//         <img src="./phone.png" alt="" />
//         <img src="./video.png" alt="" />
//         <img src="./info.png" alt="" />
//       </div>
//     </div>

//     {/* Center Part */}
//     <div className="center">
//       {messages.map((message, index) => (
//         <div className={`message ${message.sender === 'Hariansh Singh' ? 'own' : ''}`} key={index}>
//           {message.sender !== 'Hariansh Singh' && <img src="./avatar.png" alt="" />}
//           <div className="text">
//             <p>{message.content}</p>
//             <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
//           </div>
//         </div>
//       ))}
//       <div ref={endRef}></div>
//     </div>

//     {/* Bottom Part */}
//     <div className="bottom">
//       <div className="icons">
//         <img src="./img.png" alt="" />
//         <img src="./camera.png" alt="" />
//         <img src="./mic.png" alt="" />
//       </div>
//       <input
//         type="text"
//         placeholder='Type a message...'
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <div className="emoji">
//         <img src="./emoji.png" alt="" onClick={() => setAddEmoji((prev) => !prev)} />
//         <div className="picker">
//           <EmojiPicker open={addEmoji} onEmojiClick={handleEmoji} />
//         </div>
//       </div>
//       <button className='sendButton' onClick={handleSendMessage}>Send</button>
//     </div>
//   </div>
// );
// }

// export default Chat


// Chat.jsx
import React, { useState, useRef, useEffect } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Change to your backend URL

function Chat() {
  const [addEmoji, setAddEmoji] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [endRef]);

  const handleEmoji = (e) => {
    setText((prevText) => (prevText + e.emoji));
    setAddEmoji(false);
  };

  const handleSendMessage = () => {
    if (text.trim()) {
      const message = {
        sender: 'Hariansh Singh', // Replace with actual sender
        recipient: 'Recipient Username', // Replace with actual recipient
        content: text,
        timestamp: new Date(),
      };
      socket.emit('sendMessage', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setText('');
    }
  };

  return (
    <div className='chat'>
      {/* Top Part */}
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Hariansh Singh</span>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      {/* Center Part */}
      <div className="center">
        {messages.map((message, index) => (
          <div className={`message ${message.sender === 'Hariansh Singh' ? 'own' : ''}`} key={index}>
            {message.sender !== 'Hariansh Singh' && <img src="./avatar.png" alt="" />}
            <div className="text">
              <p>{message.content}</p>
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {/* Bottom Part */}
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder='Type a message...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setAddEmoji((prev) => !prev)} />
          {addEmoji && <EmojiPicker onEmojiClick={handleEmoji} />}
        </div>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
