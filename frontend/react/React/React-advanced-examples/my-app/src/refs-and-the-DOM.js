// begin - Refs and the DOM
/*class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
  }

  render() {
    return <div ref={this.myRef}>Hello</div>
  }
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById('root')
);*/
/*
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    // create a ref to store the Input text DOM Element
    this.customTextInputRef = null;
    this.setTextInputRef = element => {
      this.customTextInputRef = element;
    }

    this.focusTextInput = () => {
      if (this.customTextInputRef) this.customTextInputRef.focus();
    };
  }

  componentDidMount() {
    this.focusTextInput();
  }

  render() {
    // tell React that we want to associate the <input> ref with the 'textInput' that we create in the constructor
    return(
      <div>
        <input
          type="text"
          ref={this.setTextInputRef} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <CustomTextInput />,
  document.getElementById('root')
);*/

/*class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.autoFocusInputRef = React.createRef();
  }

  componentDidMount() {
    this.autoFocusInputRef.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.autoFocusInputRef} />
    );
  }
}*/
/*
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

ReactDOM.render(
  <CustomTextInput inputRef={el => this.inputElement = el} />,
  document.getElementById('root')
);*/

// end - Refs and the DOM