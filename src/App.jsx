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
import { connect } from "react-redux";
import { userKeepLogin, checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmmerce");

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLogin(userData);
      this.props.getCartData(userData.id);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {
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
            <Route
              component={ProductDetail}
              path="/product-detail/:productId"
            />
            <Route component={Login} path="/login" />
            <Route component={Regis} path="/registration" />
            <Route component={Home} path="/" />
          </Switch>
        </BrowserRouter>
      );
    }
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
