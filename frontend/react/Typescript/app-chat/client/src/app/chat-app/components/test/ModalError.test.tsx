import * as React from 'react';
import { render } from 'enzyme';
import ModalError from '../ModalError';

describe('component Modal Loading', () => {
  it('snapshot', () => {
    let error = [{
      'ACTION_1': 'error 1'
    }, {
      'ACTION_2': 'error 2'
    }];
    const renderComponent = render(<ModalError error={error}/>);
    expect(renderComponent).toMatchSnapshot();
  });

  it('snapshot without props', () => {
    const renderComponent = render(<ModalError/>);
    expect(renderComponent).toMatchSnapshot();
  });
})