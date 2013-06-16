using System.Linq;
using System.Web.Http;
using Breeze.WebApi;
using Leaderboard.Models;
using Newtonsoft.Json.Linq;

namespace Leaderboard
{
    [BreezeController]
    public class BreezeController : ApiController
    {
        readonly EFContextProvider<LeaderboardContext> _contextProvider =
            new EFContextProvider<LeaderboardContext>();

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

//        [HttpGet]
//        public object Lookups()
//        {
//            var rooms = _contextProvider.Context.Rooms;
//            var tracks = _contextProvider.Context.Tracks;
//            var timeslots = _contextProvider.Context.TimeSlots;
//            return new { rooms, tracks, timeslots };
//        }

        [HttpGet]
        public IQueryable<Athlete> Athletes()
        {
            return _contextProvider.Context.Athletes;
        }

        [HttpGet]
        public IQueryable<Competition> Competitions()
        {
            return _contextProvider.Context.Competitions;
        }

        [HttpGet]
        public IQueryable<Division> Divisions()
        {
            return _contextProvider.Context.Divisions;
        }
    }
}