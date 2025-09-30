import React, { Component } from 'react';
import ProductButtons from './ProductButtons.js';

class ProductItem extends Component {
  render() {
    let row = [],
      product = this.props.product,
      productKeys = Object.keys(product),
      productKeysLength = productKeys.length,
      rowItem;

    productKeys.map((key, index) => {
      switch(key) {
        case 'id':
          rowItem = <div className={`column ${key}`} key={key}>
            {this.props.productIndex + 1}
          </div>;
          break;

        case 'image':
          rowItem = <div key={key} className={`column ${key}`}>
            <img
              alt={`${key}`}
              src={`${product[key]}`} />
          </div>;
          break;

        case "price":
        case "name":
          rowItem = <div className={`column ${key}`} key={key}>
            {product[key]}
          </div>;
          break;
      }

      row.push(rowItem);

      // add btn edit for last rowItem
      if (productKeysLength === index + 1) {
        row.push(
          <ProductButtons
            key={product.id}
            product={product}
            handleDeleteProduct={this.props.handleDeleteProduct}
            handleEditProduct={this.props.handleEditProduct.bind(this, product)}
          />
        );
      }

      return row;
    });

    return row;
  }
}

export default ProductItem;