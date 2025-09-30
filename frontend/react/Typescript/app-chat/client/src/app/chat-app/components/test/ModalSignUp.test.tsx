import * as React from 'react';
import { mount, render } from 'enzyme';
import ModalSignUp from '../ModalSignUp';

const props = {
  addUser: jest.fn(),
  toggleModalSignUp: jest.fn(),
};

const component: any = mount(<ModalSignUp {...props} />);

describe('component Modal Sign Up', () => {
  it('smapshot', () => {
    const renderComponent = render(<ModalSignUp {...props} />);
    expect(renderComponent).toMatchSnapshot();
  });

  it('change name call function', () => {
    let name = 'Testing';
    component.find('[data-attr="name"]').simulate('change', {
      target: {
        value: name
      }
    });

    expect(component.state().name).toEqual(name);
  });

  it('change avatar call function', () => {
    let avatar = '../../../../assets/images/bear.jpeg';
    let event = {
      target: {
        value: avatar
      }
    };
    component.find('[data-attr="avatar"]').simulate('change', event);
    expect(component.state().avatar).toEqual(avatar);
  });

  it('click button join room', () => {
    component.find('[data-attr="btn-join"]').simulate('click');
    expect(props.addUser).toHaveBeenCalledTimes(1);
    expect(props.toggleModalSignUp).toHaveBeenCalledTimes(1);
  })
});