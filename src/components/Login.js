import React, { Component } from "react";
import "../styles/login.css";
import "../styles/common.css";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPassword: "",
    };
  }

  handleLogin = () => {
    const { userName = "", userPassword = "" } = this.state;
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
        console.log(response.data);
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
          </div>
        </div>
      </div>
    );
  }
}
