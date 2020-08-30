import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Quiz from './pages/Quiz'
import Scoreboard from './pages/Scoreboard'


function App() {

  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Quiz} />
          <Route exact path="/scores" component={Scoreboard} />
        </Switch>
      </Router>
  )
}

export default App;