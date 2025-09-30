import { connect } from 'react-redux';
import { StoreState } from '../../../types/';
import Header from '../components/Header';
import { Creators as CreatorsAuth } from '../../auth/redux/auth';

// export for testing
export const mapStateToProps = (state: StoreState) => {
  return {
    user: state.auth.user,
  };
}

// export for testing
export const mapDispatchToProps = {
  signOut: CreatorsAuth.signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);