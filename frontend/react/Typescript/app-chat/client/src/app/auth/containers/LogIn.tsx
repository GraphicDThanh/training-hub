import LogIn from '../components/LogIn';
import { connect } from 'react-redux';
import { Creators as CreatorsAuth } from '../redux/auth';

export const mapDispatchToProps = {
  loginGoogle: CreatorsAuth.loginGoogleRequest,
  login: CreatorsAuth.loginRequest,
}

export default connect(undefined, mapDispatchToProps)(LogIn);
