import * as React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { StoreState } from '../../../../types/';
import ChatApp from '../../components/ChatApp';
import ChatAppContainer, { mapStateToProps } from '../ChatApp';
import { messages, users } from '../../../../mock/';

const initialState: StoreState = {
  users: [],
  messages: [],
  error: {},
  loading: [],
  modal: [],
  auth: {},
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('Chat App container', () => {
  it('Render Chat App container', () => {
    const container = shallow(
      <Provider store={store}>
        <ChatAppContainer />
      </Provider>
    );
    expect(container.find(ChatAppContainer)).toHaveLength(1);
  });

  it('mapStateToProps', () => {
    const state = {
      loading: [],
      error: {
        'ACTION_1': 'eror 1',
      },
      showModalSignUp: false,
      messages,
      users,
      modal: {
        showModalSignUp: true
      },
      auth: {},
    };

    const props = {
      ...mapStateToProps(state),
      socketConnectRequest: jest.fn(),
      addUser: jest.fn(),
      signOut: jest.fn(),
      sync: jest.fn(),
    };

    const wrapper = shallow(
      <ChatApp {...props}/>
    );

    const instance = wrapper.instance();
    if (instance && instance.componentDidMount) {
      instance.componentDidMount();
      expect(props.socketConnectRequest).toHaveBeenCalled();
    }
  });
});