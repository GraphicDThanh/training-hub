using Microsoft.EntityFrameworkCore;

namespace SchoolManager;

public class SchoolDbContext: DbContext
{
    IConfiguration appConfig;
    
    // Fix bug when run migration `dotnet ef migrations add InitialSchoolDB`
    // An error occurred while accessing the Microsoft.Extensions.Hosting services. Continuing without the application service provider. Error: The entry point exited without ever building an IHost.
    // Unable to create a 'DbContext' of type ''. The exception 'Unable to resolve service for type 'Microsoft.Extensions.Configuration.IConfiguration' while attempting to activate 'SchoolManager.SchoolDbContext'.' was thrown while attempting to create an instance. For the different patterns supported at design time, see https://go.microsoft.com/fwlink/?linkid=851728
    public SchoolDbContext() { } 
    public SchoolDbContext(IConfiguration config)
    {
        Console.WriteLine("SchoolDbContext(IConfiguration config)");
        appConfig = config;
    }


    public DbSet<Student> Students { get; set; }
    public DbSet<Grade> Grades { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // string connectionString = appConfig.GetConnectionString("SchoolDBLocalConnection");
        // Console.WriteLine("connectionString: " + connectionString);
        // optionsBuilder.UseSqlServer(connectionString);
        optionsBuilder.UseSqlServer("Server=localhost,1433; Database=SchoolDB; User=sa; Password=1StrongPassword@; Trusted_Connection=false; Encrypt=false");
    }
}