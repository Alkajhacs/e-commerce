import React, { Component } from "react";
import { withRouter } from "../withRouter";
import "../styles/productDetails.css";
import { connect } from "react-redux";
import { setCartCount } from "../actions/useractions";
import axios from "axios";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: props.cartCount || 0,
      currentPrdCount: 0,
      prevCartCount: 0,
      isAlreadyAdded: false,
    };
  }

  componentDidMount() {
    this.fetchCartItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps?.cartCount !== this.props.cartCount) {
      this.setState({
        cartCount: this.props.cartCount,
      });
    }
  }

  fetchCartItem() {
    const userId = localStorage.getItem("user_id");
    const { prd_id } = this.props.location.state || {};
    if (userId) {
      axios
        .get(`http://localhost:8000/api/getcartItems/${userId}`)
        .then((response) => {
          const prevPrdCount = response.data.filter(
            (el) => el.prd_id === prd_id
          );
          this.setState({
            prevCartCount: prevPrdCount?.[0]?.quantity,
            isAlreadyAdded: !!prevPrdCount?.length,
          });
        });
    }
  }

  handleAddProduct() {
    const { cartCount = 0, currentPrdCount = 0 } = this.state;
    const isauthenticated = localStorage.getItem("token") || false;
    if (isauthenticated) {
      this.setState(
        {
          cartCount: cartCount + 1,
          currentPrdCount: currentPrdCount + 1,
        },
        () => {
          this.addCart();
          this.props.setCartCount({
            cartCount: this.state.cartCount,
          });
        }
      );
    } else {
      this.props.navigate("/login");
    }
  }

  handleDeleteProduct() {
    const { cartCount = 0, currentPrdCount = 0 } = this.state;
    this.setState(
      {
        cartCount: cartCount - 1,
        currentPrdCount: currentPrdCount - 1,
      },
      () => {
        this.addCart();
        this.props.setCartCount({
          cartCount: this.state.cartCount,
        });
      }
    );
  }

  handleBuyNow() {
    const { currentPrdCount = 0, prevCartCount = 0 } = this.state;
    const isauthenticated = localStorage.getItem("token") || false;
    if (isauthenticated) {
      this.props.navigate("/payment", {
        state: {
          allCartProducts: [{ ...this.props.location.state }],
          currentPrdCount: currentPrdCount + prevCartCount || 1,
        },
      });
    } else {
      this.props.navigate("/login");
    }
  }

  addCart() {
    const {
      currentPrdCount = 0,
      prevCartCount = 0,
      cartCount = 0,
      isAlreadyAdded = false,
    } = this.state;
    const { userId = "" } = this.props;
    const { prd_id } = this.props.location.state || {};
    let data = {};
    if (currentPrdCount > 1 || prevCartCount || isAlreadyAdded) {
      data = JSON.stringify({ quantity: prevCartCount + currentPrdCount });
      axios
        .put(`http://localhost:8000/api/addCart/${prd_id}/${userId}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      data = JSON.stringify({ quantity: cartCount, prd_id, userId });
      axios
        .post("http://localhost:8000/api/addCart", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const {
      category = "",
      description = "",
      price = 0,
      rating = "",
      imageUrl = "testing",
      title = "",
      discount = 0,
      brand = "",
    } = this.props.location.state || {};
    const { currentPrdCount = 0, prevCartCount = 0 } = this.state;
    return (
      <div className="padding_36 common_bg flex_justify_between">
        <img src={imageUrl} alt="" className="w_50 h_fit" />
        <div className="prod_det">
          <div className="text_cap fw_700">{category}</div>
          <hr></hr>
          <h3>{title}</h3>
          {description}
          <div className="product__rating">
            <div className="fw_500">Rating : </div>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>🌟</p>
              ))}
          </div>
          <div className="fw_500 brand">Brand : {brand}</div>
          <div className="product__price">
            <div>
              <strike>₹{price}</strike>
              &nbsp;&nbsp;₹{price - price * (discount / 100)}
              &nbsp;&nbsp;<strong>(Discount {discount}%)</strong>
            </div>
          </div>
          <div className="bottom_button">
            <div className="button_wrap">
              {!!(currentPrdCount + prevCartCount) && (
                <button
                  type="Submit"
                  className="small_button cursor_pointer"
                  onClick={() => {
                    this.handleAddProduct();
                  }}
                >
                  +
                </button>
              )}
              <button
                type="Submit"
                className={`login_button cursor_pointer ${
                  currentPrdCount + prevCartCount ? "white_bg" : ""
                }`}
                onClick={() => {
                  this.handleAddProduct();
                }}
              >
                {currentPrdCount + prevCartCount || "Add Product to cart"}
              </button>
              {!!(currentPrdCount + prevCartCount) && (
                <button
                  type="Submit"
                  className="small_button cursor_pointer"
                  onClick={() => {
                    this.handleDeleteProduct();
                  }}
                >
                  -
                </button>
              )}
            </div>
            <div className="button_wrap">
              <button
                type="Submit"
                className="login_button cursor_pointer"
                onClick={() => {
                  this.handleBuyNow();
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isauthenticated: state.isauthenticated,
    userRole: state.userRole,
    userId: state.userId,
    userName: state.userName,
    userAddress: state.userAddress,
    cartCount: state.cartCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCartCount: (data) => dispatch(setCartCount(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
