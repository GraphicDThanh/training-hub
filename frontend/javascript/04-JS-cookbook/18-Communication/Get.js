function sendData(evt) {
  // cancel default from submittal
  evt = evt || window.event;
  evt.preventDefault();
  evt.returnValue = false;

  // get input data
  var one = encodeURIComponent(document.getElementById("one").value);
  var two = encodeURIComponent(document.getElementById("two").value);
  var params = "one" + one + "two=" + two;

  // prep request
  if (!http) {
    http = new XMLHttpRequest();
  }
  var url = "ajaxserver.php?" + params;
  http.open("GET", url, true);

  // callback function
  http.onreadystatechange = processResult;

  // make Ajax call with params
  http.send(null);
}