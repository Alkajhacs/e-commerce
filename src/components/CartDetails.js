import React, { Component } from "react";
import "../styles/cartDetails.css";
import axios from "axios";
import { connect } from "react-redux";
import { setCartCount } from "../actions/useractions";
import { withRouter } from "../withRouter";

class CartDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCartProducts: [],
      eachProdQuant: {},
    };
  }

  comp;
  componentDidMount() {
    this.fetchCartItemDetails();
    this.fetchCartItems();
  }

  fetchCartItemDetails() {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`http://localhost:8000/api/cartItemDetails/${userId}`)
        .then((response) => {
          this.setState({
            allCartProducts: response.data,
          });
        });
    }
  }

  fetchCartItems() {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`http://localhost:8000/api/getcartItems/${userId}`)
        .then((response) => {
          let eachProdQuant = {};
          if (response.data.length) {
            response.data.map((el) => {
              eachProdQuant[el.prd_id] = el.quantity;
            });
          }
          this.setState({
            eachProdQuant,
          });
        });
    }
  }

  handleAddProduct(prd_id) {
    let { eachProdQuant = {} } = this.state;
    const isauthenticated = localStorage.getItem("token") || false;
    if (isauthenticated) {
      eachProdQuant[prd_id] = eachProdQuant[prd_id] + 1;
      this.setState(
        {
          eachProdQuant,
        },
        () => {
          this.addCart(prd_id);
          this.props.setCartCount({
            cartCount: this.props.cartCount + 1,
          });
        }
      );
    } else {
      this.props.navigate("/login");
    }
  }

  handleDeleteProduct(prd_id) {
    let { eachProdQuant = {} } = this.state;
    eachProdQuant[prd_id] = eachProdQuant[prd_id] - 1;
    this.setState(
      {
        eachProdQuant,
      },
      () => {
        this.addCart(prd_id);
        this.props.setCartCount({
          cartCount: this.props.cartCount - 1,
        });
      }
    );
  }

  addCart(prd_id) {
    const { eachProdQuant = {} } = this.state;
    let data = {};
    const userId = localStorage.getItem("user_id") || "";
    if (userId) {
      data = JSON.stringify({ quantity: eachProdQuant[prd_id] });
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
    }
  }

  RemoveProduct(prdId) {
    const {eachProdQuant = {} } = this.state
    const userId = localStorage.getItem("user_id") || "";
    if(eachProdQuant?.[prdId] === 1 && userId) {
      axios.delete(`http://localhost:8000/api/cart/${prdId}/${userId}`)
      .then(() => {
        this.props.setCartCount({
          cartCount: this.props.cartCount - 1,
        });
        this.fetchCartItemDetails()
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  buyNow() {
    const {allCartProducts = [], eachProdQuant = {}} = this.state;
    this.props.navigate("/payment", {
      state: {allCartProducts, eachProdQuant, fromPage: "cartDetail"},
    });
  }
  render() {
    const { allCartProducts = [], eachProdQuant = {} } = this.state;
    return (
      <div className="common_bg padding_36">
        {allCartProducts.map((eachProd) => {
          const {
            category = "",
            title = "",
            discount = "",
            imageUrl = "",
            price = "",
            rating = "",
            prd_id,
          } = eachProd;
          return (
            <div className="white_bg outer_body">
              <div>
                <img src={imageUrl} className="cart_img" alt="" />{" "}
              </div>
              <div className="prod_det_body">
                <div className="text_cap fw_700">{category}</div>
                <hr></hr>
                <div> {title}</div>
                <br />
                <strong className="product__price">
                  Quantity : {eachProdQuant?.[prd_id]}{" "}
                </strong>
                <br />
                <div className="product__price">
                  <div>
                    <strong className="color_red">Total Price : </strong>
                    <strike>₹{price * eachProdQuant?.[prd_id]}</strike>
                    &nbsp;&nbsp;₹
                    {(price - price * (discount / 100)) *
                      eachProdQuant?.[prd_id]}
                    &nbsp;&nbsp;<strong>(Discount {discount}%)</strong>
                  </div>
                </div>
                <div className="product__rating">
                  {Array(rating)
                    .fill()
                    .map((_, i) => (
                      <p>🌟</p>
                    ))}
                </div>
                <div className="bottom_button">
                  <div className="button_wrap">
                    {(eachProdQuant?.[prd_id] > 1) && (
                      <button
                        type="Submit"
                        className="small_button cursor_pointer"
                        onClick={() => {
                          this.handleAddProduct(prd_id);
                        }}
                      >
                        +
                      </button>
                    )}
                    <button
                      type="Submit"
                      className={`login_button  ${
                        (eachProdQuant?.[prd_id] > 1) ? "white_bg cursor_pointer" : ""
                      }`}
                      onClick={() => {this.RemoveProduct(prd_id)}}
                    >
                      {(eachProdQuant?.[prd_id]  > 1) ? eachProdQuant?.[prd_id] : "Remove Item"}
                    </button>
                    {(eachProdQuant?.[prd_id] > 1) && (
                      <button
                        type="Submit"
                        className="small_button cursor_pointer"
                        onClick={() => {
                          this.handleDeleteProduct(prd_id);
                        }}
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {allCartProducts.length ? <div className="button_wrap">
          <button className="add_product " onClick={() => {this.buyNow()}}>
            Buy Now
          </button>
        </div> : <div>No Product is added to Cart</div>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCartCount: (data) => dispatch(setCartCount(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    cartCount: state.cartCount,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDetails));
