import faker from 'faker';

function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });

    return action;
  }
}

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_LIST_PRODUCT_RANDOM = 'ADD_LIST_PRODUCT_RANDOM';
export const ADD_SINGLE_PRODUCT_RANDOM = 'ADD_SINGLE_PRODUCT_RANDOM';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
export const SET_TEXT_FILTER_2 = 'SET_TEXT_FILTER_2';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    id: faker.random.uuid(),
    name: product.name,
    price: product.price,
    image: product.image
  };
}

export const addSingleProductRandom = () => {
  return {
    type: ADD_SINGLE_PRODUCT_RANDOM,
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.technics()
  };
}

export const editProduct = product => {
  return {
    type: EDIT_PRODUCT,
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  };
}

export const addListProductsRandom = makeActionCreator(ADD_LIST_PRODUCT_RANDOM);
export const deleteProduct = makeActionCreator(DELETE_PRODUCT, 'id');
export const searchFilter = makeActionCreator(SET_TEXT_FILTER, 'textFilter');
export const searchFilter2 = makeActionCreator(SET_TEXT_FILTER_2, 'textFilter');
export const toggleModal = makeActionCreator(TOGGLE_MODAL, 'product');
