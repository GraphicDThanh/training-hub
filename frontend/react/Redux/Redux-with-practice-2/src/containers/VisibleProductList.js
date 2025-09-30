import { connect } from 'react-redux';
import ProductTable from '../components/ProductTable';
import withSearch from '../hoc/withSearch';
import filterArrByObjName from '../helpers/filterArrayByName';

import * as act from '../actions/actions';

/** This stuffs below belong to view layer binding */
const mapStateToProps = (state) => {
  return {
    products: filterArrByObjName(state.products, state.textFilter)
  }
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
      textFilter: state.textFilter
    };
  }

  function mapDispatchToPropsForSearchBar(dispatch) {
    return {
      handleSearch: text => dispatch(act.searchFilter(text))
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
