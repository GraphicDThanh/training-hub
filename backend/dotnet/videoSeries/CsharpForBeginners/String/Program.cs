Console.WriteLine("--- String concat example:");
string firstFriend = "    Maria   ";
firstFriend = firstFriend.Trim();

string secondFriend = "  Scott  ";
// better 
Console.WriteLine($"My friends are {firstFriend} and {secondFriend.Trim()}");
Console.WriteLine("My friends are " + firstFriend + " and " + secondFriend.Trim());


// String searching
Console.WriteLine("--- String searching examples:");
string friends = $"My friends are {firstFriend} and {secondFriend.Trim()}";
Console.WriteLine(friends);
Console.WriteLine(friends.Replace("and", "-"));
Console.WriteLine(friends.Contains("Scott"));
Console.WriteLine(friends.ToUpper());
Console.WriteLine(friends.Length);
Console.WriteLine(friends.StartsWith("My"));
Console.WriteLine(friends.StartsWith("my"));
Console.WriteLine(friends.EndsWith(' '));
Console.WriteLine(friends.EndsWith('t'));
Console.WriteLine(friends);