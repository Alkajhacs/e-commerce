import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/myProfile.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    const {
      userName = "",
      userAddress = "",
      phoneNumber = "",
      userEmail = "",
    } = props;
    this.state = {
      stateUserName: userName,
      stateUserAddress: userAddress,
      statePhoneNumber: phoneNumber,
      stateUserEmail: userEmail,
      isEdit: false,
    };
  }

  handleEdit() {
    this.setState({
      isEdit: true,
    });
  }

  handleSubmit() {
    const userId = localStorage.getItem("user_id");
    const {
      stateUserName = "",
      stateUserEmail = "",
      statePhoneNumber = "",
      stateUserAddress = "",
    } = this.state;
    const data = JSON.stringify({
      stateUserName,
      stateUserEmail,
      statePhoneNumber,
      stateUserAddress,
    });
    axios
      .put(`http://localhost:8000/api/setuser/${userId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data, {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.error(error, {
          autoClose: 3000,
        });
      });
  }

  render() {
    const {
      stateUserName = "",
      stateUserEmail = "",
      statePhoneNumber = "",
      stateUserAddress = "",
      isEdit = false,
    } = this.state;
    return (
      <div className="common_bg justify_content padding_36">
        <ToastContainer />
        <div className="white_bg padding_36">
          <div>
            Name :
            <input
              value={stateUserName}
              className="ml_16 padding_5"
              disabled={!isEdit}
              onChange= {(event) => this.setState({stateUserName: event.target.value})}
            />
          </div>
          <br />
          <div>
            E-Mail :
            <input
              value={stateUserEmail}
              className="ml_16 padding_5"
              disabled={!isEdit}
              onChange= {(event) => this.setState({stateUserEmail: event.target.value})}
            />
          </div>
          <br />
          <div>
            Phone Number :
            <input
              value={statePhoneNumber}
              className="ml_16 padding_5"
              disabled={!isEdit}
              onChange= {(event) => this.setState({statePhoneNumber: event.target.value})}
            />
          </div>
          <br />
          <div>
            Address :
            <input
              value={stateUserAddress}
              className="ml_16 padding_5"
              disabled={!isEdit}
              onChange= {(event) => this.setState({stateUserAddress: event.target.value})}
            />
          </div>
          {!isEdit && (
            <div className="profile_button">
              <button
                className="add_product profile_button"
                onClick={() => {
                  this.handleEdit();
                }}
              >
                Edit
              </button>
            </div>
          )}
          {isEdit && (
            <div className="profile_button">
              <button
                className="add_product profile_button"
                onClick={() => {
                  this.handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    userAddress: state.userAddress,
    phoneNumber: state.phoneNumber,
    userEmail: state.userEmail,
  };
};

export default connect(mapStateToProps)(MyProfile);
