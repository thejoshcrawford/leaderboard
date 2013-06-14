using System.Collections.Generic;

namespace Leaderboard.Models
{
    public class WorkoutType
    {
        public int WorkoutTypeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Workout> Workouts { get; set; } 
    }
}