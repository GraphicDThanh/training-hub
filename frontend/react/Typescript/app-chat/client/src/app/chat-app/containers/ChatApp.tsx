import { connect } from 'react-redux';
import { StoreState } from '../../../types/';
import ChatApp from '../components/ChatApp';
import { Creators as CreatorsSocket } from '../redux/socket';
import { Creators as CreatorsModal } from '../redux/modal';
import { Creators as CreatorsAuth } from '../../auth/redux/auth';
import { getLoadingAction, getError } from '../../../utils/';
import { Creators as CreatorsUser } from '../../user-list/redux/users';

// export for testing
export const mapStateToProps = (state: StoreState) => {
  return {
    loading: getLoadingAction(state.loading),
    error: getError(state.error),
    showModalSignUp: state.modal.showModalSignUp,
    user: state.auth.user,
  };
}

// export for testing
export const mapDispatchToProps = {
  socketConnectRequest: CreatorsSocket.socketConnectRequest,
  toggleModalSignUp: CreatorsModal.toggleModalSignUp,
  addUser: CreatorsUser.addUser,
  signOut: CreatorsAuth.signOut,
  sync: CreatorsAuth.sync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);