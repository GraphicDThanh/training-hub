import React from 'react';
import ReactDOM from 'react-dom';

// Portal - ex1
/*const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    // return ReactDOM.createPortal(
    //   this.props.children,
    //   this.el
    // );
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser devtool to observe that the button is not a child of the div with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(
  <Parent />,
  document.getElementById('app-root')
);*/

// Portal - ex2
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
    /*return (
      <div>
        {this.props.children}
      </div>
    );*/
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {showModal: false};

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }

  handleHide() {
    this.setState({showModal: false});
  }

  render() {
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <div>
            With a portal, we can render content into a different part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="app">
        This div has overflow: hidden
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<App />, appRoot);
/*
class MyPortal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

class Tooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.width = props.width || 256;
    this.space = props.space || 16;

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  showTooltip() {

  }

  hideTooltip() {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <span>
        {this.props.children}

        {this.state.visible && (
          <MyPortal>

          </MyPortal>
        )}
      </span>
    );
  }
}*/