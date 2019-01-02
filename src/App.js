import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Routes/>
        </header>
      </div>
    );
  }
}

export default App;
