import { connect } from 'react-redux';
import ProductTable from '../components/ProductTable';
import withSearch from '../hoc/withSearch';
import { getProductsFilter, getFilter } from '../selectors/';

import * as actions from '../actions/';

/** This stuffs below belong to view layer binding */
const mapStateToProps = (state) => ({ products: getProductsFilter(state) });

const mapDispatchToProps = (dispatch) => ({
  handleEditProduct: product => {
    dispatch(actions.toggleModal(product));
  },
  handleDeleteProduct: id => dispatch(actions.deleteProduct(id))
});

const mapStateToPropsForSearchBar = state => ({ textFilter: getFilter(state) })
// const mapStateToPropsForSearchBar = (state) => {
//   return ({
//     textFilter: getFilter(state)
//   })
// };

const mapDispatchToPropsForSearchBar = (dispatch) => ({
  handleSearch: text => dispatch(actions.setTextFilter(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSearch(
  ProductTable,
  mapStateToPropsForSearchBar,
  mapDispatchToPropsForSearchBar
));
