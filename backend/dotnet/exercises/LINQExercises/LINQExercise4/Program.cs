/*
4. Write a program in C# Sharp to display the number and frequency of a given number from an array.
Expected Output :
The number and the Frequency are :
Number 5 appears 3 times
Number 9 appears 2 times
Number 1 appears 1 times
. . . .
*/
int[] numbers = [ 5, 9, 1, 5, 5, 9 ];
var queryGroup = numbers.GroupBy(num => num);
Console.WriteLine("The number and the Frequency are :");
foreach (var group in queryGroup)
{
    Console.WriteLine("Number {0} appears {1} times", group.Key, group.Count());
}

// .GroupBy() help group elements in a sequence
// Ref: https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupby