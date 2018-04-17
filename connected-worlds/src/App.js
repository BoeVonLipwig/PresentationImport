import React, { Component } from 'react';
import Cytoscape from './components/Cytoscape';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <Cytoscape />
        <BottomBar />
      </div>
    );
  }
}

export default App;
