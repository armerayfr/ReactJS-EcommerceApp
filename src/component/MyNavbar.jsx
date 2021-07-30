import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/user";

import {
  Navbar,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
  NavbarText,
  UncontrolledDropdown,
} from "reactstrap";

class MyNavbar extends React.Component {
  render() {
    return (
      <div style={{ marginLeft: "50px", marginRight: "40px" }}>
        <Navbar color="light" light>
          <Link style={{ textDecoration: "none", color: "blueviolet" }} to="/">
            <NavbarBrand>Emmerce</NavbarBrand>
          </Link>
          <Nav>
            {this.props.userGlobal.username ? (
              <>
                <NavItem>
                  <NavbarText className="nav">
                    Hi, {this.props.userGlobal.username}
                  </NavbarText>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{ marginLeft: "25px" }}>
                    Pages
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/cart">
                        Cart({this.props.cartGlobal.cartList.length})
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/history">History</Link>
                    </DropdownItem>

                    {this.props.userGlobal.role === "admin" ? (
                      <DropdownItem>
                        <Link to="/admin">admin</Link>
                      </DropdownItem>
                    ) : null}
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.logoutUser}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <NavItem>
                <NavbarText>
                  <Link to="/login">Login</Link> |{" "}
                  <Link to="/registration">Register</Link>
                </NavbarText>
              </NavItem>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
    cartGlobal: state.cart,
  };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
