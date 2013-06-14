using System.Collections.Generic;

namespace Leaderboard.Models
{
    public class Competition
    {
        public int CompetitionId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Division> Divisions { get; set; }
        public virtual ICollection<Athlete> Athletes { get; set; }
        public virtual ICollection<Workout> Workouts { get; set; } 
    }
}