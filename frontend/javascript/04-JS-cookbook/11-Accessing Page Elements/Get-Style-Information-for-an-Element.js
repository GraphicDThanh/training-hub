function getStyle(elem, cssprop, cssprop2) {
  // IE
  if (elem.currentStyle) {
    return elem.currentStyle[cssprop];
  // other browser
  } else if (document.defaultView && document.defaultView.getComputedStyle) {
    
  } else {

  }
}