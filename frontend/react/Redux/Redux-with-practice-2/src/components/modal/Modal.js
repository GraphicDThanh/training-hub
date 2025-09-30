import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductForm from '../form/ProductForm';

import {
  ModalDialog,
  ModalContent,
  ModalHeader,
  ModalHeaderTitle,
  ButtonCloseModal
} from '../styles/ModalStyled';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.group('testing shouldComponentUpdate Modal');
    console.log('testing nextProps', nextProps);
    console.log('testing props', this.props);
    console.groupEnd();
    return true;
  }

  render() {
    const {
      isShowModal,
      data,
      toggleModal,
      handleSaveProduct
    } = this.props;

    return (
      isShowModal &&
      <ModalDialog>
        <ModalContent>
          <ModalHeader>
            <ModalHeaderTitle>{data ? 'Edit Product': 'Create New Product'}</ModalHeaderTitle>
            <ButtonCloseModal onClick={toggleModal}>
              <span>x</span>
            </ButtonCloseModal>
          </ModalHeader>

          <ProductForm
            toggleModal={toggleModal}
            handleSaveProduct={handleSaveProduct}
            data={data}
          />
        </ModalContent>
      </ModalDialog>
    );
  }
}

// check data of props for component
Modal.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleSaveProduct: PropTypes.func.isRequired
};

export default Modal;