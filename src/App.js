import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Home from "./page/Home";
import Login from "./page/Login";
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
// import Dashboard from "./page/Dashboard";
import Vehicle from "./page/Vehicle";

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <div className="header">

          <NavLink  activeClassName="active" to="/home"> Home &nbsp; </NavLink>
          <NavLink activeClassName="active" to="/login"> &nbsp; Login &nbsp; </NavLink>
   
          <NavLink exact activeClassName="active" to="/"> Vehicle  </NavLink> 
        </div>

        <div className="content">
          <Switch>
            <PrivateRoute path="/home" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <Route exact path="/" component={Vehicle} /> 
          </Switch>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
