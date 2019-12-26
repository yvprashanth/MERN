import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import MyNavbar from './components/MyNavbar'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import Learnmore from './components/Learnmore'
import Posts from './components/Posts'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MyNavbar />
          <Switch>
            <Route exact path='/' render={() => <Home />} />
            <Route path='/post/create' render={() => <CreatePost />} />
            <Route path='/post/update/:id' render={() => <CreatePost />} />
            <Route path='/learnmore' render={() => <Learnmore />} />
            <Route path='/posts' render={() => <Posts />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({categories}){
  return { categories : categories }
}

export default connect(mapStateToProps)(App);