import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import MangeCategory from "./admin/MangeCategory";
import UpdateProduct from "./admin/UpdateProduct";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Cart from "./core/Cart";
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
        <Route path="/cart" exact component={Cart} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        
        < AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />

        < AdminRoute path="/admin/create/category" exact component={AddCategory}/>

        < AdminRoute path="/admin/categories" exact component={MangeCategory}/>
        
        < AdminRoute path="/admin/create/product" exact component={AddProduct}/>

        < AdminRoute path="/admin/products" exact component={ManageProducts}/>

        < AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
