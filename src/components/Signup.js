import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { updateAuthData } from "../actions/useractions";
import { withRouter } from "../withRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/common.css";
import "../styles/signUp.css";
import { validatePhonenumber, validateEmail } from "../actions/commonFunctions";

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
    if (
      userName === "" ||
      userPassword === "" ||
      userEmail === "" ||
      userPhonNo === "" ||
      userAddress === "" ||
      userRole === ""
    ) {
      toast.error("Please Enter all the fields",{
        autoClose: 2000
      })
    } else if (!validateEmail(userEmail)) {
      toast.error("Please Enter valid Email", {
        autoClose: 2000,
      });
    } else if (!validatePhonenumber(userPhonNo)) {
      toast.error("Please Enter valid Phone Number", {
        autoClose: 2000,
      });
    } else {
      axios
      .post("http://localhost:8000/api/register", data, {
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
            userEmail = "",
          } = {},
          auth,
        } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("user_id", userId);
        this.setState(
          {
            isauthenticated: auth,
            userRole,
          },
          () => {
            this.props.navigate("/e-commerce");
            this.props.updateAuthData({
              isauthenticated: auth,
              userRole,
              userId,
              userName,
              userAddress,
              userEmail,
              phoneNumber: userPhonNo,
            });
          }
        );
      });
    }
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
        <ToastContainer />
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
            <div className="button_wrap">
              <button
                type="Submit"
                className="login_button cursor_pointer"
                onClick={() => {
                  this.handleRegister();
                }}
              >
                Submit
              </button>
            </div>
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

export default withRouter(connect(null, mapDispatchToProps)(Signup));
