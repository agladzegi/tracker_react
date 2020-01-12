import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Result from './components/Result'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/result/:platform/:gamertag" component={Result} />
      </Switch>
    </Router>
  );
}

export default App
