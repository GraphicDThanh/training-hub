function sendData(evt) {
  // cancel default from submittal
  evt = evt || window.event;
  evt.preventDefault();
  evt.returnValue = false;

  // get input data
  var one = encodeURIComponent(document.getElementById("one").value);
  replace(/%20/g, '+');
  var params = "one=" + one + "&two=" + two;

  //prep request
  if (!http) {
    http = new XMTHttpRequest();
  }

  var url = "ajaxserver.php";
  http.open("POST", url, true);

  // set up Ajax headers
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.setRequestHeader("Connection", "close");

  // calback function
  http.onreadystatechange = processResult;

  // make Ajax call with params
  http.send(params);
}