$(document).ready(function() {
  // Add a class of special to all of the <li> elements at the second level
  // of the nested list.
  $('#selected-plays > li').addClass('special');

  // Add a class of year to all the table cells in the third column of a table.
  $('td:nth-child(3)').addClass('year');

  // Add the class special to the first table row that has the word Tragedy
  // in it.
  $('td:contains(Tragedy):eq(0)') // Find every cell containing "Tragedy"
    .parent() // Select its parent
    .children()
    .addClass('special');

  // Challenge: Select all the list items (<li>s) containing
  // a link (<a>). Add the class afterlink to the sibling list items that follow
  // the ones selected.
  $('li:has(a)')
    .siblings()
    .addClass('afterlink');

  // Challenge: Add the class tragedy to the closest ancestor <ul> of
  // any .pdf link.
  $('a[href$=".pdf"]')
    .closest('ul')
    .addClass('tragedy');
});