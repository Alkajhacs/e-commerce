import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { updateAuthData } from "../actions/useractions";
import "../styles/common.css";
import "../styles/signUp.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      userName: "",
      userPhonNo: "",
      userAddress: "",
      userRole: "",
      isauthenticated: false,
      hasRole: "",
    };
  }

  handleRegister = () => {
    const {
      userName = "",
      userPassword = "",
      userEmail = "",
      userPhonNo = "",
      userAddress = "",
      userRole = "",
    } = this.state;
    const data = JSON.stringify({
      userEmail,
      userPassword,
      userName,
      userPhonNo,
      userAddress,
      userRole,
    });
    axios
      .post("http://localhost:8000/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { token = "", result: { role = "" } = {}, auth } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        this.setState(
          {
            isauthenticated: auth,
            hasRole: role,
          },
          () => {
            this.props.updateAuthData({
              isauthenticated: auth,
              hasRole: role,
            });
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      userName = "",
      userPassword = "",
      userEmail = "",
      userPhonNo = "",
      userAddress = "",
    } = this.state;
    return (
      <div className="common_bg padding_36">
        <div className=" sign_up">
          <div className="padding_36 ">
            <div className="login_input">
              Enter Email * :
              <input
                className="signup_input"
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
                className="signup_input"
                type="password"
                vlaue={userPassword}
                onChange={(event) =>
                  this.setState({ userPassword: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Enter Name * :
              <input
                className="signup_input"
                type="text"
                vlaue={userName}
                onChange={(event) =>
                  this.setState({ userName: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Enter Phone No * :
              <input
                className="signup_input"
                type="text"
                vlaue={userPhonNo}
                onChange={(event) =>
                  this.setState({ userPhonNo: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Enter Address * :
              <input
                className="signup_input"
                type="text"
                vlaue={userAddress}
                onChange={(event) =>
                  this.setState({ userAddress: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Choose Role :
              <div>
                <input
                  type="radio"
                  name="role"
                  value="Admin"
                  onChange={(event) =>
                    this.setState({ userRole: event.target.value })
                  }
                />
                Admin
              </div>
              <div>
                <input
                  type="radio"
                  name="role"
                  value={"User"}
                  onChange={(event) =>
                    this.setState({ userRole: event.target.value })
                  }
                />
                User
              </div>
            </div>
            <Link to="/e-commerce">
              <div className="button_wrap">
                <button
                  type="Submit"
                  className="login_button"
                  onClick={() => {
                    this.handleRegister();
                  }}
                >
                  Submit
                </button>
              </div>
            </Link>

            <div className="button_wrap fw_500">
              If already have an account , Please &nbsp;
              <Link to="/login"> Sign In </Link>
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
export default connect(null, mapDispatchToProps)(Signup);
