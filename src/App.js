import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header/Header'
import Quiz from './pages/Quiz'
import Scoreboard from './pages/Scoreboard'


function App() {

  return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Quiz} />
          <Route exact path="/scores" component={Scoreboard} />
        </Switch>
      </Router>
  )
}

export default App;