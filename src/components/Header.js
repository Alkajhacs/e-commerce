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
          console.log(response.data);
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
        .catch((error) => {
          console.log(error);
        });
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
          allProducts,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { userName = "", cartCount = 0 } = this.props;
    const { searchedItem = "" } = this.state;
    const isauthenticated = localStorage.getItem("token") || false;
    return (
      <div className="header">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
        <div className="header__search">
          <input
            className="header__searchInput"
            type="text"
            value={searchedItem}
            onChange={(event) =>
              this.setState({ searchedItem: event.target.value })
            }
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
          <div className="header__option">
            <span className="header__optionLineOne cursor_pointer">
              Returns
            </span>
            <span className="header__optionLineTwo cursor_pointer">
              {" "}
              Orders
            </span>
          </div>
          <div
            className="header__optionBasket cursor_pointer"
            onClick={() => {
              this.props.navigate("/cartDetails");
            }}
          >
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__BasketCount">
              {cartCount}
            </span>
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
    getSearchData: (data) => dispatch(getSearchData(data)),
    setCartCount: (data) => dispatch(setCartCount(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
