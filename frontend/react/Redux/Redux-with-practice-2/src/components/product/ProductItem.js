import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../commons/components/button/Button';

class ProductItem extends Component {
  render () {
    const {
      product,
      productIndex,
      handleDeleteProduct,
      handleEditProduct
    } = this.props;

    let row = [],
      productKeys = Object.keys(product),
      productKeysLength = productKeys.length,
      rowItem;

    productKeys.map((key, index) => {
      switch(key) {
        case 'id':
          rowItem = <div className={`column ${key}`} key={key}>
            {productIndex + 1}
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
        default:
          break;
      }

      row.push(rowItem);

      // add btn edit for last rowItem
      if (productKeysLength === index + 1) {
        row.push(
          <div className="column buttons center" key={index}>
            <Button
              text="Delete"
              textColor="white"
              bg="#fb5a4a"
              onClick={handleDeleteProduct.bind(this, product.id)}
            />

            <Button
              text="Edit"
              textColor="white"
              bg="#1c67c3"
              onClick={handleEditProduct.bind(this, product)}
            />
          </div>
        );
      }
      return row;
    });
    return row;
  }

}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  productIndex: PropTypes.number.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
  handleEditProduct: PropTypes.func.isRequired
};

export default ProductItem;