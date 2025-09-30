import React, { Component } from 'react';
import Button from './../../commons/button/components/Button';

class ProductButtons extends Component {
  render() {
    return (
      <div className="column buttons center">
        <Button
          text="Delete"
          textColor="white"
          bg="#fb5a4a"
          onClick={this.props.handleDeleteProduct.bind(this, this.props.product.id)}
        />

        <Button
          text="Edit"
          textColor="white"
          bg="#1c67c3"
          onClick={this.props.handleEditProduct.bind(this, this.props.product)}
        />
      </div>
    );
  }

}

export default ProductButtons;