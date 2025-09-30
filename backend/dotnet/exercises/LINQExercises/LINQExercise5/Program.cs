/*
5. Write a program in C# Sharp to display the characters and frequency of each character in a given string.
Test Data:
Input the string: apple
Expected Output:
The frequency of the characters are :
Character a: 1 times
Character p: 2 times
Character l: 1 times
Character e: 1 times
*/

string testString = "apple";
var queryGroup = testString.GroupBy(character => character);
Console.WriteLine("The frequency of the characters are :");
foreach (var group in queryGroup)
{
    Console.WriteLine("Character {0}: {1} times", group.Key, group.Count());
}
