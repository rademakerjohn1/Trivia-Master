import React from 'react';
import { Route } from "react-router-dom";
import Header from './components/Header/Header'
import Quiz from './pages/Quiz'
import Scoreboard from './pages/Scoreboard'


function App() {

  return (
    <div>
      <Route exact path="/" component={Quiz} />
      <Route path="/scores" component={Scoreboard} />
    </div>
  )
}

export default App;