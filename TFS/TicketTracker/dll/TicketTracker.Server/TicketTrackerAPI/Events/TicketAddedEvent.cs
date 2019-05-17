using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Events;
namespace TicketTrackerAPI.Events
{
    public class TicketAddedEvent : IntegrationEvent
    {

        public string UserId { get; set; }

        public TicketAddedEvent(string userId)
            => UserId = userId;
    }
}
