import * as React from 'react';
import UserItem from '../UserItem';
import { user } from '../../../../mock/';
import { shallow, render } from 'enzyme';

const wrapper = shallow(<UserItem user={user}/>);

describe('TEST COMPONENT USER ITEM', () => {
  it('exist', () => {
    const renderComponent = render(<UserItem user={user}/>);
    expect(renderComponent).toMatchSnapshot();
  });

  it('check UI of user item component', () => {
    expect(wrapper.find('.user')).toHaveLength(1);
    expect(wrapper.find('.avatar-wrapper')).toHaveLength(1);
  });

  it('user item should build right data', () => {
    expect(wrapper.find('[data-attr="avatar"]').prop('src')).toEqual(user.avatar);
    expect(wrapper.find('[data-attr="name"]').text()).toEqual(user.name);
  });
});