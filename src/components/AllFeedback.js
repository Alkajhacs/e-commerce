import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";

class AllFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFeedback: [],
    };
  }

  componentDidMount() {
    this.fetchAllFeedback();
  }

  fetchAllFeedback() {
    axios.get("http://localhost:8000/api/getFeedback").then((response) => {
      this.setState({
        allFeedback: response.data,
      });
    });
  }

  render() {
    const { allFeedback = [] } = this.state;
    const header = [
      "Feedback Id",
      "User Id",
      "Feedback"
    ];
    return (
      <div className="common_bg padding_36">
        <Table
          header={header}
          tableData={allFeedback}
          isOrders={false}
        />
      </div>
    );
  }
}
export default AllFeedback;
