import React from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import RedirectPage from "../components/RedirectPage";
import Dashboard from "../components/Dashboard";
import NotFoundPage from "../components/NotFoundPage";

const AppRouter = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="main">
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/redirect" component={RedirectPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFoundPage} />
        </Switch>
      </div> 
    </BrowserRouter>
  );
};

export default AppRouter;