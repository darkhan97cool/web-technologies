import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from "./Home";
import ContactList from "./ContactList";
import TodoApp from "./TodoApp";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/ContactList">ContactList</Link></li>
              <li><Link to="/TodoApp">TodoApp</Link></li>
            </ul>
            <hr/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/ContactList" component={ContactList}/>
            <Route exact path="/TodoApp" component={TodoApp}/>
          </div>
        </Router>
        
      </div>
    );
  }
}

export default App;
