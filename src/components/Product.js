import React, { Component } from 'react'
import "../styles/product.css"

export default class Product extends Component {

    constructor(props) {
        super(props);
      }
 
   render() {
    const {
        id= 1,
        title= "testing",
        price= "50",
        image= "",
        rating= "6"
    } = this.props;
    return (
        <div className="product">
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
            
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>🌟</p>
              ))}
          </div>
        </div>
  
        <img src={image} alt="" />
  
        <button>Add to Basket</button>
      </div>
    )
  }
}
