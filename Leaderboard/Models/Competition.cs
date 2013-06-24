using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Leaderboard.Models
{
    public class Competition
    {
        public int CompetitionId { get; set; }
        [Required, MaxLength(50)]
        public string Name { get; set; }

        public virtual ICollection<Division> Divisions { get; set; }
        public virtual ICollection<Athlete> Athletes { get; set; }
        public virtual ICollection<Workout> Workouts { get; set; } 
    }
}