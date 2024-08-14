// import React, {useState} from 'react'
// import './chatList.css'
// import AddUser from './AddUser/AddUser'

// function ChatList() {

//   const [addMode, setAddMode] = React.useState(false)

//   const handleMode = () => {
//     setAddMode((prev) => (!prev))
//   }

//   return (
//     <div className='chatList'>
//       <div className="search">
//         <div className="searchBar">
//           <img src="./search.png" alt="" />
//           <input type="text" placeholder='Search' />
//         </div>
//         <img src={ addMode ? "./minus.png" : "./plus.png"} alt="" className='add' 
//           onClick={handleMode}
//         />
//       </div>

//       <div className="item">
//         <img src="./avatar.png" alt="" />
//         <div className="texts">
//           <span>Hariansh Singh</span>
//           <p>Sat Sri Akaal!</p>
//         </div>
//       </div>

//       <div className="item">
//         <img src="./avatar.png" alt="" />
//         <div className="texts">
//           <span>Hariansh Singh</span>
//           <p>Sat Sri Akaal!</p>
//         </div>
//       </div>
      
//       <div className="item">
//         <img src="./avatar.png" alt="" />
//         <div className="texts">
//           <span>Hariansh Singh</span>
//           <p>Sat Sri Akaal!</p>
//         </div>
//       </div>

//       {addMode && <AddUser />}

//     </div>
//   )
// }

// export default ChatList



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './chatList.css';
import AddUser from './AddUser/AddUser';

// Helper function to fetch users
const fetchUsers = async (setUsers) => {
  try {
    const response = await fetch('/api/users/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Toggle add user mode
  const handleMode = () => {
    setAddMode((prev) => !prev);
  };

  // Fetch initial user list on component mount
  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  // Handle user click to start a chat
  const handleUserClick = (user) => {
    navigate(`/chat/${user._id}`, { state: { user } });
  };

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="search icon" />
          <input type="text" placeholder='Search' />
        </div>
        <img
          src={addMode ? "/minus.png" : "/plus.png"}
          alt="toggle add user"
          className='add'
          onClick={handleMode}
        />
      </div>

      {users.length === 0 && <p>No users found.</p>}

      {users.map((user) => (
        <div className="item" key={user._id} onClick={() => handleUserClick(user)}>
          <img src={user.avatar || '/default-avatar.png'} alt="Avatar" />
          <div className="texts">
            <span>{user.username}</span>
            <p>{user.lastMessage || 'No message yet'}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser setUsers={setUsers} />}
    </div>
  );
}

export default ChatList;
