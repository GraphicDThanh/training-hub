/*
9. Write a program in C# Sharp to create a list of numbers and display numbers greater than 80.
Test Data :
The members of the list are :
55 200 740 76 230 482 95
Expected Output :
The numbers greater than 80 are :
200
740
230
482
95
*/

int [] numbers = [55, 200, 740, 76, 230, 482, 95];
var gte80 = numbers.Where(num => num > 80);
foreach (var num in gte80)
{
    Console.WriteLine(num);
}