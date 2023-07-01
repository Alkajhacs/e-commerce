import React, { Component } from "react";
import Table from "./Table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class AllReturns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allReturns: this.fetchReturnRequest(),
      action: "",
      showreason: false,
      reason: "",
      orderId: "",
      prodId: "",
      userId: "",
      requestId: "",
    };
  }

  fetchReturnRequest() {
    axios.get("http://localhost:8000/api/getAllRequests").then((response) => {
      this.setState({
        allReturns: response.data,
      });
    });
  }

  handleActionButton = (action, eachRow) => {
    const { ret_order_id, ret_prod_id, ret_user_id, request_id } = eachRow;
    this.setState({
      showreason: true,
      action,
      orderId: ret_order_id,
      prodId: ret_prod_id,
      userId: ret_user_id,
      requestId: request_id,
    });
  };

  handleSubmit() {
    const { action, reason, orderId, prodId, userId, requestId } = this.state;
    const data = JSON.stringify({
      orderId,
      prodId,
      statusReturn:
        action === "Approve" ? "Return Approved" : "Return Declined",
      reason,
    });
    const updateData = JSON.stringify({
      orderId,
      prodId,
      userId,
      orderStatus: action === "Approve" ? "Return Approved" : "Return Declined",
    });
    axios
      .post("http://localhost:8000/api/setStatus", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data, {
          autoClose: 3000,
        });
        axios
          .post("http://localhost:8000/api/orderUpdate", updateData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            toast.success(response.data, {
              autoClose: 3000,
            });
          });
        axios.delete(`http://localhost:8000/api/deleteReturn/${requestId}`);
      });
  }

  render() {
    const {
      allReturns = [],
      action = "",
      showreason = false,
      reason = "",
    } = this.state;
    const header = [
      "Request Id",
      "Order Id",
      "Product Id",
      "User Id",
      "Return Reason",
      "Action",
    ];
    return (
      <div className="common_bg padding_36">
        <ToastContainer />
        <div className="white_bg padding_36">
          <Table
            header={header}
            tableData={allReturns}
            isReturn={true}
            handleActionButton={this.handleActionButton}
          />
          <br />
          <br />
          {showreason && (
            <div className="align">
              <div>Enter {action} reason : </div>
              <textarea
                value={reason}
                className="ml_16 padding_5"
                onChange={(event) =>
                  this.setState({ reason: event.target.value })
                }
              />
            </div>
          )}
          <br />
          {showreason && (
            <div className="profile_button">
              <button
                className="add_product profile_button"
                onClick={() => {
                  this.handleSubmit();
                }}
                disabled={!reason}
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
