import { connect } from 'react-redux';
import Modal from '../components/modal/Modal';

import * as act from '../actions/actions';

// view layer binding setting
const mapStateToProps = (state) => {
  return {
    isShowModal: state.modal.isShowModal,
    data: state.modal.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: (data) => dispatch(act.toggleModal(data)),
    handleSaveProduct: data => data.id ? dispatch(act.editProduct(data)) : dispatch(act.addProduct(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
