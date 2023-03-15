import React, { Component } from "react";
import { withRouter } from "../withRouter";
import "../styles/productDetails.css";
import { connect } from 'react-redux';
import axios from "axios";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0
    }
  }

  handleAddProduct() {
    const {cartCount = 0} = this.state;
    this.setState({
      cartCount: cartCount+1
    }, ()=> {
      this.addCart();
    })
  }

  handleDeleteProduct() {
    const {cartCount = 0} = this.state;
    this.setState({
      cartCount: cartCount-1
    }, ()=> {
      this.addCart();
    })
  }

  handleBuyNow() {
    this.props.navigate("/payment", { state: this.props.location.state });
  }

  addCart() {
    const {cartCount =0} = this.state;
    const {userId = ""} = this.props;
    const {prd_id} = this.props.location.state || {};
    let data = {};
    if(cartCount > 1) {
      data = JSON.stringify({quantity: cartCount});
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
      data = JSON.stringify({quantity: cartCount, prd_id, userId });
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
    const {cartCount = 0} = this.state;
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
            {!!cartCount && <button
                type="Submit"
                className="small_button cursor_pointer"
                onClick={() => {
                  this.handleAddProduct();
                }}
              >
                +
              </button>}
              <button
                type="Submit"
                className={`login_button cursor_pointer ${cartCount ? "white_bg" :  ""}`}
                onClick={() => {
                  this.handleAddProduct();
                }}
              >
                {cartCount || "Add Product to cart"}
              </button>
              {!!cartCount && <button
                type="Submit"
                className="small_button cursor_pointer"
                onClick={() => {
                  this.handleDeleteProduct();
                }}
              >
                -
              </button>}
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
  };
};

export default withRouter(connect(mapStateToProps)(ProductDetails));
