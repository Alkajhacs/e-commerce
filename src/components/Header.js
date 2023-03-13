import React, { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import "../styles/header.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { connect } from 'react-redux';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { isauthenticated, hasRole } = this.props;
    return (
      <div className="header">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt = ""
        />
        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="search__Icon" />
        </div>
        <div className="header__nav">
          <div className="header__option">
            <span className="header__optionLineOne"> Hello user</span>
            <span className="header__optionLineTwo">
              {isauthenticated ? (
                "Log Out"
              ) : (
                <div>
                  <Link to="/login"> Sign In </Link>
                  <Link to="/Signup">Sign Up</Link>
                </div>
              )}
            </span>
          </div>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo"> Orders</span>
          </div>
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__BasketCount">0</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isauthenticated: state.isauthenticated,
    hasRole: state.hasRole,
  };
};

export default connect(mapStateToProps)(Header);
