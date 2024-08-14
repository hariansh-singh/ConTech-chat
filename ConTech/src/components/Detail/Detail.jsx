// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import './detail.css'

// function Detail() {

//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear token from localStorage
//     navigate('/login'); // Redirect to the login page
//   };
  
//   return (
//     <div className='detail'>

//       <div className="user">

//         <img src="./avatar.png" alt="" />
//         <h2>Hariansh Singh</h2>
//         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>

//       </div>

//       <div className="info">

//         <div className="option">
//           <div className="title">
//             <span>Chat Settings</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>

//         <div className="option">
//           <div className="title">
//             <span>Privacy & Help</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>

//         <div className="option">

//           <div className="title">
//             <span>Shared Photos</span>
//             <img src="./arrowDown.png" alt="" />
//           </div>

//           <div className="photos">
//             <div className="photoItem">
//               <div className="photoDetail">

//                 <img src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                 <span>Cosmos_2024.png</span>
//               </div>
//               <img src="./download.png" alt="" className='icon'/>
//             </div>

//             <div className="photoItem">
//               <div className="photoDetail">

//                 <img src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                 <span>Cosmos_2024.png</span>
//               </div>
//               <img src="./download.png" alt="" className='icon'/>
//             </div>

//           </div>
//         </div>

//         <div className="option">
//           <div className="title">
//             <span>Shared Files</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>

//         <button>Block User</button>

//         <button className='logout'>Logout</button>

//       </div>

//     </div>
//   )
// }

// export default Detail

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './detail.css';

function Detail() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
  try {
    // Call the backend logout endpoint
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies in the request if needed
    });

    if (!response.ok) {
      // Log the error if the response status is not OK
      console.error('Logout failed with status:', response.status);
      const errorData = await response.json();
      console.error('Error details:', errorData);
      return;
    }

    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    navigate('/login');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Hariansh Singh</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>

          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>Cosmos_2024.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>Cosmos_2024.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button>Block User</button>

        <button className='logout' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Detail;
