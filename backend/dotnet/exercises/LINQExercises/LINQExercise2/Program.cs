/*
2. Write a program in C# Sharp to find the +ve numbers from a list of numbers using two where conditions in LINQ Query.
Expected Output:
The numbers within the range of 1 to 11 are :
1 3 6 9 10
*/
Console.WriteLine("--- LINQ Exercise 2 ---");
int [] numbers = [1, 3, -5, 6, 8, 9, 10, 12, 15, 18, 20];

Console.WriteLine("With LINQ Query Expression :");
Console.WriteLine("The numbers within the range of 1 to 11 are :");
var expressionQuery = from num in numbers
                where num > 0
                where num < 11
                select num;

foreach (int num in expressionQuery)
{
    Console.Write("{0} ", num);
}

Console.WriteLine();

Console.WriteLine("With LINQ Extension Methods :");
Console.WriteLine("The numbers within the range of 1 to 11 are :");
var methodQuery = numbers.Where(num => num > 0).Where(num => num < 11);
foreach (int num in methodQuery)
{
    Console.Write("{0} ", num);
}