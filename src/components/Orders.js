import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrders: [],
    };
  }

  componentDidMount() {
    this.fetchAllOrders();
  }

  fetchAllOrders() {
    const userId = localStorage.getItem("user_id");
    const userRole = localStorage.getItem("role");
    if (userRole === "User") {
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

  render() {
    const { allOrders = [] } = this.state;
    const header = [
      "User Id",
      "Order Id",
      "Product Id",
      "Delivery Address",
      "Order Date",
      "Quantity",
      "Price Per Item",
      "Total Price",
      "Product",
      "Order Status",
      "Action",
    ];
    return (
      <div className="common_bg padding_36">
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
