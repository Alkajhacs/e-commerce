import React, { Component } from "react";
import "../styles/login.css";
import "../styles/common.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateAuthData } from "../actions/useractions";
import { withRouter } from "../withRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      isauthenticated: false,
      userRole: "",
    };
  }

  handleLogin = () => {
    const {
      userEmail = "",
      userPassword = ""
    } = this.state;
    const data = JSON.stringify({
      userEmail,
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
            userEmail = ""
          } = {},
          auth = false,
        } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("user_id", userId);
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
              userAddress,
              userEmail
            });
            if (auth) {
              this.props.navigate("/e-commerce");
            }
            toast.success(response.data.message, {
              autoClose: 3000,
            });
          }
        );
      })
      .catch((error) => {
        toast.error(error, {
          autoClose: 3000,
        });
      });
  };

  render() {
    const { userEmail = "", userPassword = "" } = this.state;
    return (
      <div className="login_bg">
        <ToastContainer/>
        <div className="login">
          <div className="padding_36">
            <div className="login_input">
              Enter Email * :
              <input
                className="text_input"
                value={userEmail}
                onChange={(event) =>
                  this.setState({ userEmail: event.target.value })
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
export default withRouter(connect(null, mapDispatchToProps)(Login));
