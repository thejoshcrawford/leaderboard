using System.Collections.Generic;

namespace Leaderboard.Models
{
    public class Division
    {
        public int DivisionId { get; set; }
        public int CompetitionId { get; set; }
        public string Name { get; set; }

        public virtual Competition Competition { get; set; }
        public virtual ICollection<Athlete> Athletes { get; set; }
        public virtual ICollection<Workout> Workouts { get; set; } 
    }
}