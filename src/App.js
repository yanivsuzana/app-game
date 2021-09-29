import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./components/Home.js";
import GuessWord from "./components/GuessWord.js";
import GameOver from "./components/GameOver.js";


export default function App() {
  return (
      <Router>
        <div>
          <Switch>
              <Route   path="/" exact component={Home}/>
              <Route   path="/GuessWord" exact component={GuessWord}/>
              <Route   path="/GameOver" exact component={GameOver}/>
          </Switch>
        </div>
      </Router>
  );
}


