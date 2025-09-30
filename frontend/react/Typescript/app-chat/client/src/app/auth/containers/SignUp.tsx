import SignUp from '../components/SignUp';
import { connect } from 'react-redux';
import { Creators as CreatorsAuth } from '../redux/auth';
import { getLoadingAction, getError } from '../../../utils/';
import { StoreState } from '../../../types/';

export const mapStateToProps = (state: StoreState) => {
  return {
    loading: getLoadingAction(state.loading),
    error: getError(state.error),
  };
}


export const mapDispatchToProps = {
  signUp: CreatorsAuth.signUpRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
