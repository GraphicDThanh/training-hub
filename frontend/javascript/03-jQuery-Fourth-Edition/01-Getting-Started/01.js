// $(document).ready(function() {
//   $('div.poem-stanza').addClass('highlight');
// });

function addHighLightClass() {
  $('div.poem-stanza').addClass('highlight');
}

$(document).ready(addHighLightClass);

$(document).ready(function() {
  console.log('hello');
  console.log(52);
  console.log($('div.poem-stanza'));
});