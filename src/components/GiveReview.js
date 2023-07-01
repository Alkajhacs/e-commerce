import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { withRouter } from "../withRouter";

class GiveReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      review: "",
    };
  }

  setRating() {
    const { prodId = "" } = this.props?.location?.state;
    axios
      .get(`http://localhost:8000/api/getReviews/${prodId}`)
      .then((response) => {
        let productRating = response.data.reduce((a, current) => {
          return a + current?.rating;
        }, 0);
        productRating = Math.round(productRating/ response.data?.length)
        axios.put(
          `http://localhost:8000/api/product_edit/${prodId}`,
          JSON.stringify({ productRating }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });
  }

  handleReview() {
    const { prodId = "" } = this.props?.location?.state;
    const { rating = "", review = "" } = this.state;
    const data = JSON.stringify({
      prodId,
      rating,
      review,
    });
    axios
      .post("http://localhost:8000/api/submitReview", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data, {
          autoClose: 1000,
        });
    this.setRating();
    });
  }

  render() {
    const { rating = "", review = "" } = this.state;
    return (
      <div className="common_bg justify_content padding_36">
        <ToastContainer />
        <div className="white_bg padding_36">
          <div>
            Enter Rating :
            <input
              value={rating}
              className="ml_16 padding_5"
              onChange={(event) =>
                this.setState({ rating: event.target.value })
              }
            />
          </div>
          <br />
          <div>
            Enter Review :
            <input
              value={review}
              className="ml_16 padding_5"
              onChange={(event) =>
                this.setState({ review: event.target.value })
              }
            />
          </div>
          <br />
          <div className="profile_button">
            <button
              className="add_product profile_button"
              onClick={() => {
                this.handleReview();
              }}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(GiveReview);
