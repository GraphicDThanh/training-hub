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
        <VisibleProductList />
        <hr />
        <h3>Below is another search bar separate with the one above, same products list - search bar use HOC to create</h3>
        <VisibleProductList2 />
        <ShowModal />
      </section>
    </div>
  );
}

export default App;
