// listen to an event
function listenEvent(eventObj, event, eventHandler) {
  if (eventObj.addEventListener) {
    eventObj.addEventListener(event, eventHandler, false);
  } else if (eventObj.attachEvent) {
    event = 'on' + event;
    eventObj.attachEvent(event, eventHandler);
  } else {
    eventObj['on' + event] = eventHandler;
  }
}

// cancel event
function cancelEvent (event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}

window.onload = function() {
  var form = document.forms['picker'];
  listenEvent(form, 'submit', validateFields);
}

function validateFields(evt) {
  evt = evt ? evt : window.event;
  if (invalid) {
    cancelEvent(evt);
  }
}