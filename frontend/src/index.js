import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.css";
import "assets/css/demo.css";
import Login from "./views/Login/Login";
import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

function checkLogin() {
  if (!sessionStorage.getItem("loging_status")) {
    return (
      <div>
        {/* <Route path="/" component={Dashboard} />
       */}
        {indexRoutes.map((prop, key) => {
          return (
           <div>
              <Redirect to="/login" />
            <Route path={prop.path} key={key} component={prop.component} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <Redirect to="/login" />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hist}>
    <Switch>{checkLogin()}</Switch>
  </Router>,
  document.getElementById("root")
);
