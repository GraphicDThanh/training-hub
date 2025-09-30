Console.WriteLine("Subqueries");
Console.WriteLine("- Basic Subquery");
string[] musos = { "Roger Waters", "David Gilmour", "Rick Wright", "Nick Mason" };
IEnumerable<string> query = musos.OrderBy(m => m.Split().Last());
foreach (string q in query)
{
    Console.WriteLine(q);
}

Console.WriteLine("- Reformulating the Subquery");
string[] names = { "Tom", "Dick", "Harry", "Mary", "Jay" };
IEnumerable<string> outerQuery = names
    .Where(n => n.Length == names.OrderBy(n2 => n2.Length)
    .Select(n2 => n2.Length).First());
foreach (string q in outerQuery)
{
    Console.WriteLine(q);
}
Console.WriteLine("---------------------------");

Console.WriteLine("Same thing as a query expression");
IEnumerable<string> outerQuery2 =
    from n in names
    where n.Length == (from n2 in names orderby n2.Length select n2.Length).First()
    select n;
foreach (string q in outerQuery2)
{
    Console.WriteLine(q);
}

Console.WriteLine("Reformulated");
query =
  from n in names
  where n.Length == names.OrderBy(n2 => n2.Length).First().Length
  select n;

Console.WriteLine("Same result, using Min aggregation");
query =
  from n in names
  where n.Length == names.Min(n2 => n2.Length)
  select n;

Console.WriteLine("- Avoiding Subqueries - no subqueries");
int shortest = names.Min(n => n.Length);
IEnumerable<string> outerQuery3 =
    from n in names
    where n.Length == shortest
    select n;

foreach (string q in outerQuery3)
{
    Console.WriteLine(q);
}