using System;

namespace WebApplication1.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string Facility { get; set; }
        public string EventName { get; set; }
        public DateTime EventDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int Attendees { get; set; }
        public string Description { get; set; }
    }
}
