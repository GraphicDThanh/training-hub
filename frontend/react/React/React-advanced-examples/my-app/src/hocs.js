import React from 'react';
import ReactDOM from 'react-dom';

let DataSource = {
  getComments: function() {
    const comments = [
      {
        comment: 'comment 1',
        id: 1
      },
      {
        comment: 'comment 2',
        id: 2
      },
      {
        comment: 'comment 3',
        id: 3
      },
      {
        comment: 'comment 4',
        id: 4
      },
    ];
    return comments;
  },

  getBlogPost: function() {
    const posts = [
      {
        post: 'post 1',
        id: 1
      },
      {
        post: 'post 2',
        id: 2
      },
      {
        post: 'post 3',
        id: 3
      },
      {
        post: 'post 4',
        id: 4
      },
    ];
    return posts;
  }
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li key={this.props.comment.id}>{this.props.comment.comment}</li>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li key={this.props.post.id}>{this.props.post.post}</li>
    );
  }
}

class CommentList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.data.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </ul>
    );
  }
}

class PostList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.data.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
    );
  }
}

function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);

      this.state = {
        data: selectData(DataSource, props)
      };
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostListWithSubscription = withSubscription(
  PostList,
  (DataSource) => DataSource.getBlogPost()
);


ReactDOM.render(
  <div>
    <h2>Result of using HOCs to render components base on a subscription function</h2>
    <CommentListWithSubscription />
    <BlogPostListWithSubscription />
  </div>,
  document.getElementById('root')
);