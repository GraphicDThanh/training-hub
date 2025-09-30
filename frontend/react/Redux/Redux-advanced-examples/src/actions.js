import fetch from 'cross-fetch';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

export function loadPostsRequest(subreddit) {
  return {
    type: LOAD_POSTS_REQUEST,
    subreddit
  };
}

export function loadPostsSuccess(subreddit, json) {
  return {
    type: LOAD_POSTS_SUCCESS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export function loadPostsFailure(subreddit, error) {
  return {
    type: LOAD_POSTS_FAILURE,
    subreddit,
    error: error
  }
}

// Redux Thunk middleware use action creator like function
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(loadPostsRequest(subreddit));

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(loadPostsSuccess(subreddit, json)))
      .then(err => dispatch(loadPostsFailure(subreddit, err)));
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  }
}

/**
 * State shapeshape for "Reddit headlines" app look like
 */
// {
//   selectSubreddit: 'front-end',
//   postsBySubreddit: {
//     frontend: {
//       isFetching: true,
//       didInvalidate: false,
//       items: []
//     },
//     reactjs: {
//       isFetching: false,
//       didInvalidate: false,
//       lastUpdated: 31729832176873512,
//       items: [
//         {
//           id: 42,
//           title: 'Confusion about Flux and Relay'
//         },
//         {
//           id: 500,
//           title: 'Creating a Simple Application Using React'
//         }
//       ]
//     }
//   }
// }