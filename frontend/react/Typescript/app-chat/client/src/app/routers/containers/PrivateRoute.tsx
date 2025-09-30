import PrivateRoute from '../components/PrivateRoute';
import { connect } from 'react-redux';
import { StoreState } from '../../../types/';

export const mapStateToProps = (state: StoreState) => {
  return {
    isAuthenticated: state.auth.user ? !!state.auth.user.uid : !!state.auth.user
  };
};

export default connect(mapStateToProps, {})(PrivateRoute);