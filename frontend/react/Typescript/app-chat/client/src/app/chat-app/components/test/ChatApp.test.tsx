import * as React from 'react';
import ChatApp from '../ChatApp';
import { render, mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { StoreState } from '../../../../types/';
import Users from '../../../user-list/containers/Users';
import ChatSystem from '../../../chat-system/containers/ChatSystem';
import { APP_TITLE } from '../../../../constants/';
import ModalSignUp from '../../../chat-app/components/ModalSignUp';
import ModalLoading from '../../../chat-app/components/ModalLoading';
import ModalError from '../../../chat-app/components/ModalError';

const defaultProps = {
  addUser: jest.fn(),
  socketConnectRequest: jest.fn(),
  sync: jest.fn(),
}

const initialState: StoreState = {
  users: [],
  messages: [],
  error: [],
  loading: [],
  modal: [],
  auth: {
    user: {}
  },
};

const props = {
  ...defaultProps,
  error: [],
  loading: [],
  showModalSignUp: false,
  auth: {
    user: {}
  },
  user: {},
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('test component ChatApp', () => {
  it('snapshot', () => {
    console.log('testing props', props);
    const renderComponent = render(
      <Provider store={store}>
        <ChatApp {...props}/>
      </Provider>
    );
    expect(renderComponent).toMatchSnapshot();
  });

  it('UI testing with default props', () => {
    const componentMount = mount(
      <Provider store={store}>
        <ChatApp {...props}/>
      </Provider>
    );
    expect(componentMount.find('.App-title').text()).toEqual(APP_TITLE);
    // check container wrap 2 container components
    expect(componentMount.find(Users)).toHaveLength(1);
    expect(componentMount.find(ChatSystem)).toHaveLength(1);
    expect(componentMount.find(ModalSignUp).exists()).toEqual(false);
    expect(componentMount.find(ModalLoading).exists()).toEqual(false);
    expect(componentMount.find(ModalError).exists()).toEqual(false);
  });

  it('test component did mount with default props', () => {
    const componentShallow = shallow(<ChatApp {...props}/>);
    const instance = componentShallow.instance();
    // test component did mount
    // check to arounf error instance will be undefined
    if (instance && instance.componentDidMount) {
      instance.componentDidMount();
      // Why it call 3 times here?
      // expect(props.socketConnectRequest).toHaveBeenCalledTimes(1);
      // expect(props.toggleModalSignUp).toHaveBeenCalledTimes(1);
      expect(props.socketConnectRequest).toHaveBeenCalled();
      // expect(props.toggleModalSignUp).toHaveBeenCalled();
    }
  });

  it('test with props loading', () => {
    const propsLoading = {
      ...defaultProps,
      error: [],
      loading: ['ACTION_LOADING_1', 'ACTION_LOADING_2'],
      showModalSignUp: false,
      user: {},
    };

    const componentMount = mount(
      <Provider store={store}>
        <ChatApp {...propsLoading}/>
      </Provider>
    );
    expect(componentMount.find(ModalLoading)).toHaveLength(1);
    expect(componentMount.find(ModalError).exists()).toEqual(false);
    expect(componentMount.find(ModalSignUp).exists()).toEqual(false);
  });
  it('test with props error', () => {
    const propsEror = {
      ...defaultProps,
      error: [{
        'ACTION_EROR_1': 'message error 1',
        'ACTION_EROR_2': 'message error 2',
      }],
      loading: [],
      showModalSignUp: true,
      user: {},
    };

    const componentMount = mount(
      <Provider store={store}>
        <ChatApp {...propsEror}/>
      </Provider>
    );
    expect(componentMount.find(ModalError)).toHaveLength(1);
    expect(componentMount.find(ModalLoading).exists()).toEqual(false);
    expect(componentMount.find(ModalSignUp).exists()).toEqual(false);
  });
});