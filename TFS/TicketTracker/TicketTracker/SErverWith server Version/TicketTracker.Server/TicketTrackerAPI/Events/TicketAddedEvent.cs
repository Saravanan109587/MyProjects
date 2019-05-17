
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Events;

namespace TicketTrackerAPI.Events
{
    public class TicketAddedEvent : IntegrationEvent
    {

        public string Message  { get; set; }
 
        public TicketAddedEvent(string Meg)
            => Message = Meg;
    }
}
