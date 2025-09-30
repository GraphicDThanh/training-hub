import * as actions from './action';

describe('add product', () => {
  it('should create an action to add product', () => {
    const expectedAction = {
      type: 'ADD_PRODUCT',
      name: 'product name',
      price: 47868,
      image: ''
    };
    const product = {
      name: 'product name',
      price: 47868,
      image: ''
    };

    expect(actions.addProduct(product).toEqual(expectedAction))
  })
})