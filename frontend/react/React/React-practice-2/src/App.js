import React, { Component } from 'react';
import faker from 'faker';

import logo from './logo.svg';
import './App.css';
import { setLocalStorage } from './helpers/setLocalStorage.js';
import { getLocalStorage } from './helpers/getLocalStorage.js';

import ProductTable from './table/components/Table.js';
import { generateListProduct, generateSingleProduct } from './helpers/generator.js';
import ProductPopup from './popup/ProductPopup.js';
import Button from './commons/button/components/Button.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      headers: ['Id', 'Name', 'Price', 'Image', ''],
      modal: {
        isOpen: false,
        data: null
      }
    };
  }

  handleCreateNewProduct = () => {
    this.setState((prevState) => {
      let productsUpdate = prevState.products.concat(generateSingleProduct());
      setLocalStorage(productsUpdate);
      return {
        products: productsUpdate
      };
    });

  }

  handleDeleteProduct = (id) => {
    this.setState((prevState) => {
      let productsUpdate = prevState.products.filter((product) => product.id !== id);

      setLocalStorage(productsUpdate);

      return {
        products: productsUpdate
      };
    });
  }

  handleEditProduct = (product) => {
    this.setState({
      modal: {
        data: product,
        isOpen: !this.state.modal.isOpen
      }
    });
  }

  toggleModal = () => {
    this.setState({
      modal: {
        data: null,
        isOpen: !this.state.modal.isOpen
      }
    });
  }

  handleSaveProduct = (data) => {
    if (data.id) {
      // edit product by id
      let id = data.id;
      this.setState((prevState) => {
          prevState.products.map((product) => {
            if (product.id === id) {
              product.name = data.name;
              product.price = data.price;
              product.image = data.image;
              return product;
            }

            return product;
          });

          setLocalStorage(prevState.products);

          return {
            products: prevState.products
          }
      });
    } else {
      // create product
      data.id = faker.random.uuid();
      this.setState((prevState) => {
        prevState.products = [... prevState.products, data];
        setLocalStorage(prevState.products);

        return {
          products: prevState.products
        }
      });
    }
  }

  handleGenerateProducts = () => {
    this.setState((prevState) => {
      let productsUpdate = prevState.products.concat(generateListProduct(5));

      setLocalStorage(productsUpdate);

      return {
        products: productsUpdate
      };
    })
  }

  handleGenerateSingleProduct = () => {
    this.setState((prevState) => {
      let productsUpdate = prevState.products.concat(generateSingleProduct());

      return {
        products: productsUpdate
      };
    });
  }

  componentDidMount() {
    if (!this.state.products.length) {
      this.setState({
        products: getLocalStorage() || []
      });
    }
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </header>

        <section className="app-content">
          <div className="function-buttons">
            <Button
              primary
              text="Create new product"
              onClick={this.toggleModal}
            />
            <Button
              secondary
              text="Generate list products"
              onClick={this.handleGenerateProducts}
            />
            <Button
              secondary
              text="Generate single product"
              onClick={this.handleGenerateSingleProduct}
            />
          </div>

          <ProductTable
            products={this.state.products}
            headers={this.state.headers}
            handleDeleteProduct={this.handleDeleteProduct}
            handleEditProduct={this.handleEditProduct}
          />

          {this.state.modal.isOpen &&
            <ProductPopup
              show={this.state.modal.isOpen}
              toggleModal={this.toggleModal}
              handleSaveProduct={this.handleSaveProduct}
              data={this.state.modal.data}
            >
              This is content of modal
            </ProductPopup>
          }
        </section>
      </div>
    );
  }
}

export default App;
