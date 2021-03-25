import React, { useState } from 'react';
import './App.css';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import PlayComponent from './Components/PlayComponent/PlayComponent';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (<div className="App-container">
      <div className="App">
        <LoginComponent setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>)
  }

  return (<div className="App-container">
    <div className="App">
      <PlayComponent setIsLoggedIn={setIsLoggedIn} />
    </div>
  </div>)
}


export default App;
