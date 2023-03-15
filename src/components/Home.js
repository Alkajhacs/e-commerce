import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../withRouter";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "../styles/home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
    };
  }
  componentDidMount() {
    this.fetchProducts();
  }
  fetchProducts() {
    axios.get("http://localhost:8000/api/getProducts").then((response) => {
      this.setState({
        allProducts: response.data,
      });
    });
  }

  handleAdd(eachProduct) {
    this.props.navigate("/productDetail", { state: eachProduct });
  }

  handleEdit(eachProduct) {
    this.props.navigate("/addProduct", { state: {...eachProduct, isEdit: true} });
  }

  handleDelete(prdId) {
    try {
      const response = axios.delete(`http://localhost:8000/api/product/${prdId}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { allProducts = [] } = this.state;
    return (
      <div className="home">
        <div className="home__container">
          <img
            className="home__image"
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt=""
          />
          <div className="button_wrap">
            <button type="Submit" className="add_product">
              <Link to="/addProduct">Add a Product</Link>
            </button>
          </div>
          <div className="home__row">
            {allProducts.map((eachProduct) => {
              const {
                category = "",
                title = "",
                discount = "",
                imageUrl = "",
                price = "",
                rating = "",
                prd_id = "",
              } = eachProduct || {};
              return (
                <div className="product" key={prd_id}>
                  <div className="product_in">
                    <div className="product__info">
                      <div className="text_cap fw_700">{category}</div>
                      <hr></hr>
                      <div> {title}</div>
                      <div className="product__price">
                        <div>
                          <strike>₹{price}</strike>
                          &nbsp;&nbsp;₹{price - price * (discount / 100)}
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
                    </div>
                    <img src={imageUrl} alt="" className="prd_img" />
                    <button
                      className="add_product"
                      onClick={() => this.handleAdd(eachProduct)}
                    >
                      View Details
                    </button>
                    <div className="admin_button">
                      <div className="product__rating cursor_pointer" onClick={() => this.handleEdit(eachProduct)}>
                        Edit &nbsp;&nbsp;<EditIcon />
                      </div>
                      <div className="product__rating cursor_pointer" onClick={() => this.handleDelete(prd_id)}>
                        Delete &nbsp;&nbsp;<DeleteIcon />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
