import { combineReducers } from 'redux';
import * as act from '../actions/actions';
import { generateListProduct } from '../helpers/generator';

// handle single product
const product = (state, action) => {
  switch (action.type) {
    case act.ADD_PRODUCT:
    case act.ADD_SINGLE_PRODUCT_RANDOM:
      return {
        id: action.id,
        name: action.name,
        price: action.price,
        image: action.image
      };
    case act.EDIT_PRODUCT:
      if (state.id !== action.id) return state;
      return {
        ...state,
        name: action.name,
        price: action.price,
        image: action.image
      };
    default:
      return state;
  }
}

// handle list of products
const products = (state = [], action) => {
  switch (action.type) {
    case act.ADD_PRODUCT:
    case act.ADD_SINGLE_PRODUCT_RANDOM:
      return [
        ...state,
        product(undefined, action)
      ];

    case act.ADD_LIST_PRODUCT_RANDOM:
      return state.concat(generateListProduct(5));

     case act.EDIT_PRODUCT:
      return state.map(p => product(p, action));

    case act.DELETE_PRODUCT:
      return state.filter(p => p.id !== action.id);
    default:
      return state;
  }
}

const textFilter = (state = '', action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return action.textFilter;
    default:
      return state;
  }
}
const textFilter2 = (state = '', action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER_2':
      console.log('testing action', action);
      return action.textFilter;
    default:
      return state;
  }
}

const modal = (
  state = {
    isShowModal: false,
    data: {}
  },
  action
) => {
  if (action.type === 'TOGGLE_MODAL') {
    return {
      ...state,
      isShowModal: !state.isShowModal,
      data: action.product
    };
  } else {
    return state;
  }
}

const productApp = combineReducers({
  products,
  textFilter,
  textFilter2,
  modal
});

export default productApp;
