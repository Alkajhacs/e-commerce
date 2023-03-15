import React, { Component } from "react";
import "../styles/login.css";
import "../styles/common.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateAuthData } from "../actions/useractions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPassword: "",
      isauthenticated: false,
      userRole: "",
    };
  }

  handleLogin = () => {
    const {
      userName = "",
      userPassword = "",
      isauthenticated = false,
    } = this.state;
    const data = JSON.stringify({
      userName,
      userPassword,
    });
    axios
      .post("http://localhost:8000/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const {
          token = "",
          result: {
            userRole = "",
            userId = "",
            userName = "",
            userAddress = "",
          } = {},
          auth = false,
        } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        this.setState(
          {
            isauthenticated: auth,
            userRole: userRole
          },
          () => {
            this.props.updateAuthData({
              isauthenticated: auth,
              userRole: userRole,
              userId,
              userName,
              userAddress
            });
            if (isauthenticated) {
              this.props.history.push("/e-commerce");
            }
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { userName = "", userPassword = "" } = this.state;
    return (
      <div className="login_bg">
        <div className="login">
          <div className="padding_36">
            <div className="login_input">
              Enter Email * :
              <input
                className="text_input"
                value={userName}
                onChange={(event) =>
                  this.setState({ userName: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Enter Password * :
              <input
                className="text_input"
                type="password"
                vlaue={userPassword}
                onChange={(event) =>
                  this.setState({ userPassword: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="button_wrap">
              <button
                type="Submit"
                className="login_button"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Submit
              </button>
            </div>
            <div className="button_wrap fw_500">
              If new user , Please &nbsp;<Link to="/Signup"> Sign Up </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuthData: (data) => dispatch(updateAuthData(data)),
  };
};
export default connect(null, mapDispatchToProps)(Login);
