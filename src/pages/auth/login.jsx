import React from "react";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../../redux/actions/user";
import { connect } from "react-redux";

class Login extends React.Component {
  //2. membuat state
  state = {
    username: "",
    password: "",
  };

  //3. function merubah local state
  inputHandler = (event) => {
    //mengambil nilai apa yang diketik
    const value = event.target.value;
    //mengetik di bagian mana
    const name = event.target.name;
    //merubah state dengan nilai yang diketik merujuk ke name
    this.setState({ [name]: value });
  };

  //1. membuat UI
  render() {
    if (this.props.userGlobal.id) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Log in now!</h1>
            <p className="lead">
              Log in now and start shopping in the most affordable ecommerce
              platform
            </p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-4 offset-4">
            {this.props.userGlobal.errorMsg ? (
              <div className="alert alert-danger">
                {this.props.userGlobal.errorMsg}
              </div>
            ) : null}
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Log in</h5>
                <input
                  onChange={this.inputHandler}
                  name="username"
                  placeholder="Username"
                  type="text"
                  className="form-control my-2"
                />
                <input
                  onChange={this.inputHandler}
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control my-2"
                />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button
                    onClick={() => this.props.loginUser(this.state)}
                    className="btn btn-primary mt-2"
                  >
                    Login
                  </button>
                  <Link to="/register">Or register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
