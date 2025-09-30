import * as React from 'react';
import { PropsSendModal } from '../../chat-system/components/ChatSystem';
import { Chance } from 'chance';
import Modal from '../../../common/components/Modal';

interface State {
  name: string;
  avatar: string;
};

interface Props extends PropsSendModal {
  toggleModalSignUp: () => void;
}

class ModalSignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      avatar: ''
    };
  }

  private handleChangeName = (e: any) => {
    this.setState({
      name: e.target.value
    })
  }
  private handleChangeAvatar = (e: any) => {
    this.setState({
      avatar: e.target.value
    })
  }

  private handleJoinRoom = () => {
    const { name, avatar } = this.state;
    if (!name) return;

    let chance = new Chance();
    const { addUser, toggleModalSignUp } = this.props;

    addUser({
      name: name,
      avatar: avatar ? avatar: chance.avatar(),
      id: chance.guid(),
    });

    toggleModalSignUp();
  }

  render() {
    const { name, avatar } = this.state;
    let props = {
      title: 'Please add youself to begin chat',
      footer:  <button
        className="btn btn-join"
        data-attr="btn-join"
        onClick={this.handleJoinRoom}>
      Join Room</button>
    };

    return <Modal {...props}>
      <React.Fragment>
        <div className="input-group">
          <label htmlFor="">Your display name:</label>
          <input
            type="text"
            placeholder="Enter your name here"
            data-attr="name"
            className="form-control"
            onChange={this.handleChangeName}
            value={name}
          />
        </div>
        <div className="input-group">
          <label htmlFor="">Your avatar url online:</label>
          <input
            type="text"
            placeholder="Enter your avatar url online here"
            data-attr="avatar"
            className="form-control"
            onChange={this.handleChangeAvatar}
            value={avatar}
          />
        </div>
      </React.Fragment>
    </Modal>;
  }
}

export default ModalSignUp;