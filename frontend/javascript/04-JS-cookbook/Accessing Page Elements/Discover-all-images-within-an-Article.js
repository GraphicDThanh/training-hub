var imgString = '';

// find all articles
var articles = document.getElementByTagName('article');

// find all images in articles
for (var i = 0; i < articles.length; i ++) {
  var imgs = articles[i].getElementByTagName('img');

  // print put src
  for (var j = 0; j < imgs.length; i ++) {
    var img = imgs[j];
    imgString += img.src + "<br />";
  }
}

document.getElementById("result").innerHTML = imgString;