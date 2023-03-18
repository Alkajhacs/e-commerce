import React, { Component } from "react";
import { withRouter } from "../withRouter";
import axios from "axios";
import "../styles/product.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//cloudinary

class Product extends Component {
  constructor(props) {
    super(props);
    const {
      category = "",
      description = "",
      price = 0,
      rating = "",
      imageUrl = "",
      title = "",
      discount = 0,
      brand = "",
      isEdit = false,
    } = props.location.state || {};
    this.state = {
      category,
      description,
      price,
      image: "",
      rating,
      imageUrl,
      title,
      discount,
      brand,
      isEdit,
      showToast: false,
    };
  }

  handleAddProduct = () => {
    const {
      category = "",
      description = "",
      price = 0,
      image = "",
      rating = "",
      imageUrl = "",
      title = "",
      discount = 0,
      brand = "",
    } = this.state;
    const data = JSON.stringify({
      category,
      description,
      price,
      image,
      rating,
      imageUrl,
      title,
      discount,
      brand,
    });
    axios
      .post("http://localhost:8000/api/addProduct", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data, {
          autoClose: 3000,
        });
        this.setState({
          showToast: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, {
          autoClose: 3000,
        });
        this.setState({
          showToast: true,
        });
      });
  };

  handleImageUpload = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "jtn4mpsz");
    const cloudname = "dgcciqtbn";
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        formData
      )
      .then((response) => {
        this.setState(
          {
            imageUrl: response.data.secure_url,
            image: event.target.files[0].name,
          },
          () => {
            toast.success("Image uploaded successfully", {
              autoClose: 3000,
            });
            this.setState({
              showToast: true,
            });
          }
        );
      });
  };

  handleUpdate = async () => {
    const {
      category = "",
      description = "",
      price = 0,
      image = "",
      rating = "",
      imageUrl = "",
      title = "",
      discount = 0,
      brand = "",
    } = this.state;
    const data = JSON.stringify({
      category,
      description,
      price,
      image,
      rating,
      imageUrl,
      title,
      discount,
      brand,
    });
    const { prd_id = "" } = this.props.location.state || {};
    axios
      .put(`http://localhost:8000/api/product_edit/${prd_id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data, {
          autoClose: 3000,
        });
        this.setState({
          showToast: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, {
          autoClose: 3000,
        });
        this.setState({
          showToast: true,
        });
      });
  };

  handleCancel = () => {
    this.setState({
      category: "",
      description: "",
      price: 0,
      image: "",
      rating: "",
      imageUrl: "",
      title: "",
      discount: 0,
      brand: "",
    });
  };

  render() {
    const {
      category = "",
      description = "",
      price = "50",
      rating = "6",
      title = "",
      discount = 0,
      brand = "",
      imageUrl = "",
      isEdit = false,
      showToast = false,
    } = this.state;
    return (
      <div className="common_bg padding_36">
        {showToast && <ToastContainer />}
        <div className=" sign_up">
          <div className="padding_36 ">
            <div className="login_input">
              Enter category * :
              <input
                className="signup_input"
                value={category}
                onChange={(event) =>
                  this.setState({ category: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Enter Title * :
              <input
                className="signup_input"
                value={title}
                onChange={(event) =>
                  this.setState({ title: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Enter Brand * :
              <input
                className="signup_input"
                value={brand}
                onChange={(event) =>
                  this.setState({ brand: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Enter description * :
              <textarea
                className="signup_textarea"
                value={description}
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
                autoComplete="off"
                required
              ></textarea>
            </div>
            <div className="login_input">
              Enter Price * :
              <input
                className="signup_input"
                type="text"
                value={price}
                onChange={(event) =>
                  this.setState({ price: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Enter Discount * :
              <input
                className="signup_input"
                value={discount}
                onChange={(event) =>
                  this.setState({ discount: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Enter rating * :
              <input
                className="signup_input"
                type="text"
                value={rating}
                onChange={(event) =>
                  this.setState({ rating: event.target.value })
                }
                autoComplete="off"
                required
              ></input>
            </div>
            <div className="login_input">
              Add Image * :
              <input
                type="file"
                onChange={(event) => this.handleImageUpload(event)}
                autoComplete="off"
                required
              ></input>
              <img src={imageUrl} alt="" className="prd_upload_img" />
            </div>
            <div className="button_wrap">
              <button
                type="Submit"
                className="login_button"
                onClick={() => {
                  isEdit ? this.handleUpdate() : this.handleAddProduct();
                }}
              >
                {isEdit ? "Edit Product" : "Add Product"}
              </button>
            </div>
            <div
              className="button_wrap"
              onClick={() => this.props.navigate("/e-commerce")}
            >
              <button
                type="Submit"
                className="login_button"
                onClick={() => {
                  this.handleCancel();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
