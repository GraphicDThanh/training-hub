import { connect } from 'react-redux';
import { StoreState } from '../../../types/';
import Profile from '../components/Profile';
import { Creators as CreatorsAuth } from '../redux/auth';

// export for testing
export const mapStateToProps = (state: StoreState) => {
  return {
    user: state.auth.user,
  };
}

// export for testing
export const mapDispatchToProps = {
  updateProfile: CreatorsAuth.updateProfileRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);