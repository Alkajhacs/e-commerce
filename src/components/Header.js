import React, { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/header.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ClearIcon from "@mui/icons-material/Clear";
import { connect } from "react-redux";
import { getSearchData, setCartCount } from "../actions/useractions";
import { withRouter } from "../withRouter";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedItem: "",
    };
  }
  componentDidMount() {
    this.fetchCartItem();
  }

  fetchCartItem() {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`http://localhost:8000/api/getcartItems/${userId}`)
        .then((response) => {
          const totalcount = response.data.reduce((a, b) => {
            return a + b.quantity;
          }, 0);
          this.props.setCartCount({
            cartCount: totalcount,
          });
        });
    }
  }

  handleSearch() {
    const { searchedItem = "" } = this.state;
    if (searchedItem) {
      axios
        .get(`http://localhost:8000/api/searchProducts/${searchedItem}`)
        .then((response) => {
          const allProducts = response.data;
          this.props.getSearchData({
            allProducts,
          });
        })
    }
  }

  handleLogOut() {
    localStorage.clear();
    this.props.navigate("/e-commerce");
  }

  handleClear() {
    this.setState({
      searchedItem: "",
    });
    axios
      .get("http://localhost:8000/api/getProducts")
      .then((response) => {
        const allProducts = response.data;
        this.props.getSearchData({
          allProducts
        });
      })
  }

  render() {
    const { userName = "", cartCount = 0 } = this.props;
    const { searchedItem = "" } = this.state;
    const isauthenticated = localStorage.getItem("token") || false;
    const isAdmin = localStorage.getItem("role") === "Admin";
    return (
      <div className="header">
        <img
          className="header__logo"
          src="https://res.cloudinary.com/dgcciqtbn/image/upload/v1681001027/logo_fqtaoe.png"
          alt="logo"
        />
        <div className="header__search">
          <input
            className="header__searchInput"
            type="text"
            value={searchedItem}
            onChange={(event) =>
              this.setState({ searchedItem: event.target.value })
            }
            autoComplete={false}
          />
          <ClearIcon
            className="clear__Icon cursor_pointer"
            onClick={() => {
              this.handleClear();
            }}
          />
          <SearchIcon
            className="search__Icon cursor_pointer"
            onClick={() => {
              this.handleSearch();
            }}
          />
        </div>
        <div className="header__nav">
          <div
            className="header__option cursor_pointer"
            onClick={() => {
              this.props.navigate("/e-commerce");
            }}
          >
            <span className="header__optionLineTwo cursor_pointer">Home</span>
          </div>
          <div className="header__option">
            <span className="header__optionLineOne">
              {" "}
              {isauthenticated && `Hello ${userName}`}
            </span>
            <span className="header__optionLineTwo">
              {isauthenticated ? (
                <span
                  onClick={() => this.handleLogOut()}
                  className="cursor_pointer"
                >
                  Log Out
                </span>
              ) : (
                <div>
                  <span
                    onClick={() => this.props.navigate("/login")}
                    className="cursor_pointer"
                  >
                    {" "}
                    Sign In{" "}
                  </span>
                  &nbsp;/&nbsp;
                  <span
                    onClick={() => this.props.navigate("/Signup")}
                    className="cursor_pointer"
                  >
                    Sign Up
                  </span>
                </div>
              )}
            </span>
          </div>
          {isauthenticated && <div
            className="header__option cursor_pointer"
            onClick={() => this.props.navigate("/allOrders")}
          >
            Orders
          </div>}
          {isauthenticated && <div
            className="header__option cursor_pointer"
            onClick={() => {
              const isauthenticated = localStorage.getItem("token") || false;
              if (isauthenticated) {
                this.props.navigate("/myProfile", {
                  state: { fromPage: "header" },
                });
              } else {
                this.props.navigate("/login");
              }
            }}
          >
            My Profile
          </div>}
          {isauthenticated && <div
            className="header__option cursor_pointer"
            onClick={() => {
              const isauthenticated = localStorage.getItem("token") || false;
              if (isauthenticated) {
                this.props.navigate("/feedback");
              } else {
                this.props.navigate("/login");
              }
            }}
          >
            Feedback
          </div>}
          {isauthenticated && isAdmin && <div
            className="header__option cursor_pointer"
            onClick={() => this.props.navigate("/allUsers")}
          >
            All Users
          </div>}
          {isauthenticated && isAdmin && <div
            className="header__option cursor_pointer"
            onClick={() => this.props.navigate("/allFeedback")}
          >
            All Feedback
          </div>}
          {isauthenticated && isAdmin && <div
            className="header__option cursor_pointer"
            onClick={() => this.props.navigate("/allPayment")}
          >
            All Payments
          </div>}
          {isauthenticated && isAdmin && <div
            className="header__option cursor_pointer"
            onClick={() => this.props.navigate("/allReturns")}
          >
            Return Requests
          </div>}
          {isauthenticated && <div
            className="header__optionBasket cursor_pointer"
            onClick={() => {
              const isauthenticated = localStorage.getItem("token") || false;
              if (isauthenticated) {
                this.props.navigate("/cartDetails");
              } else {
                this.props.navigate("/login");
              }
            }}
          >
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__BasketCount">
              {cartCount}
            </span>
          </div>}
          
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
    getSearchData: (data) => dispatch(getSearchData(data)),
    setCartCount: (data) => dispatch(setCartCount(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
