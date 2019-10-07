import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import MyNavbar from './components/MyNavbar'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MyNavbar />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
          </header>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({categories}){
  return { categories : categories }
}

export default connect(mapStateToProps)(App);
