import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/navbar/navbar.component';
import Landing from './components/Landing/Landing.component';
import Login from './components/Auth/Login.component';
import Signup from './components/Auth/Signup.component';
import './App.css';


const App = () => {
  return (
    <Router>
      <div>
        <NavBar/>
        <Route exact path="/" component={Landing}/>
        <div className="container">
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
