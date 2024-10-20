using Microsoft.EntityFrameworkCore;
using React_PhoneBook.Models;

namespace React_PhoneBook.Services
{
    public class ApplicationContext : DbContext
    {
        public DbSet<PersonItem> Person { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
    }
}
