import * as React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/routes';
import { history } from '../../../AppRouter';
import { validateUrl } from '../../../utils';

type Props = {
  user: any,
  updateProfile: (name: string, avatar: string) => {}
}

type State = {
  name: string,
  avatar: string,
  errorMessage: string,
}

class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      avatar: '',
      errorMessage: '',
    }
  }

  componentDidMount = () => {
    const { user } = this.props;
    const { displayName, photoURL } = user;
    this.setState({
      name: displayName,
      avatar: photoURL,
    });
  }

  private handleUpdateProfile = () => {
    const { updateProfile, user } = this.props;
    const { displayName, photoURL } = user;
    const { name, avatar } = this.state;
    const validUrl = validateUrl(avatar);
    const haveChangeData = name !== displayName || avatar !== photoURL;
    const conditionProfile = name && avatar && validUrl && haveChangeData;
    let errorMessage = '';

    if (conditionProfile) {
      updateProfile(name, avatar);
      setTimeout(() => {
        history.push(ROUTES.HOME);
      }, 500)
    } else {
      if (!haveChangeData) {
        errorMessage = 'Please change data!';
      } else if (!validUrl) {
        errorMessage = 'Avatar url invalid!';
      } else {
        errorMessage = 'Missing data!';
      }

      this.setState({
        errorMessage
      });
    }
  }

  private handleChangeName = (e: any) => {
    this.setState({
      name: e.target.value
    });
  }

  private handleChangeAvatar = (e: any) => {
    this.setState({
      avatar: e.target.value
    });
  }

  render() {
    const { name, avatar, errorMessage } = this.state;
    return (
      <div className="container center profile cute-bg">
        <Link to={ROUTES.HOME} className="left">Back to Home</Link>
        <div className="content-wrapper">
          <h2>Edit User Profile</h2>
          { errorMessage && <span className="error-message">{errorMessage}</span>}
          <div className="form-edit">
            <div className="form-group">
              <label htmlFor="Name" aria-hidden />
              <input
                type="text"
                className="form-control"
                placeholder="User display name"
                value={name}
                data-attr="name"
                onChange={this.handleChangeName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Avatar" aria-hidden />
              <input
                type="text"
                className="form-control"
                placeholder="Avatar url online"
                value={avatar}
                data-attr="avatar"
                onChange={this.handleChangeAvatar}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={this.handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;