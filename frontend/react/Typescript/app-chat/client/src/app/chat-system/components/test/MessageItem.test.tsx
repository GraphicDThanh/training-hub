import * as React from 'react';
import { shallow, render } from 'enzyme';
import { MessageItem } from '../MessageItem';
import { message, currentUser } from '../../../../mock/';

const props = {
  currentUser,
  message
};
describe('TEST COMPONENT MESSAGE ITEM', () => {
  it('exist', () => {
    const renderComponent = render(<MessageItem {...props}/>);
    expect(renderComponent).toMatchSnapshot();
  });

  it('Message Item content', () => {
    const {
      author: { id, avatar, name },
      content
    } = message,
    { id: currentId, avatar: currentAvatar } = currentUser;

    const wrapper = shallow(<MessageItem {...props}/>);
    const messageItemWrapper = wrapper.find('.message-item');

    // render right values: avatar, message, name, owner
    expect(messageItemWrapper.find('.avatar').prop('src')).toEqual(avatar ? avatar : currentAvatar)
    expect(messageItemWrapper.find('.message').text()).toEqual(content);
    expect(messageItemWrapper.find('.name').text()).toEqual(name);
    if (id === currentId) {
      expect(wrapper.exists('.owner')).toEqual(true);
    }
  });
});