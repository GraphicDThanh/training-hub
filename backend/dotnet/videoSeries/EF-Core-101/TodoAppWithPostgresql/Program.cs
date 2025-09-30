using TodoAppWithPostgresql.Data;
using TodoAppWithPostgresql.Models;

using TodoAppWithPostgresqlDbContext context = new();

// Create some todos:
Todo task1 = new() { 
    Title = "Learn .NET Core", 
};
context.Todos.Add(task1);
context.SaveChanges();