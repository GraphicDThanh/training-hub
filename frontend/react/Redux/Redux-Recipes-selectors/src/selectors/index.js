import { createSelector } from 'reselect'

const getVisibilityFilter = state => state.visibilityFilter
const getTodos = state => state.todos.present

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    console.log('testing visibilityFilter', visibilityFilter);
    console.log('testing todos', todos);
    let result = [];
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        // return todos;
        result = todos;
      case 'SHOW_COMPLETED':
        result = todos.filter(t => t.completed);
        // return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        result = todos.filter(t => !t.completed);
        // return todos.filter(t => !t.completed);
      default:
        result = todos;
        // return todos;
    }

    console.log('testing result filter toodos', result);
    return result;
  }
)