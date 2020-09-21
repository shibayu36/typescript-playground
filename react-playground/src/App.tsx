import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { EffectOrder } from "./EffectOrder";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route strict exact path="/effect-order">
            <EffectOrder />
          </Route>
          <Route strict exact path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                Learn React
              </a>
            </header>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
