import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrders: [],
    };
  }

  componentDidMount() {
    console.log("testing");
    this.fetchAllOrders();
  }

  fetchAllOrders() {
    const userId = localStorage.getItem("user_id");
    const userRole = localStorage.getItem("role");
    console.log("hello");
    if (userRole === "Admin") {
      axios
        .get(`http://localhost:8000/api/getAllOrders/${userId}`)
        .then((response) => {
          this.setState({
            allOrders: response.data,
          });
        });
    } else {
      axios.get("http://localhost:8000/api/getAllOrders").then((response) => {
        this.setState({
          allOrders: response.data,
        });
      });
    }
  }

  handleCancelOrder(orderId) {
    axios
      .put(`http://localhost:8000/api/updateOrder/${orderId}`)
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
    const { allOrders = [] } = this.state;
    const header = [
      "Order Id",
      "Product Id",
      "Delivery Address",
      "Order Date",
      "Quantity",
      "Price Per Item",
      "Total Price",
      "Order Status",
      "Action",
    ];
    return (
      <div className="common_bg padding_36">
        <ToastContainer />
        <Table
          header={header}
          tableData={allOrders}
          handleActionButton={this.handleCancelOrder}
          isOrders={true}
        />
      </div>
    );
  }
}
