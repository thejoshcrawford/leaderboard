using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Leaderboard.Models
{
    public class LeaderboardContext : DbContext
    {
        public LeaderboardContext() : base(nameOrConnectionString: "Leaderboard") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }

        public DbSet<Athlete> Athletes { get; set;}
        public DbSet<Competition> Competitions { get; set; }
        public DbSet<Division> Divisions { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Score> Scores { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<WorkoutType> WorkoutTypes { get; set; }
    }
}