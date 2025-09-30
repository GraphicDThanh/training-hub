import User from '../components/Users';
import { connect } from 'react-redux';
import { StoreState } from '../../../types/';
import { Creators as CreatorsUser } from '../redux/users';

export const mapStateToProps = (state: StoreState) => ({
  users: state.users,
});

export const mapDispatchToProps = {
  getUser: CreatorsUser.getUser
}


export default connect(mapStateToProps, mapDispatchToProps)(User);
