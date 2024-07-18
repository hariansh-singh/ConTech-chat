import React, {useState} from 'react'
import './chatList.css'

function ChatList() {

  const [addMode, setAddMode] = React.useState(false)

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder='Search' />
        </div>
        <img src={ addMode ? "./minus.png" : "./plus.png"} alt="" className='add' 
          onClick={() => setAddMode((prev) => (!prev))}
        />
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Hariansh Singh</span>
          <p>Sat Sri Akaal!</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Hariansh Singh</span>
          <p>Sat Sri Akaal!</p>
        </div>
      </div>
      
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Hariansh Singh</span>
          <p>Sat Sri Akaal!</p>
        </div>
      </div>

    </div>
  )
}

export default ChatList