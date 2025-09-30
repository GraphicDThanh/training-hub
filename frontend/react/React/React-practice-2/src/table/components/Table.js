import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProductTableStyled, TableRowStyled } from './../styles/TableStyle.js';
import ProductTableHeader from './TableHeader.js';
import ProductItem from './../../product/components/ProductItem.js';
import withSearch from './../../hoc/withSearch.js';

class ProductTable extends Component {
  static defaultProps = {
    products: []
  };

  static propTypes = {
    products: PropTypes.array
  };

  render() {
    let listOfProduct = [];

    listOfProduct = this.props.products
      .filter((product) => {
        return product.name.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0;
      }).map((product, index) => {
        return (
          <TableRowStyled key={product.id} index={index}>
            <ProductItem product={product}
              productIndex={index}
              handleEditProduct={this.props.handleEditProduct}
              handleDeleteProduct={this.props.handleDeleteProduct}
            />
          </TableRowStyled>
        );
      });

    if (!listOfProduct.length) {
      listOfProduct = <TableRowStyled className="center">No result</TableRowStyled>
    }

    return (
      <ProductTableStyled>
        {/*render header of table*/}
        <ProductTableHeader
          headers={this.props.headers}
        />

        {listOfProduct}
      </ProductTableStyled>
    );
  }
}

export default withSearch(ProductTable);
