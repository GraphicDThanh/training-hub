import { createSelector } from 'reselect';

/**
 * getFilter
 * @param {*} state
 */
const getTextFilter = (state) => state.textFilter;
const getTextFilter2 = (state) => state.textFilter2;

// export const getFilter = createSelector([getTextFilter], textFilter => {
//   console.log('testing go getFilter');
//   return textFilter;
// });
export const getFilter = createSelector([getTextFilter], textFilter => textFilter);
export const getFilter2 = createSelector([getTextFilter2], textFilter => textFilter);


/**
 * getProductsFilter
 * @param {*} state
 */
// const getTextFilter = (state) => state.textFilter;
const getProducts = (state) => state.products;

// code test
// export const getProductsFilter = createSelector(
//   [ getTextFilter, getProducts ],
//   (textFilter, products) => {
//     console.log('testing go update products getProductsFilter');
//     return products.filter(product => {product.name.toUpperCase().indexOf(textFilter.toUpperCase()) >= 0)
//   }
// );
export const getProductsFilter = createSelector(
  [ getTextFilter, getProducts ],
  (textFilter, products) => products.filter(product => product.name.toUpperCase().indexOf(textFilter.toUpperCase()) >= 0)
);

/**
 * getModalData
 * @param {*} state
 */
const getStateModal = (state) => state.modal.isShowModal;
const getDataModal = (state) => state.modal.data;

// export const modalSelector = createSelector(
//   [ getStateModal, getDataModal ],
//   (isShowModal, data) => {
//     console.log('testing go modalSelector');
//     return ({ isShowModal, data })
//   }
// );
export const getModalData = createSelector(
  [ getStateModal, getDataModal ],
  (isShowModal, data) => ({ isShowModal, data })
);