import React, { useState, useRef, useEffect } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react';

function Chat() {

  const [addEmoji, setAddEmoji] = useState(false);
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect( () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [endRef])

  const handleEmoji = e => {
    setText((prevText) => (prevText + e.emoji))
    setAddEmoji(false);
  }

  return (
    <div className='chat'>

      {/* Top Part */}

      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Hariansh Singh</span>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing </p>
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

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod dicta culpa laudantium fuga porro a quidem recusandae, quibusdam ea! Dolorum provident animi consequuntur, quia repellendus neque voluptatum harum suscipit.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod dicta culpa laudantium fuga porro a quidem recusandae, quibusdam ea! Dolorum provident animi consequuntur, quia repellendus neque voluptatum harum suscipit.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod dicta culpa laudantium fuga porro a quidem recusandae, quibusdam ea! Dolorum provident animi consequuntur, quia repellendus neque voluptatum harum suscipit.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod dicta culpa laudantium fuga porro a quidem recusandae, quibusdam ea! Dolorum provident animi consequuntur, quia repellendus neque voluptatum harum suscipit.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod dicta culpa laudantium fuga porro a quidem recusandae, quibusdam ea! Dolorum provident animi consequuntur, quia repellendus neque voluptatum harum suscipit.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod dicta culpa laudantium fuga porro a quidem recusandae, quibusdam ea! Dolorum provident animi consequuntur, quia repellendus neque voluptatum harum suscipit.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div ref={endRef}></div>

      </div>

      {/* Bottom Part */}

      <div className="bottom">
        <div className="icons">

          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />

        </div>

        <input type="text" placeholder='Type a message...' value={text} onChange={(e) => setText(e.target.value)} />

        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setAddEmoji((prev) => (!prev))} />

          <div className="picker">
            <EmojiPicker open={addEmoji} onEmojiClick={handleEmoji} />
          </div>

        </div>

        <button className='sendButton'>Send</button>

      </div>
    </div>
  )
}

export default Chat