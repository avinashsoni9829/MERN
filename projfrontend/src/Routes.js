import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashBoard from "./user/AdminDashBoard";
import signin from "./user/Signin";
import signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/signup" exact component={signup} />

        <Route path="/signin" exact component={signin} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        
        < AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />


      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
