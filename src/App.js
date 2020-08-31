import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import Header from './components/Header/Header'
import Quiz from './pages/Quiz'
import Scoreboard from './pages/Scoreboard'


function App() {

  return (
      <HashRouter basename="/">
          <Header />
          <Route exact path="" component={Quiz} />
          <Route path="/scores" component={Scoreboard} />
      </HashRouter>
  )
}

export default App;