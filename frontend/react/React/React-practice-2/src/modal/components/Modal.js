import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ModalDialog,
  ModalContent,
  ModalHeader,
  ModalHeaderTitle,
  ButtonCloseModal
} from './../styles/ModalStyled';
import ProductForm from './../../commons/form/components/ProductForm.js';

class Modal extends Component {
  static defaultProps = {
    toggleModal: () => {},
    handleSaveProduct: () => {},
    data: {}
  };

  static propTypes = {
    toggleModal: PropTypes.func,
    handleSaveProduct: PropTypes.func,
    data: PropTypes.object
  }

  render() {
    return (
      this.props.show &&
      <ModalDialog>
        <ModalContent>
          <ModalHeader>
            <ModalHeaderTitle>{this.props.data ? 'Edit Product': 'Create New Product'}</ModalHeaderTitle>
            <ButtonCloseModal onClick={this.props.toggleModal}>
              <span>x</span>
            </ButtonCloseModal>
          </ModalHeader>

          <ProductForm
            toggleModal={this.props.toggleModal}
            handleSaveProduct={this.props.handleSaveProduct}
            data={this.props.data}
          />
        </ModalContent>
      </ModalDialog>
    );
  }
}

export default Modal;