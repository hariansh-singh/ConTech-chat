import React, {useState} from 'react'
import './chatList.css'
import AddUser from './AddUser/AddUser'

function ChatList() {

  const [addMode, setAddMode] = React.useState(false)

  const handleMode = () => {
    setAddMode((prev) => (!prev))
  }

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder='Search' />
        </div>
        <img src={ addMode ? "./minus.png" : "./plus.png"} alt="" className='add' 
          onClick={handleMode}
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

      {addMode && <AddUser />}

    </div>
  )
}

export default ChatList