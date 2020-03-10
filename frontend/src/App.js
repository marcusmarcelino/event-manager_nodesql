import React from 'react';
import './App.css';
import Routes from './routes';

function App() {
  return (
    <>
      <header className="content-logo">
        <h1>Event Manager</h1>
      </header>
      <div className="content">
        <Routes />
      </div>
    </>
  );
}

export default App;