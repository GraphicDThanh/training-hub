import { SOCKET_SERVER } from '.';
import { Creators as CreatorsUser } from '../app/user-list/redux/users';
import { Creators as CreatorsMessage } from '../app/chat-system/redux/messages';
import { Creators as CreatorsSocket } from '../app/chat-app/redux/socket';

const socketData = {
  socketURL: SOCKET_SERVER,
  eventHandlers: {
    addUserSuccess: CreatorsUser.addUserSuccess,
    getUserSuccess: CreatorsUser.getUserSuccess,
    addMessageSuccess: CreatorsMessage.addMessageSuccess,
    getMessageSuccess: CreatorsMessage.getMessageSuccess,

    // socket
    socketConnectSuccess: CreatorsSocket.socketConnectSuccess,
    socketError: CreatorsSocket.socketError,
    socketConnectError: CreatorsSocket.socketConnectError,
    socketReconnectError: CreatorsSocket.socketReconnectError,
    socketReconnectSuccess: CreatorsSocket.socketReconnectSuccess,
  }
}

export default socketData;