import { combineReducers } from 'redux';
import * as act from '../actions/';
import { handleActions, combineActions } from 'redux-actions';
import { generateListProduct } from '../helpers/generator';
// import { persistReducer } from 'redux-persist';

// handle single product
const product = (state, action) => {
  const {type, payload: data} = action;

  switch (type) {
    case act.ADD_PRODUCT:
    case act.ADD_SINGLE_PRODUCT_RANDOM:
      return {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image
      };
    case act.EDIT_PRODUCT:
      if (state.id !== data.id) return state;
      return {
        ...state,
        name: data.name,
        price: data.price,
        image: data.image
      };
    default:
      return state;
  }
}

// handle list of products
const productsReducer = handleActions(
  {
    [combineActions(act.addProduct, act.addSingleProductRandom)]: (state, action) => [...state, product(undefined, action)],

    [act.addListProductRandom]: (state, { payload: number }) => state.concat(generateListProduct(number)),

    [act.editProduct]: (state, action) => state.map(
      p => product(p, action)
    ),

    [act.deleteProduct]: (state, { payload: id }) => state.filter(
      p => p.id !== id
    )
  }, []
);

const searchReducer = handleActions({
  [act.setTextFilter]: (state, { payload: textFilter }) => textFilter
}, '');

const searchReducer2 = handleActions({
  [act.setTextFilter2]: (state, { payload: textFilter }) => textFilter
}, '');

const modalReducer = handleActions(
  {
    [act.toggleModal]: (state, { payload: data }) => ({
      ...state,
      isShowModal: !state.isShowModal,
      data: data
    })
  },
  {
    isShowModal: false,
    data: {}
  }
);

// const persistConfig = {
//   key: 'root',
//   storage,
// }

const productApp = combineReducers({
  products: productsReducer,
  // products: persistReducer(persistConfig, productsReducer),
  textFilter: searchReducer,
  textFilter2: searchReducer2,
  modal: modalReducer
});

export default productApp;

/**
 * Example code boilerplate of handleActions - Generating Reducer
 */
// function createReducer(handlers, initialState) {
//   return function reducer(state = initialState, action) {
//     if (handlers.hasOwnProperty(action.type)) {
//       return handlers[action.type](state, action);
//     } else {
//       return state;
//     }
//   }
// }