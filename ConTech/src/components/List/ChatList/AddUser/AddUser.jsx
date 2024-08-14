// // // AddUser.jsx
// // import React, { useState } from 'react';
// // import './addUser.css';

// // function AddUser({ setUsers }) {
// //   const [username, setUsername] = useState('');
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [userNotFound, setUserNotFound] = useState('');

// //   const handleSearch = async (e) => {
// //     e.preventDefault();
// //     setUserNotFound('');
  
// //     // if (username.trim()) {
// //     //   try {
// //     //     const response = await fetch(`/api/users/search?username=${username}`);
// //     //     if (!response.ok) {
// //     //       throw new Error(`HTTP error! Status: ${response.status}`);
// //     //     }
// //     //     const data = await response.json();
  
// //     //     if (data.length === 0) {
// //     //       setUserNotFound('User not found');
// //     //     } else {
// //     //       setSearchResults(data);
// //     //     }
// //     //   } catch (error) {
// //     //     console.error('Error searching for users:', error);
// //     //     setUserNotFound('Error searching for users');
// //     //   }
// //     // }

// //     async function searchUser(username) {
// //       try {
// //           const response = await fetch(`http://localhost:5000/api/users/search?username=${encodeURIComponent(username)}`, {
// //               method: 'GET',
// //               headers: {
// //                   'Content-Type': 'application/json',
// //               },
// //           });
// //           if (!response.ok) {
// //               throw new Error('Error searching for users');
// //           }
// //           const user = await response.json();
// //           console.log(user);
// //       } catch (error) {
// //           console.error('Error:', error);
// //       }
// //   }
// //   };
  

// //   const handleAddUser = (user) => {
// //     setUsers(prevUsers => [...prevUsers, user]);
// //     setUsername('');
// //     setSearchResults([]);
// //   };

// //   return (
// //     <div className='addUser'>
// //       <form onSubmit={handleSearch}>
// //         <input
// //           type="text"
// //           placeholder='Username'
// //           name='username'
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //         />
// //         <button type="submit">Search</button>
// //       </form>
// //       {userNotFound && <p>{userNotFound}</p>}
// //       <div className="userList">
// //         {searchResults.map((user) => (
// //           <div className="user" key={user._id}>
// //             <div className="detail">
// //               <img src="./avatar.png" alt="" />
// //               <span>{user.username}</span>
// //             </div>
// //             <button onClick={() => handleAddUser(user)}>Add User</button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default AddUser;


// import React, { useState } from 'react';
// import './addUser.css';

// function AddUser({ setUsers }) {
//   const [username, setUsername] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [userNotFound, setUserNotFound] = useState('');

//   const searchUser = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/users/search?username=${encodeURIComponent(username)}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       if (Array.isArray(data)) {
//         setSearchResults(data);
//         if (data.length === 0) {
//           setUserNotFound('User not found');
//         } else {
//           setUserNotFound('');
//         }
//       } else {
//         console.error('Unexpected response format:', data);
//         setUserNotFound('Unexpected response format');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setUserNotFound('Error searching for users');
//     }
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setUserNotFound('');

//     if (username.trim()) {
//       await searchUser(username);
//     }
//   };

//   const handleAddUser = (user) => {
//     setUsers(prevUsers => [...prevUsers, user]);
//     setUsername('');
//     setSearchResults([]);
//   };

//   return (
//     <div className='addUser'>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder='Username'
//           name='username'
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//       {userNotFound && <p>{userNotFound}</p>}
//       <div className="userList">
//         {searchResults.map((user) => (
//           <div className="user" key={user._id}>
//             <div className="detail">
//               <img src="./avatar.png" alt="" />
//               <span>{user.username}</span>
//             </div>
//             <button onClick={() => handleAddUser(user)}>Add User</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AddUser;













// AddUser.jsx
import React, { useState } from 'react';

function AddUser({ setUsers }) {
    const [username, setUsername] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [userNotFound, setUserNotFound] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setUserNotFound('');

        if (username.trim()) {
            try {
                const response = await fetch(`http://localhost:5000/api/users/search?username=${encodeURIComponent(username)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                if (data.length === 0) {
                    setUserNotFound('User not found');
                } else {
                    setSearchResults(data);
                }
            } catch (error) {
                console.error('Error searching for users:', error);
                setUserNotFound('Error searching for users');
            }
        }
    };

    const handleAddUser = (user) => {
        setUsers(prevUsers => [...prevUsers, user]);
        setUsername('');
        setSearchResults([]);
    };

    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder='Username'
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {userNotFound && <p>{userNotFound}</p>}
            <div className="userList">
                {searchResults.map((user) => (
                    <div className="user" key={user._id}>
                        <div className="detail">
                            <img src="./avatar.png" alt="" />
                            <span>{user.username}</span>
                        </div>
                        <button onClick={() => handleAddUser(user)}>Add User</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddUser;

