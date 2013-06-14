namespace Leaderboard.Models
{
    public class Score
    {
        public int ScoreId { get; set; }
        public int AthleteId { get; set; }
        public int WorkoutId { get; set; }
        public int Value { get; set; }

        public virtual Athlete Athlete { get; set; }
        public virtual Workout Workout { get; set; }
    }
}