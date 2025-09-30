// Create a prototype for person
function person(id, firstName, lastName, birthday, createDay) {
  this.first_name = firstName;
  this.last_name  = lastName;
  this.birthday   = birthday;
  this.create_day = createDay;

  this.id         = (id >= 10) ? id : '0' + id;
  this.full_name  = firstName + ' ' + lastName;
}

// create an array contain objects
var date = new Date();
var contactList = [
  new person(1, '1thanh', 'Nguyen', new Date('05/03/1992'), date),
  new person(2, '0thphuong', 'bui', new Date('02/01/1990'), date),
  new person(3, 'loc', 'vo', new Date('03/05/1967'), date),
  new person(4, 'chau', 'tran', new Date('12/15/1989'), date),
  new person(5, 'tHuong', 'thpham', new Date('01/12/1980'), date),
  new person(6, 'giang', 'Le', new Date('08/23/1986'), date),
  new person(7, 'thu', 'dinh', new Date('12/2/1995'), date),
  new person(8, 'huong', 'Cao', new Date('08/30/1988'), date),
  new person(9, 'thuan', 'La', new Date('01/01/1987'), date),
  new person(10, 'Thinh', 'Le', new Date('4/07/1979'), date)
];

var contactListLen = contactList.length;

/*
** Format form output a date
** @param {Date} date_input
** @return {String} result
*/
function formatDate(date_input) {
  var date = date_input.getDate(),
    month = date_input.getMonth() + 1,
    year = date_input.getFullYear(),
    result = date + '/' + month + '/' + year;

  return result;
}

/*
** Format form output a list of person
** @param {Array} list
** @return none
*/
function printPerson(list){
  var i = 0,
    listLen = list.length;

  for (; i < listLen; i ++) {
    print_out =
      'Contact   : ' + parseInt(i + 1)    + '\n' +
      'ID        : ' + list[i].id         + '\n' +
      'First Name: ' + list[i].first_name + '\n' +
      'Last Name : ' + list[i].last_name  + '\n' +
      'Full name : ' + list[i].full_name  + '\n' +
      'Birthday  : ' + formatDate(list[i].birthday) + '\n' +
      'Create Day: ' + list[i].create_day + '\n';
    console.log(print_out);
  }
}

/*
** Capitalize First Character Each Word
** @param {String} str
** @return arr result
*/
function capitalizeEachWord(str) {
  var i = 0, result  = [],
    word = str.split(' ');

  for (; i < word.length; i++) {
    temp = word[i].toLowerCase();
    temp = temp.charAt(0).toUpperCase() + temp.substring(1);
    result.push(temp);
  }
  result = result.join(' ');

  return result;
}

/*
** Capitalize full_name
** @param1 {Array} list
** @param2 {String} attribute (have string value)
** @return {Array} list
** call function capitalizeEachWord
*/
function fullNameCapitalize(list, attribute) {
  var i = 0,
    listLen = list.length;

  for (; i < listLen; i ++) {
    list[i][attribute] = capitalizeEachWord(list[i][attribute]);
  }

  return list;
}

/*
** Sort by attribute of a list
** @param1 {Array} list
** @param2 {String} attribute (have string value)
** @return {Array} list
*/
function arraySortByAttribute(list, attribute) {
  var i = 0, 
    j, tmp, 
    len = list.length;

  for (; i < len; i ++) {
    for (j = i + 1; j < len; j ++) {
      if (list[i][attribute] > list[j][attribute]) {
        tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
      }
    }
  }
  return list;
}

/*
** Find element contain character
** @param1 {Array} list
** @param2 {String} attribute
** @param3 {String} character
** @return {Array} result
*/
function searchAndPrintWhichContainCharacter(list, attribute, character) {
  var i = 0, j = 0,
    listLen = list.length,
    result = [];

  for (; i < listLen; i++) {
    if (list[i][attribute].indexOf("th") !== -1) {
      result.push(list[i]);
    }
  }
  return result;
}

/*
** Find element which NOT contain character
** @param1 {Array} list
** @param2 {String} attribute
** @param3 {String} character
** @return {Array} result
*/
function searchAndPrintWhichNotContainCharacter(list, attribute, character) {
  var i = 0, j = 0,
    listLen = list.length,
    result = [];

  for (; i < listLen; i++) {
    if (list[i][attribute].toLowerCase().indexOf(character) === -1) {
      result.push(list[i]);
    }
  }
  return result;
}

/*
** Find element have same the date of birthday
** @param1 {Array} list
** @param2 {String} attribute
** @param3 {Number} specific_day
** @return {Array} result
*/

function findSameSpecificDay(list, attribute, specific_day) {
  var i = 0,
    listLen = list.length,
    result = [];

  for (; i < listLen; i ++) {
    if (list[i][attribute].getDate() === specific_day) {
      result.push(list[i]);
    }
  }

  return result;
}

// Call function to do requirment
console.log('1. PRINT ALL CONTACT WITH FULL NAME');
printPerson(contactList);

console.log('2. PRINT ALL CONTACT WITH FULL NAME CAPITALIZE');
printPerson(fullNameCapitalize(contactList, "full_name"));

console.log('3. PRINT ALL CONTACT WHICH IS SORT BY FIRST-NAME');
printPerson(arraySortByAttribute(contactList, 'first_name'));

console.log('4. PRINT ALL CONTACT WHICH SORT BY BIRTHDAY');
printPerson(arraySortByAttribute(contactList, 'birthday'));

console.log('5. PRINT ALL CONTACT WHICH FIRST NAME CONTAIN CHARACTER TH');
printPerson(searchAndPrintWhichContainCharacter(contactList,"first_name", "th"));

console.log('6. PRINT ALL CONTACT WHICH FIRST NAME NOT CONTAIN CHARACTER TH');
printPerson(searchAndPrintWhichNotContainCharacter(contactList,"first_name", "th"));

console.log('7. PRINT ALL CONTACT WHICH HAVE SAME BIRTHDAY WHICH SPECIFIC DAY INPUT');
printPerson(findSameSpecificDay(contactList, "birthday", 12));