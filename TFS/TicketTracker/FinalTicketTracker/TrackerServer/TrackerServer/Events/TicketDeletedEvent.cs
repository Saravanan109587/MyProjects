using EventBus.Events;
namespace TicketTrackerAPI.Events
{
    public class TicketDeletedEvent:IntegrationEvent
    {
        public string Message { get; set; }

        public TicketDeletedEvent(string msg)
            => Message = msg;
    }
}
