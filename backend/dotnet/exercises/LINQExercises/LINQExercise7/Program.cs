/*
7. Write a program in C# Sharp to display numbers, multiplication of numbers with frequency and the frequency of a number in an array.
Test Data :
The numbers in the array are :
5, 1, 9, 2, 3, 7, 4, 5, 6, 8, 7, 6, 3, 4, 5, 2
Expected Output :
Number Number*Frequency Frequency
------------------------------------------------
5 15 3
1 1 1
9 9 1
2 4 2
. . . . . . . .
*/

int [] numbers = [5, 1, 9, 2, 3, 7, 4, 5, 6, 8, 7, 6, 3, 4, 5, 2];
var queryGroup = numbers.GroupBy(num => num);
foreach (var group in queryGroup)
{
    var number = group.Key;
    var numberTimes = group.Count();
    Console.WriteLine("{0} {1} {2}", number, number * numberTimes, numberTimes);
}
