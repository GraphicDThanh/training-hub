import * as React from 'react';
import Users from '../../user-list/containers/Users';
import ChatSystem from '../../chat-system/containers/ChatSystem';
import Header from '../containers/Header';
import ModalError from './ModalError';
import ModalLoading from './ModalLoading';
import './styles/ChatApp.css';

interface Props {
  error: object,
  loading: any[],
  user: any,

  addUser: () => {},
  socketConnectRequest: (user: any) => {},
  sync: () => {},
};

class ChatApp extends React.Component<Props, {}> {
  componentDidMount() {
    const {
      socketConnectRequest,
      sync,
      user,
    } = this.props;

    // connect socket
    socketConnectRequest(user);

    sync();
  }

  /**
   * render function
   *
   */
  public render() {
    const {
      loading,
      error,
    } = this.props;

    let isLoading = loading.length ? true : false,
        isError = Object.keys(error).length ? true : false;

    return (
      <React.Fragment>
        <Header />
        <div className="App chat-app-wrapper">
          <div className="clearboth">
            <Users />
            <ChatSystem />
          </div>
        </div>
        {
          isLoading && <ModalLoading message={loading}/>
          ||
          isError && <ModalError error={error}/>
        }
      </React.Fragment>
    );
  }
}


export default ChatApp;