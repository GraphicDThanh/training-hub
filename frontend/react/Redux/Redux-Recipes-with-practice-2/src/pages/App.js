import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import AddProduct from '../containers/AddProduct';
import VisibleProductList from '../containers/VisibleProductList';
import VisibleProductList2 from '../containers/VisibleProductList2';
import ShowModal from '../containers/ShowModal';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <section className="app-content">
        <AddProduct />
        <h4>Search by name</h4>
        <VisibleProductList />
        <hr />
        <h4>Search by price</h4>
        <VisibleProductList2 />
        <ShowModal />
      </section>
    </div>
  );
}

export default App;
