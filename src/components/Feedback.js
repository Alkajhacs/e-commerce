import React, { Component } from "react";
import axios from "axios";
import "../styles/feedback.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFeedback: "",
    };
  }

  handleSubmit = () => {
    const { userFeedback = "" } = this.state;
    const userId = localStorage.getItem("user_id");
    const data = JSON.stringify({
      userId,
      userFeedback,
    });
    axios
      .post("http://localhost:8000/api/feedback", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data, {
          autoClose: 3000,
        });
      });
  };

  render() {
    const { userFeedback = "" } = this.state;
    return (
      <div className="common_bg justify_center padding_36">
        <ToastContainer />
        <div className="white_bg width_body padding_36 tex_webkit_center">
          <h4 className="text_center mt_10">Please Enter Feedback Message </h4>
          <div className="w_100 feedback_msg">
            <textarea
              className="w_100 feedback_msg"
              onChange={(event) => {
                this.setState({ userFeedback: event.target.value });
              }}
            >
              {userFeedback}
            </textarea>
          </div>
          <button
            className="add_product justify_center mt_50 cursor_pointer"
            onClick={() => {
              this.handleSubmit();
            }}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    );
  }
}
