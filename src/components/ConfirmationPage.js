import React, { Component } from "react";
import { withRouter } from "../withRouter";
import "../styles/confirmation.css";

class ConfirmationPage extends Component {
  render() {
    const { allCartProducts = [], eachProdQuant = {} } =
      this.props.location.state;
    return (
      <div className="common_bg confirm_body">
        <div className="white_bg payment_det">
          <div className="justify_center">
            <h2 className="">Order Confirmation</h2>
          </div>
          <hr></hr>
          <br />
          <div>
            Your Order for{" "}
            {allCartProducts?.length > 1
              ? `${allCartProducts?.length} items`
              : "1 item"}{" "}
            is confirmed and will be delivered <strong>within 3 days.</strong>
          </div>
          <div>Thanks for shopping with us : {")"}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(ConfirmationPage);
