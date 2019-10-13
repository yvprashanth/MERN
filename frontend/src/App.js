import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import MyNavbar from './components/MyNavbar'
import Home from './components/Home'
import CreatePost from './components/CreatePost'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MyNavbar />
          <Route exact path='/' render={() => <Home />} />
          <Route path='/createpost' render={() => <CreatePost />} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps({categories}){
  return { categories : categories }
}

export default connect(mapStateToProps)(App);