// This is practice coding manual by the way Thanh do again with the basic tutorial about React
// Skeleton of app:
// - Comment Box
// --- Comment List
// ----- Comment
// --- Comment Form

// Create component for CommentBox
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>This is a CommentBox, Welcome to Awesome React!</h1>
        <div>CommentBox Content Here:</div>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

// Create component for CommentList
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <p>Yeah, I&#39;m a comment List. Welcome me to the world!</p>
        <Comment author="Thanh" text="my comment here! I'm happy today"/>
      </div>
    );
  }
});


// Create component for CommentForm
var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        <p>Yeah, I&#39;m a comment From. Welcome me to the world!</p>
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.text.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="author">
          {/* get args from parent: CommentList*/}
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />, 
  document.getElementById('content')
);

// Will continue after that
// The point I go now is use markdown to push code inline
// After is use static data from array in code
// Next, use data from server
// And submit form and push out the data to UI
// Finally, Update data and push to Ui when create new data from submit button
