import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";

class App extends Component {
    constructor(store) {
        super(store);
    }
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
