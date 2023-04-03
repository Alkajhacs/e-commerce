import React, { Component } from 'react'
import axios from "axios";
import Table from "./Table";

export default class AllPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
          AllPayment: [],
        };
      }
    
      componentDidMount() {
        this.fetchAllFeedback();
      }
    
      fetchAllFeedback() {
        axios.get("http://localhost:8000/api/getPaymentDet").then((response) => {
          this.setState({
            AllPayment: response.data,
          });
        });
      }

  render() {
    const { AllPayment = [] } = this.state;
    const header = [
      "Payment Id",
      "Order Id",
      "User Id",
      "Razor Payment Id",
      "Amount"
    ];
    return (
      <div className="common_bg padding_36">
        <Table
          header={header}
          tableData={AllPayment}
          isOrders={false}
        />
      </div>
    );
  }
}
