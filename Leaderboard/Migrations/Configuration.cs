using Leaderboard.Models;

namespace Leaderboard.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Leaderboard.Models.LeaderboardContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Leaderboard.Models.LeaderboardContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            context.Competitions.AddOrUpdate( c => c.Name,
                new Competition { Name = "Empire Classic Games 2013" },
                new Competition { Name = "Northwest Regionals 2013" },
                new Competition { Name = "CrossFit Games 2013" }
            );
            context.SaveChanges();
            context.Athletes.AddOrUpdate( a => a.FirstName,
                    new Athlete { CompetitionId = context.Competitions.Single(c => c.Name.Equals("Empire Classic Games 2013")).CompetitionId,  FirstName = "Josh", LastName = "Crawford", Gender = 1},
                    new Athlete { CompetitionId = context.Competitions.Single(c => c.Name.Equals("Empire Classic Games 2013")).CompetitionId, FirstName = "Andrea", LastName = "Crawford", Gender = 2 },
                    new Athlete { CompetitionId = context.Competitions.Single(c => c.Name.Equals("Empire Classic Games 2013")).CompetitionId, FirstName = "Shawn", LastName = "Pointexter", Gender = 1 },
                    new Athlete { CompetitionId = context.Competitions.Single(c => c.Name.Equals("CrossFit Games 2013")).CompetitionId, FirstName = "Dan", LastName = "Staton", Gender = 1 }
                );
            context.SaveChanges();
        }
    }
}
