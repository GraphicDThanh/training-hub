// C8QueryExpressions

Console.WriteLine("- A Basic Query");
string[] names = { "Tom", "Dick", "Harry", "Mary", "Jay" };
IEnumerable<string> query =
    from n in names
    where n.Contains("a")   // Filter elements
    orderby n.Length        // Sort elements
    select n.ToUpper();     // Translate each element (project)

foreach (string name in query) Console.WriteLine(name);

Console.WriteLine("- A Basic Query - Translation");
var names2 = new[] { "Tom", "Dick", "Harry", "Mary", "Jay" }.AsQueryable();
IEnumerable<string> query2 =
    from n in names2
    where n.Contains("a")   // Filter elements
    orderby n.Length        // Sort elements
    select n.ToUpper();     // Translate each element (project)

foreach (string name in query2) Console.WriteLine(name);

Console.WriteLine("- Mixing Syntax");
string[] names3 = { "Tom", "Dick", "Harry", "Mary", "Jay" };
int matches = (from n in names3 where n.Contains("a") select n).Count();
Console.WriteLine("matches: " + matches);
string first = (from n in names3 orderby n select n).First();
Console.WriteLine("first: " + first);
int matches2 = names.Where(n => n.Contains("a")).Count(); // 3
string first2 = names.OrderBy(n => n).First();
Console.WriteLine("first2: " + first2);
Console.WriteLine("-----------------------------------");
Console.WriteLine("- Query Syntax in its Entirety");