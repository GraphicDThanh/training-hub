import React from 'react'

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => {
  console.log('testing canUndo', canUndo)
  console.log('testing canRedo', canRedo)
  console.log('testing onUndo', onUndo)
  console.log('testing onRedo', onRedo)
  return (
    <p>
      <button onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
    </p>
  )
}

export default UndoRedo