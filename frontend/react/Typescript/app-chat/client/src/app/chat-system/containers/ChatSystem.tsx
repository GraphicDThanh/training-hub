import ChatSystem from '../components/ChatSystem';
import { connect } from 'react-redux';
import { StoreState } from '../../../types/';
import { getCurrentUser } from '../../../utils/';
import { Creators as CreatorsUser } from '../../user-list/redux/users';
import { Creators as CreatorMessage } from '../redux/messages';

export const mapStateToProps = (state: StoreState) => ({
  messages: state.messages,
  currentUser: getCurrentUser(state.users)
});

const mapDispatchToProps = {
  addMessage: CreatorMessage.addMessage,
  addUser: CreatorsUser.addUser,
  getMessageList: CreatorMessage.getMessageList,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatSystem);