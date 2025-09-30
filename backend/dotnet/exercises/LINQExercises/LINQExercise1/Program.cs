/*
1. Write a program in C# Sharp to show how the three parts of a query operation execute.
Expected Output:
The numbers which produce the remainder 0 after divided by 2 are :
0 2 4 6 8
*/
Console.WriteLine("--- LINQ Exercise 1 ---");
int [] numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Console.WriteLine("With LINQ Query Expression :");
// create query
var expressionQuery = from num in numbers
                      where (num % 2) == 0
                      select num;

// execute query
Console.WriteLine("The numbers which produce the remainder 0 after divided by 2 are :");
foreach (int num in expressionQuery)
{
    Console.Write("{0} ", num);
}

Console.WriteLine();
Console.WriteLine("With LINQ Extension Methods :");
// create query
var methodQuery = numbers.Where(num => (num % 2) == 0);
Console.WriteLine("The numbers which produce the remainder 0 after divided by 2 are :");
foreach (int num in methodQuery)
{
    Console.Write("{0} ", num);
}