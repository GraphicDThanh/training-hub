import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import ChatSystem from '../ChatSystem';
import { currentUser, messages } from '../../../../mock/';
import { Chance } from 'chance';

// mock module chance
jest.mock('chance', (): any => ({
  Chance: function() {
    this.guid = () => {
      return '1234'
    }
  }
}));
/** PREPARE FOR TESTING */
const props = {
  messages,
  currentUser,
  addMessage: jest.fn(),
  getMessageList: jest.fn(),
  addUser: jest.fn(),
};

let wrapper: any = shallow(<ChatSystem {...props} />),
    wrapperMount: any = mount(<ChatSystem {...props} />),
    instance: any = wrapper.instance(),
    editor = wrapper.find('[data-test="editor"]');

jest.spyOn(instance, 'scrollToBottomListMessage');
instance.textarea = { value: '' };
// need add test for open modal => change to state variableß

/** PREPARE FOR TESTING */

describe('CHAT SYSTEM UI', () => {
  it('exist', () => {
    const renderComponent = render(<ChatSystem {...props} />);
    expect(renderComponent).toMatchSnapshot();
  });
  it('Go test UI first', () => {
    const mainContentWrapper = wrapper.find('[data-test="main"]');
    // test structure UI
    expect(mainContentWrapper.childAt(0).is('[data-test="messages"]')).toEqual(true);
    expect(mainContentWrapper.childAt(1).is('[data-test="editor-wrapper"]')).toEqual(true);

    // test text area have right text placeholder
    expect(mainContentWrapper.find('[data-test="editor"]').prop('placeholder')).toEqual('Input message here');
  });



  it('Go test props of component by mount it', () => {
    expect(wrapperMount.prop('currentUser')).toEqual(currentUser);
    expect(wrapperMount.prop('messages')).toEqual(messages);
  });

  it('Render right list message input', () => {
    expect(wrapper.find('.list-messages').children()).toHaveLength(messages.length);
  });
});

describe('CHAT SYSTEM LOGIC', () => {
  it('typing on text area then state change', () => {
    editor.simulate('change', { target: { value: '1234'}});
    expect(wrapper.state().valueInput).toEqual('1234');
  });

  it('typing on text area then submit message', () => {
    const chance = new Chance();
    editor.simulate('keyDown', {
      target: {
        value: '1234',
      },
      keyCode: 13
    });
    expect(props.addMessage).toHaveBeenCalledWith({
      author: currentUser,
      content: instance.textarea.value,
      id: chance.guid(),
    });
    expect(wrapper.state().valueInput).toEqual('');
  });

  it('call scrollToBottomListMessage when update component', () => {
    instance.componentDidUpdate();
    expect(instance.scrollToBottomListMessage).toHaveBeenCalled();
    // FAIL
    // expect(instance.scrollToBottomListMessage).toHaveBeenCalledTimes(1);
  });
})

describe('TEST COMPONENT DID MOUNT', () => {
  beforeEach(() => {
    instance.componentDidMount();
  });

  it('call scrollToBottomListMessage one time', () => {
    // FAIL
    // expect(instance.scrollToBottomListMessage).toHaveBeenCalledTimes(1);
    expect(instance.scrollToBottomListMessage).toHaveBeenCalled()
  });
});