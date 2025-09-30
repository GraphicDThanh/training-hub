import React, { Component } from 'react';
import Modal from './../modal/components/Modal.js';

class ProductPopup extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        title={this.props.title}
        toggleModal={this.props.toggleModal}
        isCreate={this.props.isCreate}
        handleSaveProduct={this.props.handleSaveProduct}
        data={this.props.data}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default ProductPopup;