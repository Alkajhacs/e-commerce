import React, { Component } from "react";
import { withRouter } from "../withRouter";
import { connect } from "react-redux";
import "../styles/payment.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCartCount } from "../actions/useractions";

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "",
      userAddress: props.userAddress || "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userAddress !== this.props.userAddress) {
      this.setState({
        userAddress: this.props.userAddress,
      });
    }
  }

  loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async handleConfirm(totalPrice = 0) {
    const {
      allCartProducts = [],
      fromPage = "",
      eachProdQuant = {},
      currentPrdCount = 0,
    } = this.props.location.state;
    const { phoneNumber = "", userEmail = "", userName } = this.props;
    const { userAddress = "", paymentMethod = "" } = this.state;
    const userId = localStorage.getItem("user_id") || "";
    if(paymentMethod !== "" && userAddress !== "") {
      const res = await this.loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load...");
        return;
      }
      const orderData = function (responseData) {
        const orderData = JSON.stringify({
          userOrdId: userId,
          totalPrice,
          orderStatus: "Confirmed",
          deliveryAddress: userAddress,
        });
        axios
          .post("http://localhost:8000/api/order", orderData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            // add order Items
            allCartProducts.map((el) => {
              const { prd_id = "", price } = el;
              const quantity =
                fromPage === "cartDetail"
                  ? eachProdQuant?.[prd_id]
                  : currentPrdCount;
              const orderItems = JSON.stringify({
                orderId: response.data.orderId,
                prodId: prd_id,
                quantity,
                pricePerItem: price,
              });
              axios
                .post("http://localhost:8000/api/order_items", orderItems, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((response) => {
                  axios
                    .delete(`http://localhost:8000/api/cart/${prd_id}/${userId}`)
                    .then(() => {
                      this.props.setCartCount({
                        cartCount:
                          this.props.cartCount > 1
                            ? this.props.cartCount - quantity
                            : 0,
                      });
                    })
                  toast.success(response.data, {
                    autoClose: 3000,
                  });
                });
            });
            // set payment details
            if (paymentMethod === "onlinePayment") {
              const paymentData = {
                orderCreationId: response.data.orderId,
                razorpayPaymentId: responseData.razorpay_payment_id,
                amount: `₹ ${totalPrice}`,
              };
              axios.post(
                `http://localhost:8000/api/payment/${userId}`,
                JSON.stringify(paymentData),
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
            }
          });
        this.props.navigate("/confimationPage", {
          state: { allCartProducts, eachProdQuant },
        });
      }.bind(this);
  
      const handler = function (responseData) {
        orderData(responseData);
      }.bind(this);
  
      if (paymentMethod === "onlinePayment") {
        const options = {
          key: "",
          currency: "INR",
          amount: totalPrice * 100,
          name: "E-Commerce (Online Shopping)",
          description: "Thanks for shopping with us!",
          prefill: {
            name: userName,
            email: userEmail,
            contact: phoneNumber,
          },
          handler: handler,
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        orderData("");
      }
    } else {
      toast.error(paymentMethod === "" ? "Please select payment method" : "Please Enter delivery address",{
        autoClose: 3000
      })
    }
  }

  render() {
    const { userAddress = "" } = this.state;
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
            totalPrice += (price - price * (discount / 100)) * quantity;
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
            <button
              className="add_product"
              onClick={() => this.handleConfirm(totalPrice)}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartCount: state.cartCount,
    userAddress: state.userAddress,
    phoneNumber: state.phoneNumber,
    userEmail: state.userEmail,
    userName: state.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCartCount: (data) => dispatch(setCartCount(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PaymentPage)
);
