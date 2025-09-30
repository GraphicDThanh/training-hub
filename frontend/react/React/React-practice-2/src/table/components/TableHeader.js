import React, { Component } from 'react';
import { TableRowHeaderStyled, TableHeaderStyled } from './../styles/TableStyle.js';

class ProductTableHeader extends Component {
  render() {
    return (
      <TableRowHeaderStyled >
        {this.props.headers.map((title) => {
          return title ?
            <TableHeaderStyled key={title} className={`column ${title.toLowerCase()}`}>{title}</TableHeaderStyled>
            : <TableHeaderStyled key="btn-edit" className={`column`}></TableHeaderStyled>;
        })}
      </TableRowHeaderStyled>
    );
  }
}
export default ProductTableHeader;