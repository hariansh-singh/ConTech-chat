// import React, { useState } from 'react';
// import './login.css';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// function Login({ onLogin }) { // Ensure `onLogin` is used here
//   const [avatar, setAvatar] = useState({ file: null, url: '' });

//   const handleAvatar = (e) => {
//     e.preventDefault();
//     if (e.target.files[0]) {
//       setAvatar({
//         file: e.target.files[0],
//         url: URL.createObjectURL(e.target.files[0])
//       });
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       localStorage.setItem('token', response.data.token);
//       toast.success('Welcome back!');
//       onLogin(); // Update parent component on successful login
//     } catch (error) {
//       toast.error('Login failed. Please try again.');
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const username = e.target.username.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
//       toast.success('Account created successfully!');
//     } catch (error) {
//       toast.error('Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className='login'>
//       <div className="item">
//         <h2>Welcome back!</h2>
//         <form onSubmit={handleLogin}>
//           <input type="email" placeholder='Email' name='email' />
//           <input type="password" placeholder='Password' name='password' />
//           <button type="submit">Sign In</button> {/* Ensure `type="submit"` */}
//         </form>
//       </div>

//       <div className="separator"></div>
//       <div className="item">
//         <h2>Create an Account</h2>
//         <form onSubmit={handleSignUp}>
//           <label htmlFor="file">
//             <img src={avatar.url || "./avatar.png"} alt="" />
//             Upload an Image
//           </label>
//           <input type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
//           <input type="text" placeholder='Username' name='username' />
//           <input type="email" placeholder='Email' name='email' />
//           <input type="password" placeholder='Password' name='password' />
//           <button type="submit">Sign Up</button> {/* Ensure `type="submit"` */}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import './login.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login({ onLogin }) {
  const [avatar, setAvatar] = useState({ file: null, url: '' });

  const handleAvatar = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      toast.success('Welcome back!');
      onLogin(); // Update parent component on successful login
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className='login'>
      <div className="item">
        <h2>Welcome back!</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='Email' name='email' />
          <input type="password" placeholder='Password' name='password' />
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignUp}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an Image
          </label>
          <input type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
          <input type="text" placeholder='Username' name='username' />
          <input type="email" placeholder='Email' name='email' />
          <input type="password" placeholder='Password' name='password' />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
