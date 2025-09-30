// stop event propagation
function cancelPropagation (event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}

cancelPropagation(event);