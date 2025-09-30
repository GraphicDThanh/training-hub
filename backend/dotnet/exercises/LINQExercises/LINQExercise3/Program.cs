/*
3. Write a program in C# Sharp to find the number of an array and the square of each number.
Expected Output :
{ Number = 9, SqrNo = 81 }
{ Number = 8, SqrNo = 64 }
{ Number = 6, SqrNo = 36 }
{ Number = 5, SqrNo = 25 }
*/
int[] numbers = [ 9, 8, 6, 5 ];
var query = numbers.Select(num => new { Number = num, SqrNo = num * num});

foreach (var obj in query)
{
    Console.WriteLine("{0}", obj);
}

// .Select() help transform element in sequence in new form
// ref: https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select