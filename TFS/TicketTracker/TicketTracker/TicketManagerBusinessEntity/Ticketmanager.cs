using System;

namespace TicketManagerBusinessEntity
{
    public class Ticketmanager
    {
        public int TicketId { get; set; }
        public string ClientName { get; set; }
        public string DeveloperName { get; set; }
        public string Module { get; set; }
        public string Description { get; set; }
        public string ShortNotes { get; set; }
        public int? Priority { get; set; }

    }
}
