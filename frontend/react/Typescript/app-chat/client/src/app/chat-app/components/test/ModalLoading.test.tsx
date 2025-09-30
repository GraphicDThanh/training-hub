import * as React from 'react';
import { render } from 'enzyme';
import ModalLoading from '../ModalLoading';

describe('component Modal Loading', () => {
  it('snapshot', () => {
    let message = ['ACTION_1', 'ACTION_2'];
    const renderComponent = render(<ModalLoading message={message}/>);
    expect(renderComponent).toMatchSnapshot();
  });

  it('snapshot without props', () => {
    const renderComponent = render(<ModalLoading/>);
    expect(renderComponent).toMatchSnapshot();
  });
})