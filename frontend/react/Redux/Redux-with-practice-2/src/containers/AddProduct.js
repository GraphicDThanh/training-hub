import { connect } from 'react-redux';
import AddProductGroup from '../components/AddProductGroup';
import * as act from '../actions/actions';

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    toggleModal: () => dispatch(act.toggleModal()),
    handleGenerateProducts: () => dispatch(act.addListProductsRandom()),
    handleGenerateSingleProduct: () => dispatch(act.addSingleProductRandom())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProductGroup);
