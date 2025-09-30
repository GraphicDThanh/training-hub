// begin - Reconciliation
// an example to make the rule of key more clearly
/*const Todo = props => (
  <tr>
    <td>
      <label>{props.id}</label>
    </td>
    <td>
      <input />
    </td>
    <td>
      <label>{props.createAt.toTimeString()}</label>
    </td>
  </tr>
);

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const todoCounter = 1;

    this.state = {
      todoCounter: todoCounter,
      list: [
        {
          id: todoCounter,
          createAt: date,
        }
      ]
    };

    this.addToStart = this.addToStart.bind(this);
    this.addToEnd = this.addToEnd.bind(this);
    this.sortByEarliest = this.sortByEarliest.bind(this);
    this.sortByLastest = this.sortByLastest.bind(this);
  }

  sortByEarliest() {
    const sortedList = this.state.list.sort((a, b) => {
      return a.createAt - b.createAt;
    });

    this.setState({
      list: [...sortedList],
    });
  }

  sortByLastest() {
    const sortedList = this.state.list.sort((a, b) => {
      return b.createAt - a.createAt;
    });

    this.setState({
      list: [...sortedList],
    });
  }

  addToEnd() {
    const date = new Date();
    const nextId = this.state.todoCounter + 1;
    const newList = [
      ...this.state.list,
      {
        id: nextId,
        createAt: date
      }
    ];

    this.setState({
      list: newList,
      todoCounter: nextId,
    });
  }

  addToStart() {
    const date = new Date();
    const nextId = this.state.todoCounter + 1;
    const newList = [
      {
        id: nextId,
        createAt: date
      },
      ...this.state.list,
    ];

    this.setState({
      list: newList,
      todoCounter: nextId,
    });
  }

  render() {
    return (
      <div>
        <code>key=index</code>
        <br />
        <button onClick={this.addToStart}>
          Add New To Start
        </button>
        <button onClick={this.addToEnd}>
          Add New To End
        </button>
        <button onClick={this.sortByEarliest}>
          Sort by Earliest
        </button>
        <button onClick={this.sortByLastest}>
          Sort by Lastest
        </button>

        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th />
              <th>created at</th>
            </tr>
            {this.state.list.map((todo, index) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);*/
// end - Reconciliation