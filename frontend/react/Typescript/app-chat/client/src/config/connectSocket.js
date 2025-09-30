import { bindActionCreators } from 'redux';
import { eventChannel } from 'redux-saga';
import socketIo from 'socket.io-client';
/**
 * socket io intagerate to redux-saga
 * @param socketURL
 * @param subscribeData
 * @param eventHandlers
 */
const connectSocket = ({
  socketURL, // the url our socket connects to/
  eventHandlers,// the action we want our socket to dispatch
}) => eventChannel(
  emitter => {
    // instantiante the web socket
    const ws = socketIo(socketURL);

    // bind eventHandlers to emitter
    const boundEventHandlers = bindActionCreators(eventHandlers, emitter);

    ws.on('userConnected', (data) => {
      boundEventHandlers.addUserSuccess(JSON.parse(data));
    });

    ws.on('userDisconnected', (data) => {
      boundEventHandlers.getUserSuccess(JSON.parse(data))
    });

    ws.on('existUser', (data) => {
      boundEventHandlers.addUserSuccess();
    });

    ws.on('getUser', (data) => {
      boundEventHandlers.getUserSuccess(JSON.parse(data));
    });

    ws.on('addMessage', (data) => {
      boundEventHandlers.addMessageSuccess(JSON.parse(data));
    });

    ws.on('getMessage', (data) => {
      boundEventHandlers.getMessageSuccess(JSON.parse(data));
    });

    // socket connect listen
    ws.on('connect', () => {
      boundEventHandlers.socketConnectSuccess();
    });
    // socket error listen
    ws.on('error', (err) => {
      boundEventHandlers.socketError(err);
    });

    ws.on('connect_error', (err) => {
      boundEventHandlers.socketConnectError(err);
    });

    ws.on('reconnect_error', (err) => {
      boundEventHandlers.socketReconnectError(err);
    });

    ws.on('reconnect', (err) => {
      boundEventHandlers.socketReconnectSuccess(err);
    });

    return () => {
      ws.close();
    }
  }
);

export default connectSocket;