import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, j) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)}
        key={j} />
    );
  }


  render() {
    const grid = this.props.squares.map((row, rowIndex) => {
      const cells = row.map((cell, cellIndex) => {
        return this.renderSquare(rowIndex, cellIndex);
      });

      return <div className="board-row" key={rowIndex}>{cells}</div>
    });
    return (
      <div>
        {grid}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ],
          orders: []
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // make copy for squares array for not direct touch to original
    // const squares = current.squares.slice();
    const squares = JSON.parse(JSON.stringify(current.squares));
    let orders = JSON.parse(JSON.stringify(current.orders));

    // If have winner or that square have value
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';
    orders.push([i + 1, j + 1]);
    // set the change to current state
    this.setState({
      history: history.concat([{
        squares: squares,
        orders: orders
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let orderString = '';

    const moves = history.map((step, move) => {
      orderString = '';

      if (step.orders.length) {
        step.orders.forEach((order, index) => {
          if (index !== step.orders.length - 1) {
            orderString += order.toString() + ' then ';
          } else {
            orderString += order.toString();
          }
        });
      }

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move ? 'Go to move #' + move : 'Go to game start'}
          </button>
          {(move > 0) &&
            <div className="orders">
              <p>Order of moves(column,row):</p>
              {orderString}
            </div>
          }
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner:' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
         <div>{status}</div>
         <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// detect the winner
// winner will have 3 same value in a line
function calculateWinner(squares) {
  // all the lines of the game, go by the order of squares
  const linesByRowColumn = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (let i = 0, len = linesByRowColumn.length; i < len; i ++) {
    const [a, b, c] = linesByRowColumn[i];

    if (squares[a[0]][a[1]] && squares[a[0]][a[1]] === squares[b[0]][b[1]] && squares[b[0]][b[1]] === squares[c[0]][c[1]]) {
      return squares[a[0]][a[1]];
    }
  }

  return null;
}