import React, { Component } from "react";
import { withRouter } from "../withRouter";
import { connect } from "react-redux";
import DialogBox from "./DialogBox";
import "../styles/payment.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "",
      cardHolder: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      showConfirmDialog: false,
      userAddress: props.userAddress || "",
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.fetchCardDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.userAddress !== this.props.userAddress){
      this.setState({
        userAddress: this.props.userAddress
      })
    }
  }

  fetchCardDetails() {
    const userId = localStorage.getItem("user_id") || "";
    axios.get(`http://localhost:8000/api/card/${userId}`).then((response) => {
      const cardDetails = response.data?.[0];
      const {
        card_number = "",
        card_holder = "",
        card_expiry = "",
      } = cardDetails || {};
      this.setState({
        cardHolder: card_holder,
        cardNumber: card_number,
        cardExpiry: card_expiry,
      });
    });
  }

  handleClose() {
    this.setState({
      showConfirmDialog: false,
    });
  }
  handleConfirmPayment() {
    this.setState({ showConfirmDialog: true });
  }

  saveCardDetails() {
    const userId = localStorage.getItem("user_id") || "";
    const { cardHolder = "", cardNumber = "", cardExpiry = "" } = this.state;
    const data = JSON.stringify({
      card_user_id: userId,
      cardHolder,
      cardNumber,
      cardExpiry,
    });
    axios
      .post("http://localhost:8000/api/card", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
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

  handleConfirm = () => {
    this.setState({
      showConfirmDialog: false,
    }, () => {
      this.props.navigate("/confimationPage")
    });
  }

  render() {
    const {
      paymentMethod = "",
      cardHolder = "",
      cardNumber = "",
      cardExpiry = "",
      cardCvv = "",
      showConfirmDialog = false,
      userAddress = this.props.userAddress || "",
    } = this.state;
    const {
      allCartProducts = [],
      eachProdQuant = {},
      fromPage = "",
      currentPrdCount = 0,
    } = this.props.location.state;
    let totalPrice = 0;
    return (
      <div className="white_bg">
        <ToastContainer />
        <div className="padding_36">
          <h2 className="brand mt_0">Payment Information</h2>
          {allCartProducts.map((eachproduct) => {
            const {
              title = "",
              discount = "",
              price = "",
              prd_id = "",
            } = eachproduct || {};
            const quantity =
              fromPage === "cartDetail"
                ? eachProdQuant?.[prd_id]
                : currentPrdCount;
                totalPrice += ((price - price * (discount / 100)) * quantity) 
            return (
              <div>
                <strong>Ordered Item</strong>
                <br />
                {title}
                <br />
                <strong className="product__price">
                  Quantity : {quantity}{" "}
                </strong>
                <br />
                <div className="product__price">
                  <div>
                    <strong className="color_red">Total Price : </strong>
                    <strike>₹{price * quantity}</strike>
                    &nbsp;&nbsp;₹
                    {(price - price * (discount / 100)) * quantity}
                    &nbsp;&nbsp;<strong>(Discount {discount}%)</strong>
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          })}
          <div className="payment_input">
            Choose Payment Method :
            <div className="pl_16">
              <input
                type="radio"
                name="payment"
                value="onlinePayment"
                onChange={(event) =>
                  this.setState({ paymentMethod: event.target.value })
                }
              />
              Online Payment
            </div>
            <div className="pl_16">
              <input
                type="radio"
                name="payment"
                value="cashPayment"
                onChange={(event) =>
                  this.setState({ paymentMethod: event.target.value })
                }
              />
              Cash On Delivery
            </div>
          </div>
          {paymentMethod === "onlinePayment" && (
            <div>
              <div className="login_input">
                Enter CardHolder Name * :
                <input
                  className="signup_input"
                  type="text"
                  value={cardHolder}
                  onChange={(event) =>
                    this.setState({ cardHolder: event.target.value })
                  }
                  autoComplete="off"
                  required
                ></input>
              </div>
              <div className="login_input">
                Enter Card Number * :
                <input
                  className="signup_input"
                  type="text"
                  value={cardNumber}
                  onChange={(event) =>
                    this.setState({ cardNumber: event.target.value })
                  }
                  autoComplete="off"
                  required
                ></input>
              </div>
              <div className="login_input">
                Choose Expire date of card * :
                <input
                  className="signup_input"
                  type="text"
                  value={cardExpiry}
                  onChange={(event) =>
                    this.setState({ cardExpiry: event.target.value })
                  }
                  autoComplete="off"
                  required
                ></input>
              </div>
              <div className="login_input">
                Enter Card CVV * :
                <input
                  className="signup_input"
                  type="text"
                  value={cardCvv}
                  onChange={(event) =>
                    this.setState({ cardCvv: event.target.value })
                  }
                  autoComplete="off"
                  required
                ></input>
              </div>
            </div>
          )}
          <hr></hr>
          <div className="login_input">
            Delivery Address * :
            <textarea
              className="signup_textarea"
              value={userAddress}
              onChange={(event) =>
                this.setState({ userAddress: event.target.value })
              }
              autoComplete="off"
              required
            ></textarea>
          </div>
          <div className="flex_justify_between">
            {paymentMethod === "onlinePayment" && (
              <button
                className="add_product"
                onClick={() => {
                  this.saveCardDetails();
                }}
              >
                Save Card Details
              </button>
            )}
            <button
              className="add_product"
              onClick={() => this.handleConfirmPayment()}
            >
              Confirm Payment
            </button>
          </div>
        </div>
        {showConfirmDialog && (
          <DialogBox
            showConfirmDialog={showConfirmDialog}
            handleClose={this.handleClose}
            title="Confirm payment"
            content= {`Do you want to confirm your payment of Rs ${totalPrice}`}
            showCancel={true}
            confirmButtonText="Confirm"
            handleConfirm={this.handleConfirm}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartCount: state.cartCount,
    userAddress: state.userAddress,
  };
};
export default withRouter(connect(mapStateToProps)(PaymentPage));
