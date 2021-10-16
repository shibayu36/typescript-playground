import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { EffectOrder } from "./EffectOrder";

const Home: React.FC = () => {
  console.log("Home rendering");
  const { user, loginWithRedirect, logout } = useAuth0();
  return (
    <header className="App-header" ref={(ref) => console.log("Home ref", ref)}>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      <Link className="App-link" to="/effect-order">
        effect order
      </Link>

      {user ? (
        <>
          <p>{user.name}</p> <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </header>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route strict exact path="/effect-order">
            <EffectOrder />
          </Route>
          <Route strict exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
