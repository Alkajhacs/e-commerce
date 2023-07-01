import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { withRouter } from "../withRouter";
import Table from "./Table";

class OrderUpdate extends Component {
  constructor(props) {
    super(props);
    const isAdmin = localStorage.getItem("role") === "Admin";
    this.state = {
      orderStatus: isAdmin ? "" : "Cancelled",
      currentOrderStatus: []
    };
  }

  componentDidMount() {
    this.fetchAllOrders();
  }

  fetchAllOrders() {
    const { orderId = "", prodId = "" } = this.props?.location?.state || this.props;
    axios
      .get(`http://localhost:8000/api/getAllStatus/${orderId}/${prodId}`)
      .then((response) => {
        this.setState({
            currentOrderStatus: response.data,
        });
      });
  }
  handleUpdate() {
    const { orderStatus = "" } = this.state;
    const { orderId = "", prodId = "" } = this.props.location.state;
    const userId = localStorage.getItem("user_id");
    const data = JSON.stringify({
      orderId,
      prodId,
      userId,
      orderStatus,
    });
    axios
      .post("http://localhost:8000/api/orderUpdate", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data, {
          autoClose: 3000,
        });
      });
  }
  render() {
    const { orderStatus = "", currentOrderStatus = [] } = this.state;
    const isAdmin = localStorage.getItem("role") === "Admin";
    const header = ["Order Id", "Order status", "Updated On", "Updated by", "Product Id"];
    const isDelivered = ["Delivered", "delivered"].includes(currentOrderStatus?.[currentOrderStatus.length -1]?.order_status);
    return (
      <div className="common_bg justify_content padding_36">
        <ToastContainer />
        <div className="white_bg padding_36">
        {!!currentOrderStatus?.length && <Table header={header} tableData={currentOrderStatus} ordertrack={true} />}
          {!isDelivered && <div>
            <br></br> 
            Order Status
            <input
              value={orderStatus}
              className="ml_16 padding_5"
              onChange={(event) =>
                this.setState({ orderStatus: event.target.value })
              }
              disabled= {!isAdmin}
            />
          </div>}
          <br />
          {!isDelivered && <div className="profile_button">
            <button
              className="add_product profile_button"
              onClick={() => {
                this.handleUpdate();
              }}
              disabled= {!orderStatus}
            >
              {isAdmin ? "Update status" : "Cancel Order"}
            </button>
          </div>}
        </div>
      </div>
    );
  }
}

export default withRouter(OrderUpdate);
