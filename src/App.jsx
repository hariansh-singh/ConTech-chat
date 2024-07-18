import React from 'react';
import List from './components/List/List';
import Chat from './components/Chat/Chat';
import Detail from './components/Detail/Detail';
import Login from './components/Login/Login';
import Notification from './components/Notification/Notification';

function App() {

  const user = true

  return (
    <div className='container'>
      {
        user ? (
          <>
            <List />
            <Chat />
            <Detail />
          </>

        ) : (<Login />)
      }
      
      <Notification />

    </div>
  );
}

export default App;
