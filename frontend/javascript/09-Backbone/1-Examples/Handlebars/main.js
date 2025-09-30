// $(function () {
//   var shoesData = [{name:"Nike", price:199.00 }, {name:"Loafers", price:59.00 }, {name:"Wing Tip", price:259.00 }];
//   function updateAllShoes(shoes)  {
//   var theHTMLListOfShoes = "";
  
//   shoesData.forEach (function (eachShoe)  {
//   // Note the coupling and mixing of HTML and JavaScript; it is tedious to followâ€‹
//    theHTMLListOfShoes += '<li class="shoes">' + '<a href="/' + eachShoe.name.toLowerCase() + '">' + eachShoe.name + ' -- Price: ' + eachShoe.price + '</a></li>';
//       });
//       return theHTMLListOfShoes;
//   }
//   $(".shoesNav").append (updateAllShoes(shoesData));
// });

$(function () {
  var shoesData = [{name:"Nike", price:199.00 }, 
                   {name:"Loafers", price:59.00 }, 
                   {name:"Wing Tip", price:259.00 }];
  // Get the HTML from the template in the script tag
  var theTemplateScript = $('#shoe-template').html();

  // compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  $(".shoesNav").append(theTemplate(shoesData));

  // We pass the shoesData object to the compiled handlerBars function
  // The function will insert all the values from the objects in their respective places
  // in the HTMl and return HTML as a string. Then we use jQuery to append the resulting HTMl
  // string in the page
});