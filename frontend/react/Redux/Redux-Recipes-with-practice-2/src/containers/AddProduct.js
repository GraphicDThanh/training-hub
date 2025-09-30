import { connect } from 'react-redux';
import AddProductGroup from '../components/AddProductGroup';
import * as actions from '../actions/';

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    toggleModal: () => dispatch(actions.toggleModal()),
    handleGenerateProducts: () => dispatch(actions.addListProductRandom(5)),
    handleGenerateSingleProduct: () => dispatch(actions.addSingleProductRandom())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductGroup);
