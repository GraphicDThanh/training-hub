using Microsoft.EntityFrameworkCore.ChangeTracking;
using SchoolManager;


// Configuation by appsettings.json
var configuration = new ConfigurationBuilder()
    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .Build();

using (var context = new SchoolDbContext(configuration))
{
    //create entity objects
    var grd1 = new Grade() { GradeName = "1st Grade" };
    var std1 = new Student() {  FirstName = "Yash", LastName = "Malhotra", Grade = grd1};

    //add entitiy to the context
    context.Students.Add(std1);

    //save data to the database tables
    context.SaveChanges();
}

// Track change of entities
// var disconnectedEntity = new Student { StudentId = 1, FirstName = "Yash", LastName = "Malhotra" };
// using (var context = new SchoolDbContext())
// {
//     // 1. Init db and records
//     // //creates db if not exists 
//     // context.Database.Ensu reCreated();

//     // //create entity objects
//     // var grd1 = new Grade() { GradeName = "1st Grade" };
//     // var std1 = new Student() {  FirstName = "Yash", LastName = "Malhotra", Grade = grd1};

//     // //add entitiy to the context
//     // context.Students.Add(std1);

//     // //save data to the database tables
//     // context.SaveChanges();

//     // //retrieve all the students from the database
//     // foreach (var s in context.Students) {
//     //     Console.WriteLine($"First Name: {s.FirstName}, Last Name: {s.LastName}");
//     // }

//     // 2. Track change of entities - Unchange
//     // var student = context.Students.FirstOrDefault();
//     // DisplayStates(context.ChangeTracker.Entries());
    
//     // 3. Track change of entities - Added
//     // context.Students.Add(new Student { FirstName = "Bill", LastName = "Gates" });
//     // DisplayStates(context.ChangeTracker.Entries());

//     // 4. Track change of entities - Modified
//     // var student = context.Students.FirstOrDefault();
//     // student.FirstName = "Steve";
//     // DisplayStates(context.ChangeTracker.Entries());

//     // 5. Track change of entities - Deleted
//     // var student = context.Students.FirstOrDefault();
//     // context.Students.Remove(student);
//     // DisplayStates(context.ChangeTracker.Entries());

//     // 6. Detach entity
//     Console.WriteLine(context.Entry(disconnectedEntity).State);
// }

// static void DisplayStates(IEnumerable<EntityEntry> entries)
// {
//     foreach (var entry in entries)
//     {
//         Console.WriteLine($"Entity: {entry.Entity.GetType().Name}, State: {entry.State}");
//     }
// }
