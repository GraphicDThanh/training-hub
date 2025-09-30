Console.WriteLine("Composition Strategies");
Console.WriteLine("- Processive Query Building");
var names = new[] { "Tom", "Dick", "Harry", "Mary", "Jay" };
var query = names
  .Select(n => n.Replace("a", "").Replace("e", "").Replace("i", "")
                .Replace("o", "").Replace("u", ""))
  .Where(n => n.Length > 2)
  .OrderBy(n => n);
PrintQuery(query);

Console.WriteLine("Change order:");
var query2 =
    from n in names
    where n.Length > 2
    orderby n
    select n.Replace("a", "").Replace("e", "").Replace("i", "")
                .Replace("o", "").Replace("u", "");
PrintQuery(query2);

Console.WriteLine("Other option query:");
var query3 =
    from n in names
    select n.Replace("a", "").Replace("e", "").Replace("i", "")
                .Replace("o", "").Replace("u", "");

query3 = from n in query3 where n.Length > 2 orderby n select n;
PrintQuery(query3);

Console.WriteLine("- The into Keyword");
var query4 =
    from n in names
    select n.Replace("a", "").Replace("e", "").Replace("i", "")
            .Replace("o", "").Replace("u", "")
    into noVowel
    where noVowel.Length > 2
    orderby noVowel
    select noVowel;

static void PrintQuery(IEnumerable<string> query)
{
    foreach (string q in query)
    {
        Console.WriteLine(q);
    }
}