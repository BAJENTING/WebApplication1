using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data // Adjust the namespace as needed
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }

}
