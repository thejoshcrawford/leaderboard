using System.Collections.Generic;

namespace Leaderboard.Models
{
    public class Profile
    {
        public int ProfileId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Athlete> Athletes { get; set; } 
    }
}