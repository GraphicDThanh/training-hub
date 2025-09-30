import undoable, { includeAction } from 'redux-undo'

const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

// function undorable(reducer) {
//   const initialState = {
//     past: [],
//     present: reducer(undefined, {}),
//     future: []
//   };

//   return function (state = initialState, action) {
//     const { past, present, future } = state

//     console.log('testing action.type', action.type);
//     switch (action.type) {
//       case 'UNDO':
//         const previous = past[past.length - 1]
//         const newPast = past.slice(0, past.length - 1)
//         return {
//           past: newPast,
//           present: previous,
//           future: [present, ...future]
//         }

//       case 'REDO':
//         const next = future[0]
//         const newFuture = future.slice(0)
//         return {
//           past: [...past, present],
//           present: next,
//           future: newFuture
//         }

//       default:
//         const newPresent = reducer(present, action)
//         if (present === newPresent) {
//           return state
//         }

//         return {
//           past: [...past, present],
//           present: newPresent,
//           future: []
//         }
//     }
//   }
// }

const undoableTodos = undoable(todos, { filter: includeAction(['ADD_TODO', 'TOGGLE_TODO']) })

export default undoableTodos
