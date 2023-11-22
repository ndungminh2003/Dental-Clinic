import React, { Component } from 'react'
import PropTypes from 'prop-types'


class LineItem extends Component {

  render = () => {

    const { index, name, quantity, price } = this.props

    return (
      <div className="lineItem">
        <div>{index + 1}</div>
        <div><input name="name" type="text" disabled={true} value={name} onChange={this.props.changeHandler(index)} /></div>
        <div><input name="quantity" type="number" disabled={true} value={quantity} onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /></div>
        <div className="currency"><input name="price" type="number" disabled={true} value={price} onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /></div>
        <div className="currency" >{this.props.currencyFormatter( quantity * price )}</div>
      </div>
    )
  }
}

export default LineItem

LineItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}


