import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
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
      <div>
        <Navbar color="light" light>
          <NavbarBrand>Emmerce</NavbarBrand>
          <Nav>
            <NavItem>
              <NavbarText className="nav">
                Hi, {this.props.userGlobal.username}
              </NavbarText>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className={{ marginLeft: "20px" }}>
                Pages
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/cart">Cart</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/history">History</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/product-detail">Product Detail</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(MyNavbar);
