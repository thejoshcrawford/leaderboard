using System;
using System.Collections.Generic;

namespace Leaderboard.Models
{
    public class Workout
    {
        public int WorkoutId { get; set; }
        public int Name { get; set; }
        public int WorkoutTypeId { get; set; }
        public int CompetitionId { get; set; }
        public int? DivisionId { get; set; }
        public DateTime Date { get; set; }

        public virtual WorkoutType WorkoutType { get; set; }
        public virtual Competition Competition { get; set; }
        public virtual Division Division { get; set; }
        public virtual ICollection<Score> Scores { get; set; }
    }
}