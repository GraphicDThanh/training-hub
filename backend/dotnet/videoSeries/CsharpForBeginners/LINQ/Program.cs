
// LINQ & IEnumerable: 
// LINQ Query:

// IEmnumerable<int>
List<int> scores = [3, 45, 82, 97, 92, 100, 81, 60];

// Define the query expression.
IEnumerable<int> scoreQuery =
    from score in scores
    where score > 80
    orderby score descending
    select score;

// Execute the query.
foreach (int i in scoreQuery)
{
    Console.Write(i + " ");
}
// Output: 97 92 81

// IEmnumerable<string>
List<int> scores = [3, 45, 82, 97, 92, 100, 81, 60];

// Define the query expression.
IEnumerable<string> scoreQuery =
    from score in scores
    where score > 80
    orderby score descending
    select $"The score is {score}";

Console.WriteLine(scoreQuery.Count());

// Execute the query.
foreach (string s in scoreQuery)
{
    Console.WriteLine(s);
}

// LINQ method vs Query
List<int> scores = [3, 45, 82, 97, 92, 100, 81, 60];

var scoreQuery = scores.Where(s => s > 80)
    .OrderByDescending(s => s);

List<int> myScores = scoreQuery.ToList();

foreach (int score in myScores)
{
    Console.WriteLine(score);
}

