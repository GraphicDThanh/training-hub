import React from 'react';
import ReactDOM from 'react-dom';

// begin - JSX In Depth

// JSX will compile
<MyChicken hair="short" numberOfRice={2}>
  Hug Me
</MyChicken>

// into
React.createElement(
  MyChicken,
  {hair: 'short', numberOfRice: 2},
  'Hug Me'
);

// if Component have no children, it can be wrote:
<MyChicken hair="short" />

// part - Specifying The React Element Type
//- Using Dot Notation for JSX Type
const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Image a {props.color} datepicker here.</div>
  }
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />
}
//- User-Defined Components Must Be Capitalized
// If we call Hello is "hello" the code will not run
function Hello(props) {
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  return <Hello toWhat="World"/>
}

//- Choosing the Type at Runtime
import {PhotoStory, VideStory} from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />
}
///////////////////////////////////////////

//- part: Props in JSX
//- JavaScript Expressions as Props
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>
  } else {
    description = <i>odd</i>
  }

  return <div>{props.number} is an {description} number</div>;
}

//- Spread Attributes
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}

///
const Button = props => {
  const { kind, ...other } = props;
  const className = kind = 'primary' ? 'PrimaryButton' : 'SecondaryButton';
  return <button class={className} {...other} />
}

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log('clicked!')}>
        Hello World!
      </Button>
    </div>
  );
}

// - part: Children in JSX
<MyComponent>Hello world!</MyComponent>

<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>

// JSX can also return an array of element
render() {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}

// - expression as children
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}

// if want to build null. undefined to HTML, we ca usr String method like this
<div>
  My JS variable is {String(myvariable)}
</div>
//////////////////////


ReactDOM.render(
  <HelloWorld />,
  document.getElementById('root')
);
// end - JSX In Depth

