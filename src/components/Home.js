import React, { Component } from "react";
import { withRouter } from "../withRouter";
import { connect } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "../styles/home.css";
import DialogBox from "./DialogBox";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: props.allProducts?.length ? props.allProducts : [],
      prdId: "",
    };
    this.dialogBoxRef = React.createRef();
  }
  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps?.allProducts !== this.props?.allProducts) {
      this.setState({
        allProducts: this.props.allProducts,
      });
    }
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
    this.props.navigate("/addProduct", {
      state: { ...eachProduct, isEdit: true },
    });
  }

  handleConfirm = (prdId) => {
    try {
      axios
        .delete(`http://localhost:8000/api/product/${prdId}`)
        .then((response) => {
          this.setState({
            showConfirmDialog: false,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  handleDeleteIcon = (prdId) => {
    this.setState({
      showConfirmDialog: true,
      prdId,
    });
  };

  handleClose = () => {
    this.setState({
      showConfirmDialog: false,
    });
  };

  render() {
    const { allProducts = [], showConfirmDialog = false, prdId } = this.state;
    const userRole = localStorage.getItem("role");
    return (
      <div className="home">
        <div>
          <img
            className="home__image"
            src="https://res.cloudinary.com/dgcciqtbn/image/upload/c_scale,h_650,w_1475/v1680999953/homepage_flwjdj.png"
            alt="homepage"
          />
          <div className="justify_center contact_us ">
            <div className="w_50 flex_justify_between">
              <div>Contact us : 8930345678</div>
              <div>Mail to : ecomfy@gmail.com</div>
            </div>
          </div>
          {userRole === "Admin" && (
            <div className="button_wrap cursor_pointer">
              <button
                type="Submit"
                className="add_product"
                onClick={() => this.props.navigate("/addProduct")}
              >
                Add a Product
              </button>
            </div>
          )}
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
                    {userRole === "Admin" && (
                      <div className="admin_button">
                        <div
                          className="product__rating cursor_pointer"
                          onClick={() => this.handleEdit(eachProduct)}
                        >
                          Edit &nbsp;&nbsp;
                          <EditIcon />
                        </div>
                        <div
                          className="product__rating cursor_pointer"
                          onClick={() => this.handleDeleteIcon(prd_id)}
                        >
                          Delete &nbsp;&nbsp;
                          <DeleteIcon />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {showConfirmDialog && (
          <DialogBox
            ref={this.dialogBoxRef}
            showConfirmDialog={showConfirmDialog}
            handleClose={this.handleClose}
            content={`Do you want to delete the product ? `}
            showCancel={true}
            confirmButtonText="Confirm"
            handleConfirm={this.handleConfirm}
            confirmParam={prdId}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts,
    userRole: state.userRole,
  };
};
export default withRouter(connect(mapStateToProps)(Home));
