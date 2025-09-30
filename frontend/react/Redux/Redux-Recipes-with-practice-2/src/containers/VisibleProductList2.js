import { connect } from 'react-redux';
import ProductTable from '../components/ProductTable';
import withSearch from '../hoc/withSearch';
import { getProductsFilter, getFilter2 } from '../selectors/';

import * as actions from '../actions/';

/** This stuffs below belong to view layer binding */
const mapStateToProps = (state) => ({ products: getProductsFilter(state) });

const mapDispatchToProps = (dispatch) => ({
  handleEditProduct: product => {
    dispatch(actions.toggleModal(product));
  },
  handleDeleteProduct: id => dispatch(actions.deleteProduct(id))
});

const mapStateToPropsForSearchBar = state => ({ textFilter: getFilter2(state) })

const mapDispatchToPropsForSearchBar = (dispatch) => ({
  handleSearch: text => dispatch(actions.setTextFilter2(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSearch(
  ProductTable,
  mapStateToPropsForSearchBar,
  mapDispatchToPropsForSearchBar
));
