import React from 'react';
import './App.css';
import Routes from './routes';
import Aside from './components/Layout/Aside';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <>
      <div className="grid">
        <Header />
        <Aside />
        <div className="main">
          <Routes />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;