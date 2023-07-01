import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";
import { withRouter } from "../withRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class OrderTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatus: [],
      isreturn: false,
      returninitiated: false,
      returnReason: "",
    };
  }

  componentDidMount() {
    this.fetchAllOrders();
  }

  handleReturn() {
    const { orderId = "", prodId = "" } = this.props?.location?.state;
    const { returnReason = "" } = this.state;
    const userId = localStorage.getItem("user_id");
    const data = JSON.stringify({ orderId, userId, prodId, returnReason });
    axios
      .post("http://localhost:8000/api/returnItem", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data, { autoClose: 3000 });
        const updateData = JSON.stringify({
          orderId,
          prodId,
          userId,
          orderStatus: "Return requested",
        });
        axios.post("http://localhost:8000/api/orderUpdate", updateData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.setState({
          isreturn: false,
          returninitiated: true,
          returnReason: "",
        });
      });
  }

  fetchAllOrders() {
    const { orderId = "", prodId = "" } = this.props?.location?.state;
    axios
      .get(`http://localhost:8000/api/getAllStatus/${orderId}/${prodId}`)
      .then((response) => {
        this.setState({
          orderStatus: response.data,
        });
      });
  }

  render() {
    const header = [
      "Order Id",
      "Order status",
      "Updated On",
      "Updated by",
      "Product Id",
    ];
    const {
      orderStatus = [],
      isReturn = false,
      returnReason = "",
    } = this.state;
    return (
      <div className="common_bg padding_36">
        <ToastContainer />
        {orderStatus.length ? (
          <Table header={header} tableData={orderStatus} ordertrack={true} />
        ) : (
          "Your order will be dispatched soon"
        )}
        {["Delivered", "delivered"].includes(
          orderStatus?.[orderStatus.length - 1]?.order_status
        ) && (
          <div className="margin_36">
            <button
              type="Submit"
              className="login_button cursor_pointer"
              onClick={() => {
                this.setState({ isReturn: true });
              }}
              disabled={isReturn}
            >
              Return product
            </button>
          </div>
        )}
        {isReturn && (
          <div className="login_input w_38">
            Enter Return Reason :
            <textarea
              value={returnReason}
              className="w-58"
              onChange={(event) => {
                this.setState({ returnReason: event.target.value });
              }}
              required
            />
          </div>
        )}
        {returnReason && (
          <button
            type="Submit"
            className="login_button cursor_pointer"
            onClick={() => {
              this.handleReturn();
            }}
          >
            Submit
          </button>
        )}
      </div>
    );
  }
}

export default withRouter(OrderTrack);
