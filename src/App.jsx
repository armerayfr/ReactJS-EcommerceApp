import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

/* import components */
import Home from "./pages/home";
import Admin from "./pages/admin";
import Cart from "./pages/cart";
import History from "./pages/history";
import ProductDetail from "./pages/productDetail";
import Login from "./pages/auth/login";
import Regis from "./pages/auth/regis";
import MyNavbar from "./component/MyNavbar";

class App extends React.Component {
  render() {
    return (
      // <div>
      //   <h1>Ecommerce-App</h1>
      // </div>
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route component={Admin} path="/admin" />
          <Route component={Cart} path="/cart" />
          <Route component={History} path="/history" />
          <Route component={ProductDetail} path="/product-detail" />
          <Route component={Login} path="/login" />
          <Route component={Regis} path="/registration" />
          <Route component={Home} path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
