import { connect } from 'react-redux';
import ProductTable from '../components/ProductTable';
import withSearch from '../hoc/withSearch';
import filterArrByObjName from '../helpers/filterArrayByName';

import * as act from '../actions/actions';

/** This stuffs below belong to view layer binding */
const mapStateToProps = (state) => {
  return {
    products: filterArrByObjName(state.products, state.textFilter2)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEditProduct: product => {
      dispatch(act.toggleModal(product));
    },
    handleDeleteProduct: id => dispatch(act.deleteProduct(id))
  };
};

function mapStateToPropsForSearchBar(state) {
    return {
      textFilter2: state.textFilter2
    };
  }

  function mapDispatchToPropsForSearchBar(dispatch) {
    return {
      handleSearch: text => dispatch(act.searchFilter2(text))
    };
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSearch(
  ProductTable,
  mapStateToPropsForSearchBar,
  mapDispatchToPropsForSearchBar
));