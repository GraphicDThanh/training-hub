import { connect } from 'react-redux'
import { toggleTodo, VisibilityFilters } from './../actions/index'
import TodoList from '../components/TodoList'
// import { getVisibleTodos } from '../selectors'

const getVisibleTodos2 = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      return todos
  }
}
// func use to transform the current Redux store state into the props general call mapStateToProps
const mapStateToProps = state => {
  return {
    todos: getVisibleTodos2(state.todos.present, state.visibilityFilter)
    // todos: getVisibleTodos(state)
  }
}

// func receive dispatch method and return callback props
const mapDispatchToProps = dispatch => ({
  onTodoClick: id => {
    dispatch(toggleTodo(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)