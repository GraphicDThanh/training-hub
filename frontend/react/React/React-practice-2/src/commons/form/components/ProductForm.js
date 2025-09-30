import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormGroup } from './../styles/FormStyled.js';
import CustomFileInput from './../../input/components/CustomFileInput.js';
import Input from './../../input/components/Input.js';
import Button from './../../button/components/Button.js';
import { ThumbnailModalStyled } from './../../../modal/styles/ModalStyled.js';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    /**
     * must keep this orders because related to build DOM
     */
    this.state = {
      id: '',
      name: '',
      price: '',
      image: '',
      error: {
        name: '',
        price: '',
        image: ''
      }
    };
  }

  static propsTypes = {
    toggleModal: PropTypes.func,
    handleSaveProduct: PropTypes.func,
  };

  static defaultProps = {
    toggleModal: () => {},
    handleSaveProduct: () => {},
  }

  handleChange = (e) => {
    let value = e.target.value,
        name = e.target.name;

    this.setState((prevState) => {
      let error = prevState.error;

      if (value) {
        if (name === 'price' && isNaN(value)) {
           error[name] = 'Price is invalid';
        } else {
          error[name] = '';
        }
      } else {
        switch (name) {
          case 'name':
            error.name = 'Name is invalid';
            break;
          case 'price':
            error.price = 'Price is invalid';
            break;
          default:
            break;
        }
      }

      return {
        [name]: value,
        error: error
      }
    });

  }

  handleSubmit = (e) => {
    e.preventDefault();

    let error = this.validFormData(this.state);
    if (!error) {
      let state = this.state;
      // close popup after submit
      this.props.toggleModal();

      // must remove error data when build save product
      this.props.handleSaveProduct({
        id: state.id,
        name: state.name,
        price: state.price,
        image: state.image
      });
    }
  }

  validFormData = (data) => {
    let name = data.name,
        price = data.price,
        image = data.image,
        error = {};

    if (!name) {
      error.name = 'Name is invalid';
    }

    if (!price || (price && isNaN(price))) {
      error.price = 'Price is invalid';
    }

    if (!image) {
      error.image = 'Image is missing';
    }

    this.setState({
      error: error
    });

    if (Object.keys(error).length) {
      return true;
    }
  }

  handleSelectFile = (e) => {
    let files = e.target.files;

    if (files && files[0] && files[0].type.match('image.*')) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.setState((prevState) => {
          let error = prevState.error;
          error.image = '';
          return {
            image: e.target.result,
            error: error
          };
        });
      }

      reader.readAsDataURL(files[0]);
    }
  }

  componentWillMount() {
    if (this.props.data) {
      let product = this.props.data;
      this.setState({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }

  }

  render() {
    return (
      <form>
        <FormGroup>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            name="name"
            placeholder="Name of product"
            value={this.state.name}
            onChange={this.handleChange}
          />
          {this.state.error && this.state.error.name && <span className="error">Name is invalid</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="price">Price</label>
          <Input
            type="text"
            name="price"
            placeholder="Price of product"
            value={this.state.price}
            onChange={this.handleChange}
          />
          {this.state.error && this.state.error.price && <span className="error">Price is invalid</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="image">Image</label>
          <CustomFileInput
            name="image"
            value={this.state.image}
            onChange={this.handleSelectFile} />
          {
            (this.state.image ? <ThumbnailModalStyled src={this.state.image} alt="image selected" /> : null)
          }
          {this.state.error && this.state.error.image && <span className="error">Image is missing</span>}
        </FormGroup>

        <FormGroup>
          <Button
            secondary
            text="Close"
            type="text"
            onClick={this.props.toggleModal}
          />
          <Button
            primary
            text="Save"
            type="submit"
            onClick={this.handleSubmit}
          />
        </FormGroup>
      </form>
    );
  }
}

export default ProductForm;