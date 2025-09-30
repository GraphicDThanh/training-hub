import * as React from 'react';
import { render, shallow } from 'enzyme';
import Modal from '../Modal';

let props = {
  title: 'Modal Testing',
  footer: <button>Ok</button>,
  children: <p>Hello Modal</p>
};

describe('common component modal', () => {
  it('snapshot', () => {
    const renderComponent = render(<Modal {...props}/>);
    expect(renderComponent).toMatchSnapshot();
  });

  it('test empty props', () => {
    const component = shallow(<Modal />);

    expect(component.exists('.title')).toEqual(false);
    expect(component.exists('.modal-header')).toEqual(false);
    expect(component.exists('.modal-body')).toEqual(false);
    expect(component.exists('.modal-footer')).toEqual(false);
  });

  it('test UI with full props expect', () => {
    const component = shallow(<Modal {...props}/>);

    expect(component.exists('.modal-footer')).toEqual(true);
    expect(component.find('.title').text()).toEqual(props.title);
    expect(component.containsMatchingElement(props.footer)).toEqual(true);
    expect(component.containsMatchingElement(props.children)).toEqual(true);
  })
})