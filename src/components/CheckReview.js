import React, { Component } from "react";
import Table from "./Table";
import axios from "axios";
import { withRouter } from "../withRouter";

class CheckReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            allReviews: this.fetchReviews()
        }
    }
    fetchReviews() {
        const {prodId = "" } = this.props.location.state;
        axios
        .get(`http://localhost:8000/api/getAllReviews/${prodId}`)
        .then((response) => {
            this.setState({
                allReviews: response.data
            })
        })
    }
  render() {
    const {allReviews = []} = this.state;
    const header = ["Rating", "Review"];
    return (
      <div className="common_bg justify_content padding_36">
        <div className="white_bg padding_36">
          {allReviews?.length ? <Table
            header={header}
            tableData={allReviews}
            ordertrack={true}
          />: "No reviews for this Order"}
        </div>
      </div>
    );
  }
}

export default withRouter(CheckReview);