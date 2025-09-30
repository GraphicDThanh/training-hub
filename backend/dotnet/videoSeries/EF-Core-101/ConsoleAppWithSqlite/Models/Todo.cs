namespace ConsoleAppWithSqlite.Models;

public class Todo 
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public bool IsComplete { get; set; }
}