import React from "react"
import './App.css';
import {Route} from 'react-router-dom'
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from './components/Details';
import Create from './components/Create';

function App() {
  return (
      <div className="App">
        {/* <h1>Henry Pokemon</h1> */}
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home}/>
        <Route path='/details/:id' component={Detail}/>
        <Route path='/create' component={Create}/>
      </div>
   
  );
}

export default App;
