import * as React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { StoreState } from '../../../../types/';
import Users from '../../components/Users';
import UsersContainer, { mapStateToProps } from '../Users';
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

describe('Users container', () => {
  it('Render Users container', () => {
    const container = shallow(
      <Provider store={store}>
        <UsersContainer />
      </Provider>
    );
    expect(container.find(UsersContainer)).toHaveLength(1);
  });

  it('mapStateToProps', () => {
    const state = {
      loading: [],
      error: {},
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
      getUser: jest.fn(),
    };

    const wrapper = shallow(
      <Users {...props}/>
    );
    expect(wrapper.find('.list-content').children()).toHaveLength(users.length);
  });
});
