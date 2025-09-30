import * as React from 'react';
import Users from '../Users';
import { users } from '../../../../mock/';
import { shallow, render } from 'enzyme';

const props = {
  users: users,
  getUser: jest.fn(),
};
const wrapper = shallow(<Users {...props}/>);

describe('TEST COMPONENT USER ITEM', () => {
  it('exist', () => {
    const renderComponent = render(<Users {...props}/>);
    expect(renderComponent).toMatchSnapshot();
  });

  it('test UI of Users component', () => {
    expect(wrapper.find('.user-list')).toHaveLength(1);
  });

  it('render right number of user', () => {
    expect(wrapper.find('.list-content').children()).toHaveLength(users.length);
  });
});