import * as React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { StoreState } from '../../../../types/';
import ChatSystem from '../../components/ChatSystem';
import ChatSystemContainer, { mapStateToProps } from '../ChatSystem';
import { messages, usersHaveCurrent } from '../../../../mock/';

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

describe('Chat System container', () => {
  it('Render Chat System container', () => {
    const container = shallow(
      <Provider store={store}>
        <ChatSystemContainer />
      </Provider>
    );
    expect(container.find(ChatSystemContainer)).toHaveLength(1);
  });

  it('mapStateToProps', () => {
    const state = {
      loading: [],
      error: {},
      showModalSignUp: false,
      messages,
      users: usersHaveCurrent,
      modal: {
        showModalSignUp: true
      },
      auth: {},
    };

    const props = {
      ...mapStateToProps(state),
      addMessage: jest.fn(),
      addUser: jest.fn(),
      getMessageList: jest.fn(),
    };

    const wrapper = shallow(
      <ChatSystem {...props}/>
    );

    expect(wrapper.find('.list-messages').children()).toHaveLength(messages.length);
  });
});
