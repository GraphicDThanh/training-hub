import { connect } from 'react-redux';
import Modal from '../components/modal/Modal';
import { getModalData } from '../selectors/';
import * as act from '../actions/';

// view layer binding setting
const mapStateToProps = (state) => {
  return getModalData(state);
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
