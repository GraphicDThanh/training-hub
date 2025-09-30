import { connect } from 'react-redux';
import { toggleTodo, VisibilityFilters } from './../actions/index';
import TodoList from '../components/TodoList';

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(
        t => t.completed
      );
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(
        t => !t.completed
      );
    default:
      return todos;
  }
};

// func use to transform the current Redux store state into the props general call mapStateToProps
const mapStateToProps = state => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter
  )
});

// func receive dispatch method and return callback props
const mapDispatchToProps = dispatch => ({
  onTodoClick: id => {
    dispatch(toggleTodo(id))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);