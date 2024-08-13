import React from 'react';
import { useState } from 'react';
import List from './components/List/List';
import Chat from './components/Chat/Chat';
import Detail from './components/Detail/Detail';
import Login from './components/Login/Login';
import Notification from './components/Notification/Notification';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='container'>
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login onLogin={() => setUser(true)} /> // Ensure the `onLogin` function is passed
      )}
      <Notification />
    </div>
  );
}

export default App;
