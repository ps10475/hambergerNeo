import React from 'react';
import logo from './logo.svg';
import appCss from  './App.module.scss';

function App() {
  return (
    <div className={appCss.App}>
      <header className={appCss.AppHeader}>
        <img src={logo} className={appCss.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={appCss.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
