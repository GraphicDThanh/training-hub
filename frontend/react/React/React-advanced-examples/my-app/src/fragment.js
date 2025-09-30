import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
      <React.Fragment>
        Some text.
        <h2>A heading</h2>
        More text.
        <h2>Another heading</h2>
        Even more text.
      </React.Fragment>
     );
  }
  ReactDOM.render(<Example />, document.getElementById('root'));