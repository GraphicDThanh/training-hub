import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// begin - Thinking in React

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Search..." onChange={this.props.onChangeTextFilter}/>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" onChange={this.props.onChangeInStockFilter}/> Only show products in stock
          </label>
        </div>
      </form>
    );
  }
}

class ProductItem extends React.Component {
  render() {
    let classesOfName = 'col-md-6 prod-name';

    if (!this.props.product.stocked) {
      classesOfName += ' out-of-stock';
    }

    return (
      <div className="row">
        <div className={classesOfName}>{this.props.product.name}</div>
        <div className="col-md-6 prod-price">{this.props.product.price}</div>
      </div>
    );
  }
}

class ProductCategory extends React.Component {
  render() {
    return (
      <div className="category">{this.props.category}</div>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const products = this.props.products,
          textFilter = this.props.textFilter,
          isInStock = this.props.isInStock;

    let lastCategory = '',
        productContentHTML = [];

    products.map((product, index) => {
      // TODO: add category
      if (product.category !== lastCategory) {
        productContentHTML.push(
          <ProductCategory
            category={product.category}
            key={product.category}
          />
        );

        lastCategory = product.category;
      }

      // TODO: not render cases
      // not match text filter
      if (product.name.indexOf(textFilter) === -1) {
        return false;
      }

      // checked in stock but data of stock is fale
      if (isInStock && !product.stocked) {
        return false;
      }

      productContentHTML.push(
        <ProductItem
          product={product}
          key={product.name}
        />
      );

      return true;
    });

    return (
      <div className="product-content">
        <div className="table-header row">
          <div className="header-title col-md-6">Name</div>
          <div className="header-title col-md-6">Price</div>
        </div>

        <div className="product-table-content">
          {productContentHTML}
        </div>
      </div>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textFilter: '',
      isInStock: false
    };

    this.handleChangeTextFilter = this.handleChangeTextFilter.bind(this);
    this.handleChangeInStockFilter = this.handleChangeInStockFilter.bind(this);
  }

  handleChangeTextFilter(e) {
    this.setState({
      textFilter: e.target.value
    });
  }

  handleChangeInStockFilter(e) {
    this.setState({
      isInStock: e.target.checked
    });
  }

  render() {
    const products = [
      {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
      {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
      {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
      {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
      {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
      {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
    ];

    return (
      <div className="container product-filterable-table">
        <h1 className="text-center">Filterable Product App</h1>

        <SearchBar
          isInStock={this.state.isInStock}
          textFilter={this.state.textFilter}
          products={products}
          onChangeTextFilter={this.handleChangeTextFilter}
          onChangeInStockFilter={this.handleChangeInStockFilter} />

        <ProductTable
          isInStock={this.state.isInStock}
          textFilter={this.state.textFilter}
          products={products} />
      </div>
    );
  }
}

ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('root')
);
// end - Thinking in React
