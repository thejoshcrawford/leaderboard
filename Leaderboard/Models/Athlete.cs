using System.Collections.Generic;

namespace Leaderboard.Models
{
    public class Athlete
    {
        public int AthleteId { get; set; }
        public int CompetitionId { get; set; }
        public int? ProfileId { get; set; }
        public int? DivisionId { get; set; }
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte Gender { get; set; }

        public virtual Competition Competition { get; set; }
        public virtual Division Division { get; set; }
        public virtual Profile Profile { get; set; }
        public virtual ICollection<Score> Scores { get; set; }
    }
}