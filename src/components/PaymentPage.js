import React, { Component } from 'react'
import { withRouter } from '../withRouter'

class PaymentPage extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    const {category = "",
    title = "",
    discount = "",
    imageUrl = "",
    price = "",
    rating = "",
    prd_id = ""} = this.props.location.state || {};
    return (
      <div className='common_bg'>
        <div>
            <h2 className='brand'>Payment Information</h2>

        </div>
      </div>
    )
  }
}
export default withRouter(PaymentPage);