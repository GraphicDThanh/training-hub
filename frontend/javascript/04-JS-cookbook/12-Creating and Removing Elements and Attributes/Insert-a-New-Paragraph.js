// get the target div
var div = document.getElementById("target");

// retrive a collection of paragraphs
var paras = div.getelementsByTagName("p");

// if a third paras exists, insert the new element before
// otherwise, append the paragraph to the end of the div
var newPara = document.createElement("p");
if (paras[3]) {
  div.insertBefore(newPara, paras[3]);
} else {
  div.appendChild(newPara);
}