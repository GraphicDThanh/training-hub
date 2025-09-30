import React from 'react';
import Footer from './Footer';
import VisibleTodoList from '../containers/VisibleTodoList';
import AddTodo from '../containers/AddTodo';
import UndoRedo from '../containers/UndoRedo';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <UndoRedo />
  </div>
)

export default App;
