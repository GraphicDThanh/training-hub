import faker from 'faker';
import { createActions } from 'redux-actions';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_SINGLE_PRODUCT_RANDOM = 'ADD_SINGLE_PRODUCT_RANDOM';
export const ADD_LIST_PRODUCT_RANDOM = 'ADD_LIST_PRODUCT_RANDOM';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_TEXT_FILTER_2 = 'SET_TEXT_FILTER_2';
export const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const {
  addProduct,
  addSingleProductRandom,
  addListProductRandom,
  editProduct,
  deleteProduct,
  setTextFilter,
  setTextFilter2,
  toggleModal
} = createActions({
  [ADD_PRODUCT]: product => ({
    id: faker.random.uuid(),
    name: product.name,
    price: product.price,
    image: product.image
  }),

  [ADD_SINGLE_PRODUCT_RANDOM]: () => ({
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.technics()
  }),

  [ADD_LIST_PRODUCT_RANDOM]: number => number,

  [EDIT_PRODUCT]: product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  }),

  [DELETE_PRODUCT]: id => id,

  [SET_TEXT_FILTER_2]: textFilter2 => textFilter2,

  [SET_TEXT_FILTER]: textFilter => textFilter,

  [TOGGLE_MODAL]: product => product
});

/** Example code for using generating action creators
 *  cannot mix these with logic redux-actions
*/
/**
 * Generating Action Creators
 * @param {object} type of action
 * @param {*} args - payload
 */
// const makeActionCreator = (type, ...argsNames) => (...args) => {
//   console.log('testing type', type);
//   console.log('testing args', args);
//   const action = { type };
//   args.forEach((arg, index) => {
//     action[argsNames[index]] = args[index];
//   });

//   console.log('testing return action', action);
//   return action;
// }

// export const deleteProduct = makeActionCreator(DELETE_PRODUCT, 'id')
// export const setTextFilter2 = makeActionCreator(SET_TEXT_FILTER_2, 'textFilter2')
// export const setTextFilter = makeActionCreator(SET_TEXT_FILTER, 'textFilter')
// export const toggleModal = makeActionCreator(TOGGLE_MODAL, 'product')
// export const addListProductRandom = makeActionCreator(ADD_LIST_PRODUCT_RANDOM, 'number')