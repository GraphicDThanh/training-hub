import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../components/product/ProductItem';
import {
  ProductTableStyled,
  TableRowStyled,
  TableHeaderStyled,
  TableRowHeaderStyled
} from './styles/TableStyled.js';

class ProductTable extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.products && nextProps.products && (this.props.products.length !== nextProps.products.length || this.props.products.length)) {
      return true;
    }

    return false;
  }

  render() {
    const {
      products,
      handleEditProduct,
      handleDeleteProduct
    } = this.props;

    const headers = ['Id', 'Name', 'Price', 'Image', ''];

    let listOfProduct = [];

    listOfProduct = products.map((
      product,
      index
    ) => {
      return (
        <TableRowStyled key={product.id} index={index}>
          <ProductItem
            product={product}
            productIndex={index}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        </TableRowStyled>
      );
    });

    if (!listOfProduct.length) {
      listOfProduct = <TableRowStyled className="center">No result</TableRowStyled>
    }

    return (
      <ProductTableStyled>
        {/* table header */}
        <TableRowHeaderStyled key='header'>
          {
            headers.map((title) => {
              return title ?
                <TableHeaderStyled
                  key={title}
                  className={`column ${title.toLowerCase()}`}
                >
                  {title}
                </TableHeaderStyled> :
                <TableHeaderStyled
                  key="btn-edit"
                  className={`column`}
                />;
              }
            )
          }
        </TableRowHeaderStyled>

        {listOfProduct}
      </ProductTableStyled>
    );
  }
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired
  ),
  handleEditProduct: PropTypes.func.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired
};

export default ProductTable;