import React from 'react';
import './App.css';
import Exchange from './Exchange';

function App() {
  return (
    <div className="App">
      <p>
        Currency Converter
      </p>
      <header className="App-header">
        <Exchange/>
      </header>
    </div>
  );
}

export default App;
